import Image from "next/image";
import '../font.css'; 
import {getClubEvents} from '@/lib/eventsData'; 


export default function DhwaniPage() {
  const event = getClubEvents("Dhwani")
  return (
    <div className="bg-[#F9F4D7] text-[#5F4A37] font-serif min-h-screen pb-10">
      


      {/* Title */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-6 text-center">
          <Image
            src="/assets/clubevents/dhwani/dhwani_logo.svg"
            alt="Dhwani"
            width={80}
            height={80}
            className="w-20 h-20 md:w-30 md:h-30"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide jaini-font">
            DHWANI
          </h1>
        </div>


      {/* Events */}
      <div className="flex flex-col gap-15 items-center px-4 md:px-16 ">
        {event.map((event) => (
       <div key={event.no} className="bg-[#E1DABD] custom-shadow rounded-3xl p-6 max-w-4xl w-full relative">
          <div className="absolute -top-12 left-2 z-10">
          <div className="pentagon text-black font-bold flex items-center justify-center text-lg">
            {event.no}
          </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 jaini-font">
  {event.name}
</h2>

            <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={event.image}
              alt={event.name}
              width={400}
              height={500}
             className="rounded-md md:ml-6 -mt-10 md:-mt-20"
            />
              <div className="ml-3 text-black font-bold">
                <p className="mb-2"  >
                  <strong  >Description :</strong> {event.description}
                </p>
                <p><strong>Rules :</strong></p>
                <ol className="list-disc pl-6 mb-2 text-[#000000]">
                  {event.rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ol>
                <p className="mb-1"><strong>Date&Time :</strong> {event.date_time} &nbsp; </p>
                <p className="mb-1"><strong>Registration Fee :</strong> {event.registration_fee}</p>
                <p className="mb-2">1st: {event.prizes.first} &nbsp; 2nd: {event.prizes.second}</p>
                <button className="bg-[#5d4037] text-white px-7 py-2 rounded-xl italic hover:bg-[#4e342e]">
                  Register now
                </button>
                <div className="mt-2 text-lg ml-0 md:ml-12 normal-font">
                  <strong>Event Coordinators :</strong><br />
                  {event.coordinators.map((coordinator, index) => (
                      <p key={index}>{coordinator.name}: {coordinator.phone}</p>
                   ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Contact Us Footer */}
<footer className="bg-[#5F4A37] text-[#F9F4D7] py-8 mt-20 text-center rounded-t-3xl">
  <h2 className="text-3xl sm:text-4xl font-bold jaini-font mb-4">CONTACT US</h2>
  <p className="text-2xl mb-2">Club Coordinators :-</p>
  <div className="text-base space-y-2 font-semibold">


      <p>Rudransh:-6302573651</p> 
       <p>Yuvraj:-8971728640</p> 
       <p>Manaswini:-8431546867</p> 
  </div>
</footer>
    </div>
  );
}
