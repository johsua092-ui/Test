import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class CodeLlamaProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "codellama",
      name: "CodeLlama",
      family: "codellama",
      envPrefix: "CODELLAMA",
      defaultModel: "codellama-34b-instruct",
      modelPatterns: [/^codellama/i, /^code[-/]llama/i],
      models: [
        model("codellama-70b-instruct"),
        model("codellama-34b-instruct"),
        model("codellama-13b-instruct"),
        model("codellama-7b-instruct"),
        model("codellama-34b-python"),
        model("codellama-13b-python"),
        model("codellama-7b-python"),
      ],
    })
  }
}
