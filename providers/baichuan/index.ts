import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class BaichuanProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "baichuan",
      name: "Baichuan",
      family: "baichuan",
      envPrefix: "BAICHUAN",
      defaultModel: "baichuan2-13b-chat",
      modelPatterns: [/^baichuan/i],
      models: [
        model("baichuan2-13b-chat"),
        model("baichuan2-7b-chat"),
        model("baichuan-13b-chat"),
        model("baichuan-7b"),
      ],
    })
  }
}
