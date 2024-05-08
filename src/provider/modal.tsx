"use client"

import {Children, createContext, ReactNode, useState} from "react";
import {TiketsProp} from "@/utils/ticket.type";
import { CustomersProp} from "@/utils/customer.type";
import { Modal } from "@/components/Modal";

interface ModalData{
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  handleDetails: (details: TicketInfo) => void;
}

interface TicketInfo{
    ticket: TiketsProp;
    customer: CustomersProp | null;
}

export const ModalContext = createContext({} as ModalData )

export const ModalProvider = ({children}:{children:ReactNode}) => {

    const [ticket, setTicket] = useState<TicketInfo>();

    const [visible, setVisible] = useState(false);

    function handleModalVisible(){
         setVisible(!visible)
    }

    function handleDetails(details:TicketInfo){
        setTicket(details);
    }

    return(
        <ModalContext.Provider value={{visible, handleModalVisible, ticket ,handleDetails}}>
          {visible && <Modal/> }
           {children}
        </ModalContext.Provider>
    )
}
    