import EventSidebar from "@/components/eventRegistration/EventSidebar";
import EventRegistration from "@/components/eventRegistration/RegistrationForm";
import { authOptions } from "@/lib/auth";
import { clubsType, getClubEvent } from "@/lib/eventsData";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    eventId: string;
  }>;
  searchParams: Promise<{
    clubName: clubsType;
  }>;
}) {
  const { eventId } = await params;
  const clubName = (await searchParams).clubName;

  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user.email || !session.user.id)
    return redirect(
      `/api/auth/signin/google?callbackUrl=${
        process.env.BASE_URL || "http://localhost:3000"
      }/${eventId}/register?clubName=${clubName}`
    );
  const event = getClubEvent(clubName, eventId);
  if (!event) return <h1>The event you are looking for does not exist</h1>;
  if (!clubName)
    return <h1>Clubname mst be provided in the search query params</h1>;

  const registedBefore = await prisma.registration.findFirst({
    where: {
      eventId,
      userId: session.user.id,
    },
    include: {
      teamMembers: true,
    },
  });

  if (registedBefore?.paymentId) return redirect("/events");
  return (
    <div className="min-h-screen bg-[#fff4d4] text-[#5f4a37] pb-16">
      <header className="bg-[#5f4a37] text-[#fff4d4] py-6 px-4 md:px-6 mb-8">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Event Registration</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EventRegistration
            event={event}
            registeredBefore={registedBefore ? registedBefore : undefined}
            userId={session.user.id}
            email={session.user.email}
            clubName={clubName}
          />
          <EventSidebar event={event} clubName={clubName} />
        </div>
      </div>
    </div>
  );
}
