import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class GemmaProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "gemma",
      name: "Gemma",
      family: "gemma",
      envPrefix: "GEMMA",
      defaultModel: "gemma-3-27b-it",
      modelPatterns: [/^gemma/i, /^google[-/]gemma/i],
      models: [
        model("gemma-3-27b-it", { vision: true }),
        model("gemma-3-12b-it", { vision: true }),
        model("gemma-3-4b-it", { vision: true }),
        model("gemma-3-1b-it"),
        model("gemma-2-27b-it"),
        model("gemma-2-9b-it"),
        model("gemma-2-2b-it"),
        model("codegemma-7b-it"),
        model("codegemma-2b"),
      ],
    })
  }
}
