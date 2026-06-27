import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class GlmProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "glm",
      name: "GLM",
      family: "glm",
      envPrefix: "GLM",
      defaultModel: "glm-4-9b-chat",
      modelPatterns: [/^glm/i, /^zhipu/i],
      models: [
        model("glm-4-9b-chat"),
        model("glm-4-9b-chat-1m"),
        model("glm-4v-9b", { vision: true }),
        model("glm-4.1v-9b-thinking", { vision: true }),
        model("glm-z1-9b"),
        model("glm-z1-32b"),
        model("chatglm3-6b"),
        model("chatglm2-6b"),
        model("codegeex4-all-9b"),
      ],
    })
  }
}
