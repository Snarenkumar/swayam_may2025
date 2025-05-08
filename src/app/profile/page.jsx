"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, User, Loader2 } from "lucide-react";
// import NavBar from "@/components/NavBar";

// Dummy data for demonstration purposes - to be used only when the demo button is clicked
const dummyUserData = {
  name: "John Doe",
  email: "johndoe@example.com",
  image: "/assets/default-avatar.png"
};

const dummyEvents = [
  {
    id: "1",
    title: "Tech Symposium 2024",
    date: "June 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Main Auditorium",
    clubName: "IEEE Student Branch",
    participants: [
      { name: "John Doe", usn: "1MV21CS001", college: "MVJCE" }
    ],
    image: "/assets/events/tech-symposium.png"
  },
  {
    id: "2",
    title: "Hackathon 2024",
    date: "July 10, 2024",
    time: "9:00 AM - 9:00 PM",
    location: "CS Department",
    clubName: "Coding Club",
    participants: [
      { name: "John Doe", usn: "1MV21CS001", college: "MVJCE" },
      { name: "Jane Smith", usn: "1MV21CS002", college: "MVJCE" }
    ],
    image: "/assets/events/hackathon.png"
  },
  {
    id: "3",
    title: "Cultural Fest",
    date: "August 5, 2024",
    time: "5:00 PM - 9:00 PM",
    location: "Open Air Theatre",
    clubName: "Cultural Committee",
    participants: [
      { name: "John Doe", usn: "1MV21CS001", college: "MVJCE" }
    ],
    image: "/assets/events/cultural-fest.png"
  }
];

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and registered events from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Backend API calls would go here
        // const userData = await fetch('/api/user/profile');
        // const eventsData = await fetch('/api/user/events');
        
        // setUser(await userData.json());
        // setRegisteredEvents(await eventsData.json());
        
        // For now, we'll just set loading to false without data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Function to load dummy data for UI demonstration
  const loadDummyData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(dummyUserData);
      setRegisteredEvents(dummyEvents);
      setIsLoading(false);
    }, 800); // Simulate a short loading time
  };

  return (
    <div className="min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth">
      {/* <NavBar /> */}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* User Profile Section */}
        {user && (
          <div className="mb-8">
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#5F4A37]">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#5F4A37] flex items-center justify-center text-[#fff4d4] text-4xl font-bold">
                      {user.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-lg text-[#5F4A37]/80">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registered Events Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Registered Events</h2>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 text-[#5F4A37] animate-spin mb-4" />
              <p className="text-xl">Loading your events...</p>
            </div>
          ) : registeredEvents.length === 0 ? (
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-8 text-center">
              <div className="max-w-md mx-auto py-8">
                <Image 
                  src="/assets/mvjLogo.png" 
                  alt="No events" 
                  width={150} 
                  height={150}
                  className="mx-auto opacity-40 mb-6"
                />
                <h3 className="text-2xl font-bold mb-3">No Events Registered</h3>
                <p className="text-xl mb-6">You haven't registered for any events yet. Browse our exciting events and join the fun!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/events" className="inline-block px-6 py-2 bg-[#5F4A37] text-[#fff4d4] rounded-full font-bold hover:bg-[#5F4A37]/90 transition-colors">
                    Browse Events
                  </Link>
                  <button 
                    onClick={loadDummyData}
                    className="inline-block px-6 py-2 bg-[#5F4A37]/80 text-[#fff4d4] rounded-full font-bold hover:bg-[#5F4A37]/70 transition-colors"
                  >
                    Show Demo Data
                  </button>
                </div>
                {/* <p className="text-sm mt-4 text-[#5F4A37]/60 italic">
                  * The Demo Data button is for UI demonstration purposes only
                </p> */}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 relative">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#5F4A37]/20 flex items-center justify-center">
                        <span className="text-[#5F4A37] text-xl font-bold">{event.title}</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-[#5F4A37] text-[#fff4d4] px-3 py-1 rounded-full text-sm font-bold">
                      {event.clubName}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#5F4A37]/70" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#5F4A37]/70" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#5F4A37]/70" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-bold mb-2">Participants ({event.participants.length}):</p>
                      <div className="space-y-1">
                        {event.participants.map((participant, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 bg-[#5F4A37]/10 px-3 py-2 rounded-lg"
                          >
                            <User className="h-4 w-4 text-[#5F4A37]/70" />
                            <span>{participant.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="mt-6 inline-block w-full text-center px-4 py-2 bg-[#5F4A37] text-[#fff4d4] rounded-full font-bold hover:bg-[#5F4A37]/90 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
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