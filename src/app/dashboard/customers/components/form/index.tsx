"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof schema>;

export function ClientForm({userId}:{userId: string}) {
  const schema = z.object({
    name: z.string().min(1, "Campo obrigatório"),
    email: z
      .string()
      .email("Digitar um email valido")
      .min(1, "Campo obrigatório"),
      phone: z.string().refine(
      (value) => {
        return (
          /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) ||
          /^\d{2}\s\d{9}$/.test(value) ||
          /^\d{11}$/.test(value)
        );
      },
      { message: "O numero deve ser (DD) 999999999 " }
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const  router = useRouter();

  async function HandleRegister(data: FormData){
     await api.post("/api/customer",{
      name: data.name,
      phone: data.phone,
      email: data.email,
      userId: userId
     })
      
     router.refresh();
     router.replace("/dashboard/customers")
  }

  return (
    <form className="flex flex-col" onSubmit={ handleSubmit(HandleRegister)}>
      <label className="font-bold text-lg mb-1" htmlFor="">
        Nome Completo
      </label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo..."
        error={errors.name?.message as string}
        register={register}
      />

      <div className="flex gap-2 mt-8">
        <div className="w-full">
          {" "}
          <label className="font-bold text-lg mb-1" htmlFor="">
            Telefone
          </label>
          <Input
            type="text"
            name="phone"
            placeholder="Telefone"
            error={errors.phone?.message as string}
            register={register}
          />
        </div>

        <div className="w-full">
          <label className="font-bold text-lg mb-1" htmlFor="">
            Email
          </label>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            error={errors.email?.message as string}
            register={register}
          />
        </div>
      </div>

      <button
        type="submit"
        title="Cadastrar"
        className="mt-8 bg-blue-500 text-white text-lg px-2 py-2 rounded hover:bg-blue-600 duration-300 "
      >
        Cadastrar
      </button>
    </form>
  );
}
