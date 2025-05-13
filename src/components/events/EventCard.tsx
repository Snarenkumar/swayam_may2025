import { Event } from "@/types/events";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: { event: Event }) {
  return (
    <div
      className={`relative w-full max-w-4xl overflow-hidden rounded-3xl bg-cover bg-center shadow-xl`}
      style={{ backgroundImage: `url(/assets/clubs/${event.type}-bg.png)` }}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 h-full p-8 text-white">
        {event.type === "mega" ? (
          <>
            <div className="flex justify-center">
              <h2 className="inline-block rounded-2xl bg-white px-8 py-2 text-2xl font-bold text-[#6e4a12] shadow-md">
                {event.title}
              </h2>
            </div>

            <p className="my-6 text-xl">{event.description}</p>

            <div className="flex w-4/5 mx-auto items-start justify-start">
              <div className="max-w-sm">
                <button className="rounded-full border-2 border-black bg-white px-6 py-2 font-bold text-[#6e4a12] shadow-md">
                  RULES:
                </button>
                <ul className="space-y-2 mt-3">
                  {event.rules?.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">●</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="max-w-sm">
                <Link
                  href={
                    "/clw3q9v6e001108l0h6qy7q1z/register?clubName=Nrityatrix"
                  }
                  className="rounded-full border-2 border-[#6e4a12] hover:bg-foreground hover:text-white hover:cursor-pointer bg-white px-6 py-2 font-bold text-[#6e4a12] shadow-md"
                >
                  Register Now ➤
                </Link>
                <ul className="mt-6">
                  <li>Registration fee: ₹{event.registerInfo?.fee}</li>
                  <li>Prize: {event.registerInfo?.prizes.join(", ")}</li>
                  <li>Date & Time: {event.registerInfo?.date}</li>
                  <li>Coordinator Contact: {event.registerInfo?.contact}</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-center text-6xl font-bold">{event.title}</h2>
            <p className="my-6 text-center text-xl">{event.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="space-y-4">
                <p>Venue : {event.venue}</p>
                <p>Starts At : {event.time}</p>
                <p>Date : {event.eventDate}</p>
              </div>

              <div className="text-center">
                <p className="mb-4">Get your ticket – Scan now!</p>
                {event.qrCode && (
                  <Image
                    src={event.qrCode}
                    alt="QR Code"
                    width={100}
                    height={100}
                    className="mx-auto"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
