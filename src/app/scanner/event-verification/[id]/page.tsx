import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  User,
  School,
  Phone,
  Users,
  Calendar,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { getEventDetailsById } from "@/lib/eventsData";

const Page = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  if (!id) return redirect("/scanner/event-verification");

  const registration = await prisma.registration.findFirst({
    where: { id },
    include: {
      teamMembers: true,
    },
  });

  if (!registration)
    return (
      <div className="min-h-screen bg-[#fff4d4] text-[#5f4a37] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Registration Not Found</h1>
          <p className="mb-6">
            We couldn&apos;t find the registration you&apos;re looking for.
          </p>
          <Link
            href="/scanner/event-verification"
            className="inline-block bg-[#5f4a37] text-white px-6 py-2 rounded-md hover:bg-[#4a3928] transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    );

  if (!registration.paymentId)
    return (
      <div className="min-h-screen bg-[#fff4d4] text-[#5f4a37] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <XCircle className="mx-auto h-16 w-16 text-amber-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Pending</h1>
          <p className="mb-6">This registration has not been paid for yet.</p>
          <Link
            href="/scanner/event-verification"
            className="inline-block bg-[#5f4a37] text-white px-6 py-2 rounded-md hover:bg-[#4a3928] transition-colors"
          >
            Go Back
          </Link>
        </div>
      </div>
    );

  const event = getEventDetailsById(registration.eventId);
  if (!event) return redirect("/scanner/event-verification");

  return (
    <div className="min-h-screen bg-[#fff4d4] text-[#5f4a37] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with Payment Status Banner */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-[#5f4a37] text-white p-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              {event.event.name}
            </h1>
            <p className="text-[#fff4d4] opacity-90">
              {event.event.description}
            </p>
          </div>

          {/* Payment Status Banner */}
          <div className="bg-green-500 text-white p-3 text-center flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Payment Confirmed</span>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">{registration.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{registration.phone}</p>
                </div>
              </div>

              <div className="flex items-start">
                <School className="h-5 w-5 mr-2 mt-1" />
                <div>
                  <p className="font-medium">College</p>
                  <p>{registration.collegeName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="h-5 w-5 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Club</p>
                  <p>{event.club}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 mt-1" />
                <div>
                  <p className="font-medium">USN</p>
                  <p>{registration.usn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        {registration.teamMembers && registration.teamMembers.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Members
            </h2>

            <div className="space-y-4">
              {registration.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">USN: {member.usn}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Payment ID</p>
              <p className="font-mono bg-gray-50 p-2 rounded">
                {registration.paymentId}
              </p>
            </div>

            <div>
              <p className="font-medium">Amount</p>
              <p className="text-lg">
                ₹{registration.paymentAmount?.toFixed(2) || "0.00"}
              </p>
            </div>

            <div>
              <p className="font-medium">Registration Date</p>
              <p>{JSON.stringify(registration.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/scanner/event-verification"
            className="bg-[#5f4a37] hover:bg-[#4a3928] text-white py-3 px-6 rounded-lg shadow-md flex items-center justify-center font-medium"
          >
            Back to Scanner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
