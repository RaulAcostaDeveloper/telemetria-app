"use client"
import { HomeBriefFuelDataProvider } from "@/modules/home/components";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider"

export default function Home() {
  const LANGUAGE = useLanguage();

  return(
    <div>
      {/* <section> */}
      <HomeBriefFuelDataProvider LANGUAGE={LANGUAGE} />
      {/* </section> */}
    </div>
  )
}