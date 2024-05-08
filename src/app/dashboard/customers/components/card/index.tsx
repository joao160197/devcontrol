"use client"

import {CustomersProp} from "@/utils/customer.type"
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


export function CustomerCard({customer}:{customer:CustomersProp}) {

  const router = useRouter();

async function DeleteAction(){
    try{
      const response = await api.delete("/api/customer",{
        params: {
          id: customer.id
        }
      })
    
      console.log(response.data);
      router.refresh();

    }catch(err){
      console.log(err);
    }
}

  return (
    <article className="flex flex-col bg-gray-100 p-2 rounded-2 mt-4 mb-2 border-2 gap-2 hover:bg-gray-200 duration-300 hover:scale-105 duration-500">
      <h2>
        <a className="font-bold">Nome: </a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email: </a>{customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone: </a>{customer.phone}
      </p>
      <div>
        <button
          className="bg-red-500 px-4 text-white rounded"
          type="button"
          title="Deletar"
          onClick={DeleteAction}
        >
          Deletar
        </button>
      </div>
    </article>
  );
}
