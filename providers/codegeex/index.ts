import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class CodeGeeXProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "codegeex",
      name: "CodeGeeX",
      family: "codegeex",
      envPrefix: "CODEGEEX",
      defaultModel: "codegeex4-all-9b",
      modelPatterns: [/^codegeex/i],
      models: [
        model("codegeex4-all-9b"),
        model("codegeex2-6b"),
        model("codegeex-13b"),
      ],
    })
  }
}
