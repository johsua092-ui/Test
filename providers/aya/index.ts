import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class AyaProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "aya",
      name: "Aya",
      family: "aya",
      envPrefix: "AYA",
      defaultModel: "aya-expanse-32b",
      modelPatterns: [/^aya/i, /^cohereforai[-/]aya/i],
      models: [
        model("aya-expanse-32b"),
        model("aya-expanse-8b"),
        model("aya-23-35b"),
        model("aya-23-8b"),
        model("aya-101"),
      ],
    })
  }
}
