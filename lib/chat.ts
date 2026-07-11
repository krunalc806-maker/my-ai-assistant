import { supabase } from "./supabase";

export async function createConversation(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
      user_id: userId,
      title: "New Chat",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function saveMessage(
  conversationId: string,
  role: string,
  content: string
) {
  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    role,
    content,
  });

  if (error) throw error;
}