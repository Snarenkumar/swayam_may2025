import { Club } from '../../types/events';
import Image from 'next/image';

// Map club names to their corresponding image filenames
const clubImageMap: Record<string, string> = {
  'Dhwani': '/assets/clubs/dhwani.png',
  'Nrityatrix': '/assets/clubs/nrityatrix.png',
  'Raagabhinaya': '/assets/clubs/raagabhinaya.png',
  'Aakriti': '/assets/clubs/aakriti.png',
  'Toastmasters': '/assets/clubs/toastmasters.png',
  'Saahitya': '/assets/clubs/saahitya.png',
  // Add other clubs as needed
};

export default function ClubCard({ club }: { club: Club }) {
  // Get the correct image path based on club name
  const imagePath = clubImageMap[club.name] || '/assets/clubs/default.png';

  return (
    <div className="w-full max-w-xs transform rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={imagePath}
          alt={club.name}
          fill
          className="rounded-full border-4 border-gray-300 object-cover"
          // Preload important images
          priority={club.name === 'Dhwani'} // Example: prioritize first club
        />
      </div>
      <p className="mt-4 rounded-xl bg-[#7d622a] px-3 py-2 font-bold text-white">
        {club.name} – {club.description}
      </p>
    </div>
   
  );
}