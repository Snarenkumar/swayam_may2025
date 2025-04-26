import { registrationSchema } from "@/types/zod/registrationSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const data = registrationSchema.parse(body);
    console.log(data);
    return NextResponse.json({ messsage: "Successful" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ messsage: "Error" }, { status: 500 });
  }
};
