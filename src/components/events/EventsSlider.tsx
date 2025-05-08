"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/events";

export default function EventSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events: Event[] = [
    {
      id: "1",
      title: "Mega Event",
      description:
        "A grand spectacle combining drama, music, and dance into a thematic performance. Bring the spirit of VIRAASATH alive through your artistry.",
      type: "mega",
      rules: [
        "Teams of 8–17 members.",
        "Performance duration: 7 minutes.",
        "Props and costumes encouraged; hazardous materials prohibited.",
      ],
      registerInfo: {
        fee: "1500",
        prizes: ["1st: ₹50,000", "2nd: ₹25,000"],
        date: "[To be Updated]",
        contact: "[To be Updated]",
      },
      freeEntry: true,
      venue: "MVJCE BasketBall Court",
      time: "to be updated",
      eventDate: "to be updated",
    },
    {
      id: "2",
      title: "DJ NIGHT",
      description:
        "Free entry for all registered participants and MVJCE students",
      type: "dj-night",
      venue: "MVJCE BasketBall Court",
      time: "4 PM",
      eventDate: "26th May 2025",
      qrCode: "/assets/clubs/qr-code.png",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden ">
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/70 p-2 text-2xl "
      >
        &#10094;
      </button>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event) => (
          <div key={event.id} className="flex-shrink-0 px-2">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/70 p-2 text-2xl "
      >
        &#10095;
      </button>
    </div>
  );
}
