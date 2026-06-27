import { ModelCapabilities } from "./BaseProvider"

export const defaultCapabilities: ModelCapabilities = {
  chat: true,
  streaming: true,
  jsonMode: true,
  vision: false,
  embeddings: false,
}

export function model(id: string, capabilities: Partial<ModelCapabilities> = {}, aliases: string[] = []) {
  return {
    id,
    aliases,
    capabilities: {
      ...defaultCapabilities,
      ...capabilities,
    },
  }
}
