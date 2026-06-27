import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class FalconProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "falcon",
      name: "Falcon",
      family: "falcon",
      envPrefix: "FALCON",
      defaultModel: "falcon-180b-chat",
      modelPatterns: [/^falcon/i, /^tiiuae[-/]falcon/i],
      models: [
        model("falcon-180b-chat"),
        model("falcon-40b-instruct"),
        model("falcon-7b-instruct"),
        model("falcon2-11b"),
        model("falcon2-11b-vlm", { vision: true }),
      ],
    })
  }
}
