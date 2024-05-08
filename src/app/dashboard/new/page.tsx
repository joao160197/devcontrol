import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prismaClient from "@/lib/prisma";

export default async function NewTickets() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegister(formData: FormData){
    "use server"

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customerId");

    if(!name || !description ||!customerId){
      return;
    }


    await prismaClient.ticket.create({
      data:{
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status:"ABERTO",
        userId: session?.user.id
      }
    })

    redirect("/dashboard");
  }

  return (
    <Container>
      <div className="flex flex-row w-full gap-2 mt-10">
        <Link
          className="font-bold text-sm text-white bg-black p-2 rounded hover:scale-105 duration-600"
          href="/dashboard"
        >
          Voltar
        </Link>
        <h1 className="text-black font-bold text-3xl">Novo Chamado</h1>
      </div>
      <form className="mt-10 flex flex-col" action={handleRegister}>
        <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
        <input
          className="w-full border-gray-400 border-2 p-2 rounded mt-2 mb-5 h-11"
          type="text"
          placeholder="Digite o nome do chamado"
          name="name"
          required
        />
        <label className="mb-1 font-medium text-lg">Descreva o Problema</label>
        <textarea
          className="w-full border-gray-400 border-2 p-2 rounded mt-2 mb-5 h-40 resize-none"
          placeholder="Descreva o Problema que está ocorrendo..."
          name="description"
          required
        ></textarea>

        {customers.length !== 0 && (
          <>
            <label className="mb-1 font-medium text-lg">
              Selecione um Cliente
            </label>

            <select
              title="string"
              className="w-full border-gray-400 border-2 p-2 rounded mt-2 mb-2 h-11 bg-white"
              name="customerId"
            >
              {customers.map((customers) => (
                <option key={customers.id} value={customers.id}>
                  {customers.name}
                </option>
              ))}
            </select>
          </>
        )}

        {customers.length === 0 && (
            <Link href="/dashboard/customers/new">
           Você  ainda não tem nemnhum cliente, <span className="text-blue-500 font-medium">Cadastrar Cliente</span>
            </Link>
        )}

        <button
          type="submit"
          title="Cadastrar"
          className="mt-3 mb-5 bg-blue-500 text-white text-lg px-2 py-2 rounded hover:bg-blue-600 duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
          disabled={customers.length === 0}
        >
          Cadastrar
        </button>
      </form>
    </Container>
  );
}
