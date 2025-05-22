export type ResponseAiType = {
  output: OutputType
  stopReason: string
  usage: UsageType
}

export type OutputType = {
  message: MessageType
}

export type MessageType = {
  content: ContentType[]
  role: string
}

export type ContentType = {
  text: string
}

export type UsageType = {
  inputTokens: number
  outputTokens: number
  totalTokens: number
  cacheReadInputTokenCount: number
  cacheWriteInputTokenCount: number
}