import admin from "firebase-admin"
import { db } from "../../../lib/firebase"
import { ProviderError, ProviderManager } from "../../../providers"

const providerManager = new ProviderManager()

async function writeStream(response: Response, res: any) {
  res.status(response.status)
  response.headers.forEach((value, key) => res.setHeader(key, value))

  const reader = response.body?.getReader()

  if (!reader) {
    res.end()
    return
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    res.write(Buffer.from(value))
  }

  res.end()
}

async function authorize(req: any) {
  const apiKey = req.headers.authorization?.replace("Bearer ", "")

  if (!apiKey) {
    throw new ProviderError("Unauthorized", 401)
  }

  const keyDoc = await db.collection("api_keys").doc(apiKey).get()

  if (!keyDoc.exists || !keyDoc.data()?.active) {
    throw new ProviderError("Invalid API key", 401)
  }

  return apiKey
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      status: false,
      error: "Method not allowed",
      code: 405,
    })
  }

  try {
    const apiKey = await authorize(req)
    const request = providerManager.normalizeChatRequest(req.body || {})

    if (request.stream) {
      const response = await providerManager.streamChatCompletion(request)
      await db.collection("api_keys").doc(apiKey).update({
        lastUsed: new Date(),
        usage: admin.firestore.FieldValue.increment(1),
      })
      return writeStream(response, res)
    }

    const result = await providerManager.chatCompletion(request)

    await db.collection("api_keys").doc(apiKey).update({
      lastUsed: new Date(),
      usage: admin.firestore.FieldValue.increment(1),
    })

    return res.status(200).json({
      status: true,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    const code = error instanceof ProviderError ? error.code : 500

    return res.status(code).json({
      status: false,
      error: error.message || "Internal Server Error",
      code,
    })
  }
}
