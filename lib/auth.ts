import { cookies } from "next/headers";
import { adminClient, authClient } from "@/lib/supabase";

export async function requireHr() {
  const store = await cookies();
  const token = store.get("hr_access_token")?.value;
  if (!token) return null;

  const auth = authClient();
  const { data, error } = await auth.auth.getUser(token);
  if (error || !data.user) return null;

  const admin = adminClient();
  const { data: profile } = await admin
    .from("hr_profiles")
    .select("user_id, display_name, role")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!profile) return null;
  return { user: data.user, profile };
}
