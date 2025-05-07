import Link from 'next/link';
import ClubCard from './ClubCard';
import { Club } from '@/types/events';

function slugify(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export default function ClubEvents() {
  const clubs: Club[] = [
    {
      id: '1',
      name: 'Dhwani',
      description: 'A Music Club',
      image: '/assets/clubs/dhwani.png',
    },
    {
      id: '2',
      name: 'Nrityatrix',
      description: 'A Dance Club',
      image: '/assets/clubs/nrityatrix.png',
    },
    {
      id: '3',
      name: 'Raagabhinaya',
      description: 'Theatre & Production Club',
      image: '/assets/clubs/raagabhinaya.png',
    },
    {
      id: '4',
      name: 'Aakriti',
      description: 'Art Club',
      image: '/assets/clubs/aakriti.png',
    },
    {
      id: '5',
      name: 'Toastmasters',
      description: 'Public Speaking Club',
      image: '/assets/clubs/toastmasters.png',
    },
    {
      id: '6',
      name: 'Saahitya',
      description: 'Literature Club',
      image: '/assets/clubs/saahitya.png',
    },
  ];

  return (
    <section className="bg-[transparent] py-12 px-4 text-center">
      <h2 className="mb-10 text-4xl font-bold text-[#3d2e14]">Events</h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <Link key={club.id} href={`/events/${slugify(club.name)}`}>
            <ClubCard club={club} />
          </Link>
        ))}
      </div>
    </section>
  );
}
