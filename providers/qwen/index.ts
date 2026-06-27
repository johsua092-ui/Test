import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class QwenProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "qwen",
      name: "Qwen",
      family: "qwen",
      envPrefix: "QWEN",
      defaultModel: "qwen2.5-72b-instruct",
      modelPatterns: [/^qwen/i, /^qwq/i, /^alibaba[-/]qwen/i],
      capabilities: { embeddings: true },
      models: [
        model("qwen3-235b-a22b"),
        model("qwen3-32b"),
        model("qwen3-30b-a3b"),
        model("qwen3-14b"),
        model("qwen3-8b"),
        model("qwen3-4b"),
        model("qwen3-1.7b"),
        model("qwen3-0.6b"),
        model("qwen2.5-72b-instruct"),
        model("qwen2.5-32b-instruct"),
        model("qwen2.5-14b-instruct"),
        model("qwen2.5-7b-instruct"),
        model("qwen2.5-3b-instruct"),
        model("qwen2.5-1.5b-instruct"),
        model("qwen2.5-0.5b-instruct"),
        model("qwen2.5-coder-32b-instruct"),
        model("qwen2.5-coder-14b-instruct"),
        model("qwen2.5-coder-7b-instruct"),
        model("qwen2.5-coder-3b-instruct"),
        model("qwen2.5-coder-1.5b-instruct"),
        model("qwen2.5-coder-0.5b-instruct"),
        model("qwen2-vl-72b-instruct", { vision: true }),
        model("qwen2-vl-7b-instruct", { vision: true }),
        model("qwen2-vl-2b-instruct", { vision: true }),
        model("qvq-72b-preview", { vision: true }),
        model("qwq-32b"),
      ],
    })
  }
}
