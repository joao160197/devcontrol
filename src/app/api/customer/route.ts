
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'
import { error } from 'console';

//Deletar clientes

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if(!session || !session.user){
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }



  const {searchParams} = new URL(request.url);
  const userId = searchParams.get("id");

  if(!userId){
    return NextResponse.json({ error: "failed to find id" }, { status: 401 });
  }
  
  try{
    await prismaClient.customer.delete({
      where:{
        id: userId as string
      }
    })


    return NextResponse.json({message:"Cliente Deletado!!!"})



  }catch(err){;
     console.log(err)
     return NextResponse.json({ error: "failed to delete" }, { status: 401 });
  }

  
}

//pesquisar o cliente


export async function GET(request: Request){
  const { searchParams } = new URL(request.url)
  const customerEmail = searchParams.get("email")

  if(!customerEmail || customerEmail === ""){
    return NextResponse.json({ error: "Customer not found" }, { status: 400 })
  }

  try{
    const customer = await prismaClient.customer.findFirst({
      where:{
        email: customerEmail 
      }
    })

    return NextResponse.json(customer)

  }catch(err){
    return NextResponse.json({ error: "Customer not found" }, { status: 400 })
  }

}

//rota de cadastro dos clientes

export async function POST(request: Request){
  const session = await getServerSession(authOptions);

  if(!session || !session.user){
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { name, email, phone, userId } = await request.json();

  try{
    await prismaClient.customer.create({
      data:{
        name,
        phone,
        email,
        userId: userId
      }
    })

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" })

  }catch(err){
    return NextResponse.json({ error: "Failed crete new customer" }, { status: 400 })
  }

}