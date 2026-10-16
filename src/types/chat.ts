export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  failed?: boolean;
}

export type ChatPayloadMessage = Pick<ChatMessage, "role" | "content">;

export interface ChatRequestBody {
  messages: ChatPayloadMessage[];
  page?: string;
}
