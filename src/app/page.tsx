import { getServerSession } from "next-auth";
import { GET as handler } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";
import WeeklyCarousel from "./components/carrousel";
import Link from "next/link";

interface Iuser {
  user: {
    name: string;
    email: string;
  };
}

// Importação dinâmica para evitar problemas com client-side components
const ChecklistForm = dynamic(() => import("./components/forms"), {
  ssr: true,
});

export default async function Home() {
  const user: Iuser | null = await getServerSession(handler); // Provide a default value for user if it is null

  if (user) {
    return (
      <div
        className={`flex flex-col font-anton text-center justify-around w-screen h-screen bg-gradient-to-b from-[#f9f5eb] via-[#f2e8dc] to-[#d2bba3]`}
      >
        <div className="mt-10">
          <h1 className="text-[#b19b88] text-2xl mb-10">
            Olá {user.user.name.split(" ")[0]}! Vamos registrar o dia de hoje?
          </h1>
        </div>
        <div>
          <ChecklistForm userEmail={user.user.email} />
        </div>

        <div className="mt-10">
          <p className="text-[#b19b88] text-xl">
            Vamos conferir como foram os outros dias?{" "}
          </p>
        </div>
        <div>
          <WeeklyCarousel />
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#f8f9cf] via-[#d9cbb8] to-[#8b6f58] text-[#b19b88]">
      <h1 className="text-2xl text-[#8b6f58] font-bold mb-4">
        Bem-vindo ao Fitness APP
      </h1>
      <p className="text-lg text-[#8b6f58] mb-8">
        Gerencie sua rotina fitness :)
      </p>

      <Link
        href="/api/auth/signin"
        className="mt-5 inline-block bg-[#8b6f58] text-white px-6 py-3 rounded-md shadow-lg hover:bg-[#8b6f58] transition duration-300"
      >
        Entrar
      </Link>
    </main>
  );
}
