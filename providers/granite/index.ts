import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class GraniteProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "granite",
      name: "Granite",
      family: "granite",
      envPrefix: "GRANITE",
      defaultModel: "granite-3.3-8b-instruct",
      modelPatterns: [/^granite/i, /^ibm[-/]granite/i],
      models: [
        model("granite-3.3-8b-instruct"),
        model("granite-3.2-8b-instruct"),
        model("granite-3.2-2b-instruct"),
        model("granite-3.1-8b-instruct"),
        model("granite-3.1-2b-instruct"),
        model("granite-20b-code-instruct"),
        model("granite-8b-code-instruct"),
      ],
    })
  }
}
