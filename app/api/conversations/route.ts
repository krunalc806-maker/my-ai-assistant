import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST() {
  const { data, error } = await supabase
    .from("conversations")
    .insert({
  id: crypto.randomUUID(),
  user_id: crypto.randomUUID(),
  title: "New Chat",
})
    .select()
    .single();

console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
  console.log(error);
  return NextResponse.json(error, { status: 500 });
}

  return NextResponse.json(data);
}