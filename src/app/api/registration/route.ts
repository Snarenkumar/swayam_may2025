import { authOptions } from "@/lib/auth";
import { clubsSchema, getClubEvent } from "@/lib/eventsData";
import { prisma } from "@/lib/prisma";
import { Event } from "@/types/event";
import { registrationSchema } from "@/types/zod/registrationSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const club = searchParams.get("clubName");
    if (!club)
      return NextResponse.json(
        {
          message:
            "You have to provide the club name in searchParams to make this request",
        },
        { status: 400 }
      );
    const parsedClub = clubsSchema.parse(club);
    const body = await req.json();
    const { teamMembers, ...data } = registrationSchema.parse(body);
    const { maxTeamMembers, minTeamMembers }: Event = getClubEvent(
      parsedClub,
      data.eventId
    );

    if (
      teamMembers?.length &&
      !(
        teamMembers.length + 1 >= minTeamMembers &&
        teamMembers.length + 1 <= maxTeamMembers
      )
    )
      return NextResponse.json(
        { message: "No of team memebers do not match the given limit" },
        { status: 400 }
      );
    else if (teamMembers?.length && maxTeamMembers == 1)
      return NextResponse.json(
        { message: "It is a solo event, there can be no teammates" },
        { status: 400 }
      );
    const registration = await prisma.registration.create({
      data: {
        ...data,
        teamMembers: teamMembers?.length
          ? { createMany: { data: teamMembers } }
          : undefined,
      },
    });
    return NextResponse.json(
      { messsage: "Successful", id: registration.id },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ messsage: "Error" }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ message: "Id is required" }, { status: 400 });
    const session = await getServerSession(authOptions);
    if (!session?.user)
      return NextResponse.json(
        { message: "You are not authorized to do this action" },
        { status: 401 }
      );
    const registration = await prisma.registration.findFirst({
      where: {
        id,
      },
    });
    if (!registration)
      return NextResponse.json(
        { message: "The id you are looking for doesn't exist" },
        { status: 400 }
      );
    else if (registration.userId != session?.user.id)
      return NextResponse.json(
        { message: "You are not authorized to do this action" },
        { status: 401 }
      );
    await prisma.registration.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
