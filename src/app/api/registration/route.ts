import { registrationSchema } from "@/types/zod/registrationSchema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = req.body;
    console.log(body);
    const data = registrationSchema.parse(body);
    return NextResponse.json({ messsage: "Successful" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ messsage: "Hello World" });
  }
};
