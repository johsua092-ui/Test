import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class SmolLmProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "smollm",
      name: "SmolLM",
      family: "smollm",
      envPrefix: "SMOLLM",
      defaultModel: "smollm2-1.7b-instruct",
      modelPatterns: [/^smollm/i, /^huggingface[-/]smollm/i],
      models: [
        model("smollm2-1.7b-instruct"),
        model("smollm2-360m-instruct"),
        model("smollm2-135m-instruct"),
        model("smollm-1.7b-instruct"),
        model("smollm-360m-instruct"),
        model("smollm-135m-instruct"),
      ],
    })
  }
}
