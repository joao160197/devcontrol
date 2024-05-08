import Image from "next/image";
import home from "../imgs/home.png";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h2 className="text-black font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="text-blue-600 font-bold text-3xl mb-11">Atendimentos, Clientes</h1>

      <Image
        src={home}
        priority
        quality={100}
        width={600}
        height={600}
        alt="Imagem do Home"
        className="max-w-sm md:max-w-xl"
      ></Image>
    </main>
  );
}
