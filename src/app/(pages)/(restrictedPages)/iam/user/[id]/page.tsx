"use client";

import { useLanguage } from "@/global/language/components/languageProvider/languageProvider";

interface Page {
  params: {
    id: string;
  };
}

export default function User({ params }: Page) {
  const { id } = params; // id del usuario

  const LANGUAGE = useLanguage();

  return <div>Page</div>;
}
