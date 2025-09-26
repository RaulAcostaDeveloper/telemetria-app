"use client";

import { AuthForm } from "@/modules/auth/components";
import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

export default function LoginPage() {
  const LANGUAGE = useLanguage();

  return <AuthForm LANGUAGE={LANGUAGE} />;
}
