import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage({ searchParams }: { searchParams: { redirect?: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirectTo = searchParams.redirect || '/';

  if (user) {
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("provider_user_id", user.id)
      .maybeSingle();

    if (!existingUser) {
      await supabase.from("users").insert({
        provider: user.app_metadata?.provider,
        provider_user_id: user.id,
        email: user.email ?? null,
        nickname: user.user_metadata?.name ?? null,
        profile_image: user.user_metadata?.avatar_url ?? null,
      });
    }
  }

  redirect(redirectTo);
}