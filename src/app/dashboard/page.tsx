import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Ticket } from "@/app/dashboard/components/ticket";
import { Refresh } from "./components/refresh";

import prismaClient from "@/lib/prisma";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id
      }
    },
    include: {
      customer: true,
    },
    orderBy: {
      created_at: "asc"
    }
  })

  return (
    <Container>
      <div className="w-full flex items-center justify-between mt-9 mb-2">
        <h1 className="text-black font-bold text-3xl">Chamadas</h1>
       <div className="flex items-center gap-4">
        <Refresh/>
       <Link
          className="bg-green-400 p-2 rounded  hover:bg-green-500 duration-500"
          href="/dashboard/new"
        >
          Abrir Chamados
        </Link>
       </div>
      </div>
      <table className="min-w-full my-5">
        <thead>
          <tr>
            <th className="font-medium text-left PL-1">CLIENTE</th>
            <th className="font-medium text-left hidden sm:block">CADASTRO</th>
            <th className="font-medium text-left">STATUS</th>
            <th className="font-medium text-left">#</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map( ticket => (
            <Ticket
              key={ticket.id}
              customer={ticket.customer}
              ticket={ticket}
            />
          ))}
        </tbody>
      </table>
      {tickets.length === 0 && (
        <h1 className="flex items-center ml-1 mt-2 md:px-0">Nenhum chamado criado.....</h1>
      )}
    </Container>
  );
}
