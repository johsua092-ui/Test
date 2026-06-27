declare const process: { env?: Record<string, string | undefined> } | undefined

export type ChatRole = "system" | "user" | "assistant" | "tool"

export type MessageContent =
  | string
  | Array<
      | { type: "text"; text: string }
      | { type: "image_url"; image_url: { url: string; detail?: string } }
    >

export interface ChatMessage {
  role: ChatRole
  content: MessageContent
  name?: string
}

export interface ModelCapabilities {
  chat: boolean
  streaming: boolean
  jsonMode: boolean
  vision: boolean
  embeddings: boolean
}

export interface ModelDefinition {
  id: string
  aliases?: string[]
  contextWindow?: number
  maxOutputTokens?: number
  capabilities: ModelCapabilities
}

export interface ChatCompletionRequest {
  provider?: string
  model?: string
  messages: ChatMessage[]
  system?: string
  temperature?: number
  top_p?: number
  max_tokens?: number
  stream?: boolean
  json?: boolean
  response_format?: unknown
}

export interface EmbeddingRequest {
  model?: string
  input: string | string[]
}

export interface ProviderRequest {
  baseUrl: string
  apiKey?: string
  headers?: Record<string, string>
}

export class ProviderError extends Error {
  code: number
  details?: unknown

  constructor(message: string, code = 500, details?: unknown) {
    super(message)
    this.name = "ProviderError"
    this.code = code
    this.details = details
  }
}

export abstract class BaseProvider {
  abstract readonly id: string
  abstract readonly name: string
  abstract readonly family: string
  abstract readonly defaultModel: string
  abstract readonly models: ModelDefinition[]
  protected abstract readonly modelPatterns: RegExp[]

  abstract chatCompletion(request: ChatCompletionRequest): Promise<unknown>
  abstract streamChatCompletion(request: ChatCompletionRequest): Promise<Response>
  abstract embeddings(request: EmbeddingRequest): Promise<unknown>

  listModels() {
    return this.models.map((model) => ({
      ...model,
      provider: this.id,
      family: this.family,
    }))
  }

  supportsModel(model?: string) {
    if (!model) return true
    return Boolean(this.findModel(model)) || this.modelPatterns.some((pattern) => pattern.test(model))
  }

  resolveModel(model?: string) {
    const requestedModel = model || this.defaultModel
    const knownModel = this.findModel(requestedModel)

    if (knownModel) return knownModel

    if (this.modelPatterns.some((pattern) => pattern.test(requestedModel))) {
      return {
        id: requestedModel,
        capabilities: this.defaultCapabilities(),
      }
    }

    throw new ProviderError(`Model ${requestedModel} is not supported by provider ${this.id}`, 400, {
      provider: this.id,
      availableModels: this.models.map((item) => item.id),
    })
  }

  protected findModel(model: string) {
    return this.models.find((item) => {
      if (item.id === model) return true
      return item.aliases?.includes(model)
    })
  }

  protected env(name: string) {
    return process?.env?.[name] || undefined
  }

  protected defaultCapabilities(): ModelCapabilities {
    return {
      chat: true,
      streaming: true,
      jsonMode: true,
      vision: false,
      embeddings: false,
    }
  }
}
