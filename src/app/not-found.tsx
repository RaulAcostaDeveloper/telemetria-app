"use client";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname !== "/") {
    router.back();
  }

  return null;
}
