"use client";

import { AuthForm } from "@/modules/auth/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

export default function Login() {
  const LANGUAGE = useLanguage();

  return (
    <div>
      Login page
      <p>{LANGUAGE?.auth.principalTitle}</p>
      <AuthForm LANGUAGE={LANGUAGE} />
    </div>
  );
}
