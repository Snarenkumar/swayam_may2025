import { authOptions } from "@/lib/auth";
import { getEventDetailsById } from "@/lib/eventsData";
import { prisma } from "@/lib/prisma";
import { Event } from "@/types/event";
import { Registration } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Ticket,
  Check,
  AlertCircle,
  ChevronRight,
  User,
} from "lucide-react";
import QRCode from "qrcode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getPaymentStatus = (paymentId: string | null) => {
  // if (!registration.paymentAmount) return "FREE";
  if (paymentId) return "PAID";
  return "PENDING";
};

const getPaymentStatusBadge = (paymentId: string | null) => {
  const status = getPaymentStatus(paymentId);

  switch (status) {
    case "PAID":
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
          <Check className="h-3 w-3 mr-1" />
          Paid
        </div>
      );
    case "PENDING":
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </div>
      );
    // case "FREE":
    //   return (
    //     <div className="flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
    //       <Check className="h-3 w-3 mr-1" />
    //       Free
    //     </div>
    //   );
    default:
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          Unknown
        </div>
      );
  }
};

const getQr = async (id: string) => {
  const qr = await QRCode.toDataURL(id, {
    width: 150,
    margin: 1,
    color: {
      dark: "#5f4a37ff",
      light: "#fff4d400",
    },
  });
  return qr;
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user)
    return redirect(
      `/api/auth/signin?callbackUrl=${
        process.env.BASE_URL || "http://localhost:3000"
      }/profile`
    );
  const registrationsWithoutEvents = await prisma.registration.findMany({
    where: {
      userId: session.user.id,
    },
  });
  const qrPromises = registrationsWithoutEvents.map((reg) => getQr(reg.id));

  // 2. Await them all
  const qrDataUrls = await Promise.all(qrPromises);

  const registrations: (Registration & {
    event?: Event;
    club?: string;
    qr: string;
  })[] = registrationsWithoutEvents.map((registration, idx) => {
    return {
      ...registration,
      ...getEventDetailsById(registration.eventId),
      qr: qrDataUrls[idx],
    };
  });
  const user = session.user;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:pt-16 min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-4 sm:p-6 md:sticky md:top-32">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || "User Name"}
                  height={100}
                  width={100}
                />
                <AvatarFallback className="bg-foreground text-white">
                  <User />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                {user.name}
              </h2>
              <p className="text-sm text-[#5F4A37]/80 mb-4">{user.email}</p>

              <div className="w-full pt-4 border-t border-[#5F4A37]/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">
                    Your Registrations
                  </span>
                  <span className="font-bold">{registrations.length}</span>
                </div>

                <Link
                  href="/events"
                  className="block w-full text-center py-2.5 px-4 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors"
                >
                  Browse More Events
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-9">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Your Registered Events
          </h2>

          {registrations.length === 0 ? (
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6 sm:p-8 text-center">
              <div className="max-w-md mx-auto py-6 sm:py-8">
                <Image
                  src="/assets/mvjLogo.png"
                  alt="No events"
                  width={100}
                  height={100}
                  className="mx-auto opacity-40 mb-5 sm:mb-6"
                />
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  No Events Registered
                </h3>
                <p className="mb-5 sm:mb-6 text-sm sm:text-base">
                  You haven&apos;t registered for any events yet. Browse our
                  exciting events and join the fun!
                </p>
                <Link
                  href="/events"
                  className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {registrations.map((registration) => (
                <div
                  key={registration.id}
                  className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Event Card */}
                  {registration.event ? (
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0 bg-[#5F4A37]/10">
                            {registration.event.image ? (
                              <Image
                                src={registration.event.image}
                                alt={registration.event.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[#5F4A37] text-lg font-bold">
                                  {registration.event.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold mb-0.5 truncate">
                              {registration.event.name}
                            </h3>
                            {/* <p className="text-xs text-[#5F4A37]/80">
                            {registration.event.clubName}
                          </p> */}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          {getPaymentStatusBadge(registration.paymentId)}
                        </div>
                        {!registration.paymentId && (
                          <Link
                            className="text-center py-2.5 px-4 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors"
                            href={`/${registration.eventId}/register?clubName=${registration.club}`}
                          >
                            Complete Payment
                          </Link>
                        )}
                      </div>

                      {/* Event Summary - Always visible */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-3 mt-2 border-t border-[#5F4A37]/10">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                          <span className="text-xs">
                            {registration.event.date_time}
                          </span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                        <span className="text-xs">
                          {registration.event.time}
                        </span>
                      </div> */}
                        {/* <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                        <span className="text-xs">
                          {registration.event.location}
                        </span>
                      </div> */}
                      </div>

                      {/* QR Code Section - Only for paid registrations */}
                      {getPaymentStatus(registration.paymentId) === "PAID" && (
                        <div className="mt-3 pt-2 border-t border-[#5F4A37]/10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 mb-2">
                              <Ticket className="h-4 w-4 text-[#5F4A37]/70" />
                              <h4 className="text-sm font-medium">
                                Event Ticket
                              </h4>
                            </div>

                            {/* <div className="flex gap-2">
                              <button className="flex items-center gap-1 px-2 py-1 bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 text-[#5F4A37] rounded text-xs">
                                <Download className="h-3 w-3" />
                                <span>Download</span>
                              </button>
                              <button className="flex items-center gap-1 px-2 py-1 bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 text-[#5F4A37] rounded text-xs">
                                <Printer className="h-3 w-3" />
                                <span>Print</span>
                              </button>
                            </div> */}
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded-lg border border-[#5F4A37]/10 shadow-sm">
                              <div className="w-16 h-16 bg-[#5F4A37]/10 flex items-center justify-center text-center">
                                <Image
                                  src={registration.qr}
                                  alt="QR-Code"
                                  height={100}
                                  width={100}
                                />
                              </div>
                            </div>

                            <div className="flex-1">
                              <p className="text-xs">
                                Present this QR code at the venue for entry
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Concise participant info and link to details */}
                      <div className="mt-3 pt-3 border-t border-[#5F4A37]/10 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
                        {/* <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-[#5F4A37]/70" />
                          <span className="text-xs">
                            {registration.participants.length === 1
                              ? "1 participant"
                              : `${registration.participants.length} participants`}
                          </span>
                        </div> */}

                        {registration.paymentId && (
                          <Link
                            href={`/profile/details/${registration.id}`}
                            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-[#5F4A37] hover:bg-[#5F4A37]/90 text-[#fff4d4] rounded-lg text-xs font-medium w-full sm:w-auto"
                          >
                            View Complete Details
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
