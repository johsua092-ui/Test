import { ProviderError, ProviderManager } from "../../providers"

const providerManager = new ProviderManager()

export default [
  {
    metode: "POST",
    endpoint: "/api/ai/chat",
    name: "Open Model Chat",
    category: "ai",
    description: "Chat completion endpoint for supported open and open-weight model families.",
    tags: ["ai", "chat", "open-models"],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["provider", "messages"],
            properties: {
              provider: { type: "string" },
              model: { type: "string" },
              messages: {
                type: "array",
                items: {
                  type: "object",
                  required: ["role", "content"],
                  properties: {
                    role: { type: "string", enum: ["system", "user", "assistant", "tool"] },
                    content: {},
                  },
                },
              },
              system: { type: "string" },
              temperature: { type: "number", minimum: 0, maximum: 2 },
              top_p: { type: "number", minimum: 0, maximum: 1 },
              max_tokens: { type: "integer", minimum: 1 },
              stream: { type: "boolean" },
              json: { type: "boolean" },
              response_format: {},
            },
          },
        },
      },
    },
    isPublic: false,
    isPremium: true,
    isMaintenance: false,
    async run({ req }: any) {
      try {
        const request = providerManager.normalizeChatRequest(req.body || {})

        if (request.stream) {
          return await providerManager.streamChatCompletion(request)
        }

        const result = await providerManager.chatCompletion(request)

        return {
          status: true,
          data: result,
          timestamp: new Date().toISOString(),
        }
      } catch (error: any) {
        const code = error instanceof ProviderError ? error.code : 500

        return {
          status: false,
          error: error.message || "Internal Server Error",
          code,
        }
      }
    },
  },
]
