import { Container } from "@/components/container";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientForm } from "../components/form";


export default async function NewCustomer() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      redirect("/");
    }
    
  return (
    <Container>
      <div className="flex flex-row w-full gap-2 mt-10">
        <Link
          className="font-bold text-sm text-white bg-black p-2 rounded hover:scale-105 duration-600"
          href="/dashboard/customers"
        >
          Voltar
        </Link>
        <h1 className="text-black font-bold text-3xl">Novo Cliente</h1>
      </div>
      <div className="mt-10">
        <ClientForm userId={session.user.id}/>
      </div>
    </Container>
  );
}
