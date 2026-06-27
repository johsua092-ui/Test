import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class MistralProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "mistral",
      name: "Mistral",
      family: "mistral",
      envPrefix: "MISTRAL",
      defaultModel: "mistral-small-3.1-24b-instruct",
      modelPatterns: [/^mistral/i, /^ministral/i],
      capabilities: { embeddings: true },
      models: [
        model("mistral-small-3.1-24b-instruct", { vision: true }),
        model("mistral-small-3-24b-instruct"),
        model("mistral-nemo-12b-instruct"),
        model("mistral-7b-instruct"),
        model("mistral-7b-instruct-v0.3"),
        model("mistral-7b-instruct-v0.2"),
        model("mistral-7b-instruct-v0.1"),
        model("ministral-8b-instruct"),
        model("ministral-3b-instruct"),
      ],
    })
  }
}
