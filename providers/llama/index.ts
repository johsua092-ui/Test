import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class LlamaProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "llama",
      name: "Llama",
      family: "llama",
      envPrefix: "LLAMA",
      defaultModel: "llama-3.3-70b-instruct",
      modelPatterns: [/^llama/i, /^meta[-/]llama/i],
      models: [
        model("llama-4-maverick", { vision: true }),
        model("llama-4-scout", { vision: true }),
        model("llama-3.3-70b-instruct"),
        model("llama-3.2-90b-vision-instruct", { vision: true }),
        model("llama-3.2-11b-vision-instruct", { vision: true }),
        model("llama-3.2-3b-instruct"),
        model("llama-3.2-1b-instruct"),
        model("llama-3.1-405b-instruct"),
        model("llama-3.1-70b-instruct"),
        model("llama-3.1-8b-instruct"),
        model("llama-3-70b-instruct"),
        model("llama-3-8b-instruct"),
        model("llama-2-70b-chat"),
        model("llama-2-13b-chat"),
        model("llama-2-7b-chat"),
      ],
    })
  }
}
