import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hola <Link href={"/login"}>Ir a Login</Link>
    </div>
  );
}
