"use client";

// import { useState } from "react";
import EventCard from "./EventCard";
import { Event } from "@/types/events";

// const events: Event[] = [
//   {
//     id: "1",
//     title: "Mega Event",
//     description:
//       "A grand spectacle combining drama, music, and dance into a thematic performance. Bring the spirit of VIRAASATH alive through your artistry.",
//     type: "mega",
//     rules: [
//       "Teams of 8–17 members.",
//       "Performance duration: 7 minutes.",
//       "Props and costumes encouraged; hazardous materials prohibited.",
//     ],
//     registerInfo: {
//       fee: "1500",
//       prizes: ["1st: ₹50,000", "2nd: ₹25,000"],
//       date: "[To be Updated]",
//       contact: "[To be Updated]",
//     },
//     freeEntry: true,
//     venue: "MVJCE BasketBall Court",
//     time: "to be updated",
//     eventDate: "to be updated",
//   },
//   // {
//   //   id: "2",
//   //   title: "DJ NIGHT",
//   //   description:
//   //     "Free entry for all registered participants and MVJCE students",
//   //   type: "dj-night",
//   //   venue: "MVJCE BasketBall Court",
//   //   time: "4 PM",
//   //   eventDate: "26th May 2025",
//   //   qrCode: "/assets/clubs/qr-code.png",
//   // },
// ];
const event: Event = {
  id: "1",
  title: "SwarNatyam-Mega Event",
  description:
    "A grand spectacle combining drama, music, and dance into a thematic performance. Bring the spirit of VIRASAT alive through your artistry.",
  type: "mega",
  rules: [
    "Teams of 8–17 members.",
    "Performance duration: 7 minutes.",
    "Props and costumes encouraged; hazardous materials prohibited.",
  ],
  registerInfo: {
    fee: "1500",
    prizes: ["1st: ₹25,000", "2nd: ₹15,000"],
    date: "[To be Updated]",
    contact: [
      "R V Lehanya: 9972977347",
      "Rahul B S: 7338547046",
      "Vidhi Jain: 8618415234",
      "Drishti Luthra: 9103947046",
      "Amog Anand Keur: 8431085574",
    ],
  },
  venue: "MVJCE BasketBall Court",
  time: "to be updated",
  eventDate: "to be updated",
};

export default function EventSlider() {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === events.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? events.length - 1 : prevIndex - 1
  //   );
  // };

  return (
    <div className="relative overflow-hidden px-2 sm:px-4 md:px-6 lg:px-10 py-6">
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/70 p-2 text-2xl "
      >
        &#10094;
      </button> */}

      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <EventCard event={event} />
        </div>
      </div>

      {/* <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-lg bg-white/70 p-2 text-2xl "
      >
        &#10095;
      </button> */}
    </div>
  );
}
