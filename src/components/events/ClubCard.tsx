import { Club } from "../../types/events";
import Image from "next/image";

export default function ClubCard({ club }: { club: Club }) {
  return (
    <div className="w-full max-w-xs transform rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={club.image}
          alt={club.name}
          fill
          className={`rounded-full border-4 border-gray-300 object-contain ${
            club.name == "Nrityatrix" ? "bg-background" : ""
          }`}
          loading="eager"
        />
      </div>
      <p className="mt-4 rounded-xl bg-[#7d622a] px-3 py-2 font-bold text-white">
        {club.name} – {club.description}
      </p>
    </div>
  );
}
