import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class DeepSeekProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "deepseek",
      name: "DeepSeek",
      family: "deepseek",
      envPrefix: "DEEPSEEK",
      defaultModel: "deepseek-v3",
      modelPatterns: [/^deepseek/i],
      models: [
        model("deepseek-v3"),
        model("deepseek-v3-0324"),
        model("deepseek-r1"),
        model("deepseek-r1-0528"),
        model("deepseek-r1-distill-qwen-1.5b"),
        model("deepseek-r1-distill-qwen-7b"),
        model("deepseek-r1-distill-qwen-14b"),
        model("deepseek-r1-distill-qwen-32b"),
        model("deepseek-r1-distill-llama-8b"),
        model("deepseek-r1-distill-llama-70b"),
        model("deepseek-coder-v2"),
        model("deepseek-coder-v2-lite-instruct"),
        model("deepseek-math-7b-instruct"),
      ],
    })
  }
}
