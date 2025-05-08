import EventSidebar from "@/components/eventRegistration/EventSidebar";
import EventRegistration from "@/components/eventRegistration/RegistrationForm";
import { authOptions } from "@/lib/auth";
import { getClubEvent } from "@/lib/eventsData";
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
    clubName:
      | "Dhwani"
      | "Nrityatrix"
      | "Raagabhinaya"
      | "Toastmasters"
      | "Aakriti"
      | "Saahitya";
  }>;
}) {
  const { eventId } = await params;
  const clubName = (await searchParams).clubName;

  const session = await getServerSession(authOptions);
  if (!session?.user.email || !session.user.id)
    return <h1>You need to sign in with Google before continuing.</h1>;
  const event = getClubEvent(clubName, eventId);
  if (!event) return <h1>Event not found</h1>;
  const registedBefore = await prisma.registration.findFirst({
    where: {
      eventId,
      userId: session.user.id,
    },
    include: {
      teamMembers: true,
    },
  });

  if (registedBefore) console.log(registedBefore);
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
