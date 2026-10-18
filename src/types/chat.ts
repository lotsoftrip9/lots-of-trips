import type { ImageAsset } from "./image";

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
  language?: string;
}

export interface ChatLinkCard {
  href: string;
  title: string;
  meta: string;
  image: ImageAsset;
}

export type ChatCardIndex = Record<string, ChatLinkCard>;
