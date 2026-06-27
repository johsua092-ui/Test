import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class InternLmProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "internlm",
      name: "InternLM",
      family: "internlm",
      envPrefix: "INTERNLM",
      defaultModel: "internlm2_5-20b-chat",
      modelPatterns: [/^internlm/i, /^internvl/i],
      models: [
        model("internlm3-8b-instruct"),
        model("internlm2_5-20b-chat"),
        model("internlm2_5-7b-chat"),
        model("internlm2-chat-20b"),
        model("internlm2-chat-7b"),
        model("internvl2_5-78b", { vision: true }),
        model("internvl2_5-38b", { vision: true }),
        model("internvl2_5-8b", { vision: true }),
      ],
    })
  }
}
