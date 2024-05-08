"use client";

import { ModalContext } from "@/provider/modal";
import { useContext, useRef, MouseEvent } from "react";

export function Modal() {
  const { handleModalVisible, ticket } = useContext(ModalContext);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const HandlemodalClick = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleModalVisible();
    }
  };

  return (
    <section
      onClick={HandlemodalClick}
      className="absolute bg-gray-900/70 w-full min-h-screen"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg md:text-2xl">
              Detalhes do Chamado
            </h1>
            <button
              className="bg-red-700 p-1 px-2 text-lg text-white rounded-lg font-bold"
              title="fechar"
              type="button"
              onClick={handleModalVisible}
            >
              fechar
            </button>
          </div>
          <div className=" flex flex-wrap gap-1 mb-2">
            <h2 className=" font-bold">Nome:</h2>
            <p className=" font-normal">{ticket?.ticket.name}</p>
          </div>
          <div className=" flex flex-wrap flex-col gap-1 mb-2">
            <h2 className=" font-bold">Descriçao:</h2>
            <p className=" font-normal">{ticket?.ticket.description}</p>
          </div>
          <div className="border-gray-400 border-b-[1px] my-4 w-full"></div>
          <h1 className="font-bold text-lg mb-4">Detalhes do Cliente</h1>
          <div className=" flex flex-wrap gap-1 mb-2">
            <h2 className=" font-bold">Nome:</h2>
            <p className=" font-normal">{ticket?.customer?.name}</p>
          </div>
          <div className=" flex flex-wrap gap-1 mb-2">
            <h2 className=" font-bold">Telefone:</h2>
            <p className=" font-normal">{ticket?.customer?.phone}</p>
          </div>
          <div className=" flex flex-wrap gap-1 mb-2">
            <h2 className=" font-bold">Email:</h2>
            <p className=" font-normal">{ticket?.customer?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
