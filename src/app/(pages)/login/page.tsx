import { AuthForm } from "@/modules/auth/components";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";
import Link from "next/link";

export default function Login() {
  const LANGUAGE = LanguageSelector();

  return (
    <div>
      Login page <Link href={"/register"}>{LANGUAGE?.auth.linkToRegister}</Link>
      <p>{LANGUAGE?.auth.principalTitle}</p>
      <AuthForm />
    </div>
  );
}
