import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class OlmoProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "olmo",
      name: "OLMo",
      family: "olmo",
      envPrefix: "OLMO",
      defaultModel: "olmo-2-1124-13b-instruct",
      modelPatterns: [/^olmo/i, /^allenai[-/]olmo/i],
      models: [
        model("olmo-2-1124-13b-instruct"),
        model("olmo-2-1124-7b-instruct"),
        model("olmo-7b-instruct"),
        model("olmoe-1b-7b-0924-instruct"),
      ],
    })
  }
}
