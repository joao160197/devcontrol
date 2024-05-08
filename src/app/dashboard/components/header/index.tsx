import { Container } from "@/components/container";
import Link from "next/link";


export function DashboardHeader(){
    return(
        <Container>
          <header className="w-full bg-gray-900 my-4 rounded p-3 flex items-center gap-4">
            <Link className="text-white hover:font-bold duration-300" href="/dashboard">
                Chamados
            </Link>
            <Link className="text-white hover:font-bold duration-300" href="/dashboard/customers">
                Clientes
            </Link>
          </header>
        </Container>
    )
}