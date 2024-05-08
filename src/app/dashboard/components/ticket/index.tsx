"use client";

import { IoCheckboxOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { TiketsProp } from "@/utils/ticket.type";
import { CustomersProp } from "@/utils/customer.type";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext, ModalProvider } from "@/provider/modal";

interface TicketItems {
  ticket: TiketsProp;
  customer: CustomersProp | null;
}

export function Ticket({ customer, ticket }: TicketItems) {

  const router = useRouter();

  const {handleModalVisible, handleDetails} = useContext(ModalContext);

  function handleOpenModal (){
      handleModalVisible();
      handleDetails({
        customer:customer,
        ticket: ticket,
      });
  }



  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="font-medium text-left pl-1">{ticket?.name}</td>
        <td className="font-medium text-left hidden sm:table-cell">
          {ticket?.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="font-medium text-left">
          <span className="bg-blue-400 px-2 py-1 rounded font-medium">
            {ticket.status}
          </span>
        </td>
        <td className="font-medium text-left">
          <button
            className="mr-2"
            title="arquivar"
            onClick={handleChangeStatus}
            type="button"
          >
            <IoCheckboxOutline size={24} color="#131313" />
          </button>
          <button title="detalhes" onClick={handleOpenModal} type="button">
            <FaRegFileAlt size={24} color="Blue" />
          </button>
        </td>
      </tr>
    </>
  );
}
