import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class YiProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "yi",
      name: "Yi",
      family: "yi",
      envPrefix: "YI",
      defaultModel: "yi-1.5-34b-chat",
      modelPatterns: [/^yi/i, /^01-ai[-/]yi/i],
      models: [
        model("yi-1.5-34b-chat"),
        model("yi-1.5-9b-chat"),
        model("yi-1.5-6b-chat"),
        model("yi-34b-chat"),
        model("yi-6b-chat"),
        model("yi-vl-34b", { vision: true }),
        model("yi-vl-6b", { vision: true }),
      ],
    })
  }
}
