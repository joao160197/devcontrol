import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CustomerCard } from "./components/card";
import Link from "next/link";
import prismaClient from "@/lib/prisma";
import { Refresh } from "../components/refresh"; 

export default async function Customers() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main>
     
        <div className="flex items-center justify-between">
          <h1 className="text-black font-bold text-3xl">Clientes</h1>
          <div className="flex items-center gap-4">
          <Refresh/> 
          <Link
            className="bg-green-400 p-2 rounded hover:bg-green-500 duration-500"
            href="/dashboard/customers/new"
          >
            Novo Cliente
          </Link>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </section>
        {customers.length === 0 && (
          <h1 className="flex items-center ml-1 mt-2 ">Nenhum cliente cadastrado.</h1>
        )}
      </main>
    </Container>
  );
}
