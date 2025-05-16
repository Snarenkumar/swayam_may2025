import EventsSlider from "@/components/events/EventsSlider";
import ClubEvents from "@/components/events/ClubEvents";
import { Angkor } from "next/font/google";

export default function EventsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <EventsSlider />
      <ClubEvents />
    </main>
  );
}
