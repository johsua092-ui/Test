import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class MiniCpmProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "minicpm",
      name: "MiniCPM",
      family: "minicpm",
      envPrefix: "MINICPM",
      defaultModel: "minicpm3-4b",
      modelPatterns: [/^minicpm/i, /^openbmb[-/]minicpm/i],
      models: [
        model("minicpm3-4b"),
        model("minicpm-2b-sft-bf16"),
        model("minicpm-v-2_6", { vision: true }),
        model("minicpm-v-2_5", { vision: true }),
        model("minicpm-v-2", { vision: true }),
        model("minicpm-o-2_6", { vision: true }),
      ],
    })
  }
}
