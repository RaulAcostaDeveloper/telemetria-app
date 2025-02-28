import { AuthForm } from "@/modules/auth/components";
import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";

export default function Login() {
  const LANGUAGE = LanguageSelector();

  return (
    <div>
      Login page
      <p>{LANGUAGE?.auth.principalTitle}</p>
      <AuthForm />
    </div>
  );
}
