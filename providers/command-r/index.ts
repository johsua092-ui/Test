import { OpenAICompatibleProvider } from "../OpenAICompatibleProvider"
import { model } from "../modelUtils"

export class CommandRProvider extends OpenAICompatibleProvider {
  constructor() {
    super({
      id: "command-r",
      name: "Command-R",
      family: "command-r",
      envPrefix: "COMMAND_R",
      defaultModel: "command-r-plus-08-2024",
      modelPatterns: [/^command-r/i, /^command-r-plus/i, /^cohere[-/]command-r/i],
      models: [
        model("command-r-plus-08-2024"),
        model("command-r-08-2024"),
        model("command-r-plus"),
        model("command-r"),
      ],
    })
  }
}
