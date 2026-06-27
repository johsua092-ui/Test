import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class OpenCoderProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "opencoder",
      name: "OpenCoder",
      family: "opencoder",
      envPrefix: "OPENCODER",
      defaultModel: "opencoder-8b-instruct",
      modelPatterns: [/^opencoder/i, /^infly[-/]opencoder/i],
      models: [
        model("opencoder-8b-instruct"),
        model("opencoder-1.5b-instruct"),
        model("opencoder-8b-base"),
        model("opencoder-1.5b-base"),
      ],
    })
  }
}
