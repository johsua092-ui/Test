import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class StarCoderProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "starcoder",
      name: "StarCoder",
      family: "starcoder",
      envPrefix: "STARCODER",
      defaultModel: "starcoder2-15b-instruct",
      modelPatterns: [/^starcoder/i, /^bigcode[-/]starcoder/i],
      models: [
        model("starcoder2-15b-instruct"),
        model("starcoder2-7b"),
        model("starcoder2-3b"),
        model("starcoderbase-15b"),
        model("starcoder-15b"),
      ],
    })
  }
}
