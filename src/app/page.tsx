import { getServerSession } from "next-auth";
import { GET as handler } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";
import WeeklyCarousel from "./components/carrousel";

// Importação dinâmica para evitar problemas com client-side components
const ChecklistForm = dynamic(() => import("./components/forms"), {
  ssr: true,
});

export default async function Home() {
  const user = await getServerSession(handler);

  if (!user) {
    return (
      <div
        className={`flex flex-col font-anton text-center justify-around w-screen h-screen bg-gradient-to-b from-[#f9f5eb] via-[#f2e8dc] to-[#d2bba3]`}
      >
        <div className="mt-10">
          <h1 className="text-[#b19b88] text-2xl mb-10">
            Olá! Vamos registrar o dia de hoje?
          </h1>
        </div>
        <div>
          <ChecklistForm />
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
    <main className="text-center mt-20">
      <h1 className="text-2xl font-bold">Welcome to Fitness APP</h1>
      <p className="text-gray-600">Manage your fitness routine :)</p>

      <a
        href="/api/auth/signin"
        className="mt-5 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign in
      </a>
    </main>
  );
}
