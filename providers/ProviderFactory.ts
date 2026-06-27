import { BaseProvider } from "./BaseProvider"
import { AyaProvider } from "./aya"
import { BaichuanProvider } from "./baichuan"
import { CodeGeeXProvider } from "./codegeex"
import { CodeLlamaProvider } from "./codellama"
import { CommandRProvider } from "./command-r"
import { DeepSeekProvider } from "./deepseek"
import { FalconProvider } from "./falcon"
import { GemmaProvider } from "./gemma"
import { GlmProvider } from "./glm"
import { GraniteProvider } from "./granite"
import { InternLmProvider } from "./internlm"
import { LlamaProvider } from "./llama"
import { MiniCpmProvider } from "./minicpm"
import { MistralProvider } from "./mistral"
import { MixtralProvider } from "./mixtral"
import { OlmoProvider } from "./olmo"
import { OpenCoderProvider } from "./opencoder"
import { PhiProvider } from "./phi"
import { QwenProvider } from "./qwen"
import { SmolLmProvider } from "./smollm"
import { StarCoderProvider } from "./starcoder"
import { YiProvider } from "./yi"

export class ProviderFactory {
  static createAll(): BaseProvider[] {
    return [
      new QwenProvider(),
      new GlmProvider(),
      new DeepSeekProvider(),
      new LlamaProvider(),
      new MistralProvider(),
      new MixtralProvider(),
      new PhiProvider(),
      new GemmaProvider(),
      new OlmoProvider(),
      new FalconProvider(),
      new YiProvider(),
      new InternLmProvider(),
      new BaichuanProvider(),
      new MiniCpmProvider(),
      new SmolLmProvider(),
      new OpenCoderProvider(),
      new StarCoderProvider(),
      new CodeGeeXProvider(),
      new CodeLlamaProvider(),
      new GraniteProvider(),
      new AyaProvider(),
      new CommandRProvider(),
    ]
  }

  static createMap() {
    return new Map(this.createAll().map((provider) => [provider.id, provider]))
  }
}
