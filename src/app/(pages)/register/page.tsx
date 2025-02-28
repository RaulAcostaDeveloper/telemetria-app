import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";

import Link from "next/link";

export default function Register() {
  const LANGUAGE = LanguageSelector();

  return (
    <div>
      Register page <Link href={"/"}>{LANGUAGE?.auth.linkToHome}</Link>
    </div>
  );
}
