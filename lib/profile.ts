import { supabase } from "./supabase";

export async function saveUser(user: {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }
}