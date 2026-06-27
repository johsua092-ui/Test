Read QWEN.md first and follow all project conventions.

Design and implement a modular AI provider system for this Bun + Elysia API.

Requirements:
- Create a provider abstraction so new models can be added easily.
- Each provider must implement the same interface.
- Use TypeScript.
- Follow the existing router conventions and response format from QWEN.md.

Implement support for these open/open-weight model families:

- Qwen (all available variants)
- GLM (all open variants)
- DeepSeek (all open variants)
- Llama
- Mistral
- Mixtral
- Phi
- Gemma
- OLMo
- Falcon
- Yi
- InternLM
- Baichuan
- MiniCPM
- SmolLM
- OpenCoder
- StarCoder
- CodeGeeX
- CodeLlama
- Granite
- Aya
- Command-R (if available through compatible providers)

Architecture:
- providers/
  - BaseProvider.ts
  - ProviderFactory.ts
  - ProviderManager.ts
  - qwen/
  - glm/
  - deepseek/
  - llama/
  - mistral/
  - etc.

Features:
- Streaming support
- Non-streaming support
- Chat completion
- System prompt
- Temperature
- Top_p
- Max tokens
- JSON mode (when supported)
- Vision support (if supported)
- Embeddings (if supported)

Create a router:
/api/ai/chat

The endpoint should:
- Accept provider, model, messages, temperature, top_p, max_tokens, stream.
- Validate input.
- Return the standard project response format.

Do not use proprietary providers such as OpenAI GPT, Anthropic Claude, Gemini, Grok, or other closed models.

Keep everything modular so additional providers can be added later without changing existing code.
