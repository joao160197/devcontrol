"use client"

import { TbRefresh } from "react-icons/tb";
import { useRouter } from "next/navigation";

export function Refresh(){

    const router = useRouter();


    return(
        <button onClick={()=>router.refresh()} className="bg-blue-800 p-3 rounded hover:bg-blue-600 duration-100" title="refresh" type="button">
           <TbRefresh size={17}  color="white"/>
        </button>
    )
}