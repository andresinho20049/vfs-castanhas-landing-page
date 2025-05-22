export type ChatBotType = {
  userid: string
  messages: ChatMessageType[]
}

export type ChatMessageType = {
  text: string
  type: "user" | "assistant"
}
