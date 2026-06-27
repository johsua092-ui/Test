import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class PhiProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "phi",
      name: "Phi",
      family: "phi",
      envPrefix: "PHI",
      defaultModel: "phi-4",
      modelPatterns: [/^phi/i, /^microsoft[-/]phi/i],
      models: [
        model("phi-4"),
        model("phi-4-mini-instruct"),
        model("phi-3.5-mini-instruct"),
        model("phi-3.5-vision-instruct", { vision: true }),
        model("phi-3-mini-128k-instruct"),
        model("phi-3-medium-128k-instruct"),
        model("phi-3-vision-128k-instruct", { vision: true }),
      ],
    })
  }
}
