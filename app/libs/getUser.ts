import { supabase } from "./supabase";

async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export default getUser;
