import {
  BaseProvider,
  ChatCompletionRequest,
  ChatMessage,
  EmbeddingRequest,
  MessageContent,
  ProviderError,
} from "./BaseProvider"
import { ProviderFactory } from "./ProviderFactory"

export class ProviderManager {
  private readonly providers: Map<string, BaseProvider>

  constructor(providers = ProviderFactory.createAll()) {
    this.providers = new Map(providers.map((provider) => [provider.id, provider]))
  }

  listProviders() {
    return [...this.providers.values()].map((provider) => ({
      id: provider.id,
      name: provider.name,
      family: provider.family,
      defaultModel: provider.defaultModel,
      models: provider.listModels(),
    }))
  }

  listModels() {
    return [...this.providers.values()].flatMap((provider) => provider.listModels())
  }

  getProvider(providerId?: string, model?: string) {
    if (providerId) {
      const provider = this.providers.get(providerId)
      if (!provider) {
        throw new ProviderError(`Provider ${providerId} is not supported`, 400, {
          providers: [...this.providers.keys()],
        })
      }
      return provider
    }

    if (model) {
      const provider = [...this.providers.values()].find((item) => item.supportsModel(model))
      if (provider) return provider
    }

    throw new ProviderError("provider is required when model cannot be inferred", 400, {
      providers: [...this.providers.keys()],
    })
  }

  normalizeChatRequest(input: unknown): ChatCompletionRequest {
    if (!input || typeof input !== "object") {
      throw new ProviderError("Request body must be an object", 400)
    }

    const body = input as Record<string, unknown>
    const messages = this.normalizeMessages(body.messages)

    return {
      provider: this.optionalString(body.provider, "provider"),
      model: this.optionalString(body.model, "model"),
      messages,
      system: this.optionalString(body.system, "system"),
      temperature: this.optionalNumber(body.temperature, "temperature", 0, 2),
      top_p: this.optionalNumber(body.top_p, "top_p", 0, 1),
      max_tokens: this.optionalInteger(body.max_tokens, "max_tokens", 1, 131072),
      stream: this.optionalBoolean(body.stream, "stream"),
      json: this.optionalBoolean(body.json, "json"),
      response_format: body.response_format,
    }
  }

  async chatCompletion(request: ChatCompletionRequest) {
    const provider = this.getProvider(request.provider, request.model)
    return provider.chatCompletion(request)
  }

  async streamChatCompletion(request: ChatCompletionRequest) {
    const provider = this.getProvider(request.provider, request.model)
    return provider.streamChatCompletion(request)
  }

  async embeddings(providerId: string, request: EmbeddingRequest) {
    return this.getProvider(providerId, request.model).embeddings(request)
  }

  private normalizeMessages(messages: unknown): ChatMessage[] {
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new ProviderError("messages must be a non-empty array", 400)
    }

    return messages.map((message, index) => {
      if (!message || typeof message !== "object") {
        throw new ProviderError(`messages.${index} must be an object`, 400)
      }

      const item = message as Record<string, unknown>
      const role = item.role
      const content = item.content

      if (!["system", "user", "assistant", "tool"].includes(String(role))) {
        throw new ProviderError(`messages.${index}.role is invalid`, 400)
      }

      return {
        role: role as ChatMessage["role"],
        content: this.normalizeContent(content, index),
        name: this.optionalString(item.name, `messages.${index}.name`),
      }
    })
  }

  private normalizeContent(content: unknown, index: number): MessageContent {
    if (typeof content === "string") return content

    if (!Array.isArray(content) || content.length === 0) {
      throw new ProviderError(`messages.${index}.content must be a string or content array`, 400)
    }

    return content.map((part, partIndex) => {
      if (!part || typeof part !== "object") {
        throw new ProviderError(`messages.${index}.content.${partIndex} must be an object`, 400)
      }

      const item = part as Record<string, unknown>

      if (item.type === "text" && typeof item.text === "string") {
        return { type: "text", text: item.text }
      }

      if (item.type === "image_url" && item.image_url && typeof item.image_url === "object") {
        const image = item.image_url as Record<string, unknown>
        if (typeof image.url === "string") {
          return {
            type: "image_url",
            image_url: {
              url: image.url,
              detail: typeof image.detail === "string" ? image.detail : undefined,
            },
          }
        }
      }

      throw new ProviderError(`messages.${index}.content.${partIndex} is invalid`, 400)
    })
  }

  private optionalString(value: unknown, field: string) {
    if (value === undefined || value === null || value === "") return undefined
    if (typeof value !== "string") throw new ProviderError(`${field} must be a string`, 400)
    return value
  }

  private optionalBoolean(value: unknown, field: string) {
    if (value === undefined || value === null || value === "") return undefined
    if (typeof value !== "boolean") throw new ProviderError(`${field} must be a boolean`, 400)
    return value
  }

  private optionalNumber(value: unknown, field: string, min: number, max: number) {
    if (value === undefined || value === null || value === "") return undefined
    if (typeof value !== "number" || Number.isNaN(value) || value < min || value > max) {
      throw new ProviderError(`${field} must be a number between ${min} and ${max}`, 400)
    }
    return value
  }

  private optionalInteger(value: unknown, field: string, min: number, max: number) {
    if (value === undefined || value === null || value === "") return undefined
    if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) {
      throw new ProviderError(`${field} must be an integer between ${min} and ${max}`, 400)
    }
    return value as number
  }
}

export { ProviderError }
