import {
  BaseProvider,
  ChatCompletionRequest,
  EmbeddingRequest,
  ModelCapabilities,
  ModelDefinition,
  ProviderError,
} from "./BaseProvider"

export interface OpenAICompatibleProviderOptions {
  id: string
  name: string
  family: string
  envPrefix: string
  defaultModel: string
  models: Array<Omit<ModelDefinition, "capabilities"> & { capabilities?: Partial<ModelCapabilities> }>
  modelPatterns: RegExp[]
  capabilities?: Partial<ModelCapabilities>
}

export class OpenAICompatibleProvider extends BaseProvider {
  readonly id: string
  readonly name: string
  readonly family: string
  readonly defaultModel: string
  readonly models: ModelDefinition[]
  protected readonly modelPatterns: RegExp[]
  private readonly envPrefix: string
  private readonly capabilities: ModelCapabilities

  constructor(options: OpenAICompatibleProviderOptions) {
    super()
    this.id = options.id
    this.name = options.name
    this.family = options.family
    this.envPrefix = options.envPrefix
    this.defaultModel = options.defaultModel
    this.modelPatterns = options.modelPatterns
    this.capabilities = {
      ...this.defaultCapabilities(),
      ...options.capabilities,
    }
    this.models = options.models.map((model) => ({
      ...model,
      capabilities: {
        ...this.capabilities,
        ...model.capabilities,
      },
    }))
  }

  async chatCompletion(request: ChatCompletionRequest) {
    const resolvedModel = this.resolveModel(request.model)
    this.validateChatRequest(request, resolvedModel)
    const response = await fetch(this.url("/chat/completions"), {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(this.payload(request, resolvedModel.id, false)),
    })

    if (!response.ok) {
      throw await this.toProviderError(response)
    }

    const data = await response.json()
    return {
      provider: this.id,
      family: this.family,
      model: data.model || resolvedModel.id,
      ...data,
    }
  }

  async streamChatCompletion(request: ChatCompletionRequest) {
    const resolvedModel = this.resolveModel(request.model)
    this.validateChatRequest(request, resolvedModel)
    const response = await fetch(this.url("/chat/completions"), {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(this.payload(request, resolvedModel.id, true)),
    })

    if (!response.ok) {
      throw await this.toProviderError(response)
    }

    if (!response.body) {
      throw new ProviderError("Provider returned an empty stream", 502)
    }

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Provider": this.id,
        "X-Model": resolvedModel.id,
      },
    })
  }

  async embeddings(request: EmbeddingRequest) {
    const resolvedModel = this.resolveModel(request.model)

    if (!resolvedModel.capabilities.embeddings) {
      throw new ProviderError(`Model ${resolvedModel.id} does not support embeddings`, 400)
    }

    const response = await fetch(this.url("/embeddings"), {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        model: resolvedModel.id,
        input: request.input,
      }),
    })

    if (!response.ok) {
      throw await this.toProviderError(response)
    }

    const data = await response.json()
    return {
      provider: this.id,
      family: this.family,
      model: data.model || resolvedModel.id,
      ...data,
    }
  }

  protected defaultCapabilities(): ModelCapabilities {
    return this.capabilities || super.defaultCapabilities()
  }

  private validateChatRequest(request: ChatCompletionRequest, model: ModelDefinition) {
    if (!model.capabilities.chat) {
      throw new ProviderError(`Model ${model.id} does not support chat completion`, 400)
    }

    if (request.stream && !model.capabilities.streaming) {
      throw new ProviderError(`Model ${model.id} does not support streaming`, 400)
    }

    if ((request.json || request.response_format) && !model.capabilities.jsonMode) {
      throw new ProviderError(`Model ${model.id} does not support JSON mode`, 400)
    }

    if (this.hasVisionInput(request) && !model.capabilities.vision) {
      throw new ProviderError(`Model ${model.id} does not support vision input`, 400)
    }
  }

  private payload(request: ChatCompletionRequest, model: string, stream: boolean) {
    const messages = request.system
      ? [{ role: "system", content: request.system }, ...request.messages]
      : request.messages

    const body: Record<string, unknown> = {
      model,
      messages,
      stream,
    }

    if (request.temperature !== undefined) body.temperature = request.temperature
    if (request.top_p !== undefined) body.top_p = request.top_p
    if (request.max_tokens !== undefined) body.max_tokens = request.max_tokens
    if (request.response_format !== undefined) body.response_format = request.response_format
    if (request.json && request.response_format === undefined) body.response_format = { type: "json_object" }

    return body
  }

  private url(path: string) {
    const baseUrl = this.baseUrl()

    if (!baseUrl) {
      throw new ProviderError(`Provider ${this.id} is not configured`, 503, {
        env: [`${this.envPrefix}_BASE_URL`, "OPENAI_COMPATIBLE_BASE_URL", "AI_GATEWAY_BASE_URL"],
      })
    }

    const cleanBaseUrl = baseUrl.replace(/\/+$/, "")

    if (cleanBaseUrl.endsWith("/chat/completions") || cleanBaseUrl.endsWith("/embeddings")) {
      return cleanBaseUrl
    }

    if (cleanBaseUrl.endsWith("/v1")) {
      return `${cleanBaseUrl}${path}`
    }

    return `${cleanBaseUrl}/v1${path}`
  }

  private baseUrl() {
    return (
      this.env(`${this.envPrefix}_BASE_URL`) ||
      this.env("OPENAI_COMPATIBLE_BASE_URL") ||
      this.env("AI_GATEWAY_BASE_URL")
    )
  }

  private apiKey() {
    return (
      this.env(`${this.envPrefix}_API_KEY`) ||
      this.env("OPENAI_COMPATIBLE_API_KEY") ||
      this.env("AI_GATEWAY_API_KEY")
    )
  }

  private headers() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    const apiKey = this.apiKey()
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`

    return headers
  }

  private hasVisionInput(request: ChatCompletionRequest) {
    return request.messages.some((message) => {
      if (!Array.isArray(message.content)) return false
      return message.content.some((part) => part.type === "image_url")
    })
  }

  private async toProviderError(response: Response) {
    const text = await response.text()

    try {
      const json = JSON.parse(text)
      const message = json.error?.message || json.message || response.statusText
      return new ProviderError(message, response.status, json)
    } catch {
      return new ProviderError(text || response.statusText, response.status)
    }
  }
}
