import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class MixtralProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "mixtral",
      name: "Mixtral",
      family: "mixtral",
      envPrefix: "MIXTRAL",
      defaultModel: "mixtral-8x7b-instruct",
      modelPatterns: [/^mixtral/i],
      models: [
        model("mixtral-8x22b-instruct"),
        model("mixtral-8x7b-instruct"),
        model("mixtral-8x7b-instruct-v0.1"),
      ],
    })
  }
}
