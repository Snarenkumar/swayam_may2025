"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Loader2, 
  ChevronDown, 
  ChevronUp, 
  Ticket, 
  CreditCard, 
  Check, 
  AlertCircle,
  X
} from "lucide-react";
// import NavBar from "@/components/NavBar";

// Dummy data for demonstration purposes - to be used only when the demo button is clicked
const dummyUserData = {
  id: "user123",
  name: "John Doe",
  email: "johndoe@example.com",
  image: "/assets/default-avatar.png",
  role: "USER"
};

// Update dummy data to match the schema structure
const dummyRegistrations = [
  {
    id: "reg1",
    eventId: "event1",
    userId: "user123",
    phone: "9876543210",
    usn: "1MV21CS001",
    collegeName: "MVJCE",
    participants: [
      { id: "p1", name: "John Doe", usn: "1MV21CS001", college: "MVJCE", registrationId: "reg1" }
    ],
    paymentAmount: 250,
    paymentId: "pay_123456789",
    createdAt: "2024-05-15T10:30:00Z",
    updatedAt: "2024-05-15T10:35:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event1",
      title: "Tech Symposium 2024",
      clubName: "IEEE Student Branch",
      minTeamMembers: 1,
      maxTeamMembers: 3,
      // Additional event details not in schema but needed for UI
      date: "June 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description: "Join us for a day of tech talks, workshops, and networking opportunities with industry professionals.",
      image: "/assets/events/tech-symposium.png"
    }
  },
  {
    id: "reg2",
    eventId: "event2",
    userId: "user123",
    phone: "9876543210",
    usn: "1MV21CS001",
    collegeName: "MVJCE",
    participants: [
      { id: "p2", name: "John Doe", usn: "1MV21CS001", college: "MVJCE", registrationId: "reg2" },
      { id: "p3", name: "Jane Smith", usn: "1MV21CS002", college: "MVJCE", registrationId: "reg2" }
    ],
    paymentAmount: 500,
    paymentId: null,
    createdAt: "2024-05-20T14:20:00Z",
    updatedAt: "2024-05-20T14:25:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event2",
      title: "Hackathon 2024",
      clubName: "Coding Club",
      minTeamMembers: 2,
      maxTeamMembers: 4,
      // Additional event details not in schema but needed for UI
      date: "July 10, 2024",
      time: "9:00 AM - 9:00 PM",
      location: "CS Department",
      description: "A 12-hour coding competition to solve real-world problems using innovative tech solutions.",
      image: "/assets/events/hackathon.png"
    }
  },
  {
    id: "reg3",
    eventId: "event3",
    userId: "user123",
    phone: "9876543210",
    usn: "1MV21CS001",
    collegeName: "MVJCE",
    participants: [
      { id: "p4", name: "John Doe", usn: "1MV21CS001", college: "MVJCE", registrationId: "reg3" }
    ],
    paymentAmount: 150,
    paymentId: "pay_failed123",
    createdAt: "2024-05-25T18:10:00Z",
    updatedAt: "2024-05-25T18:15:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event3",
      title: "Cultural Fest",
      clubName: "Cultural Committee",
      minTeamMembers: 1,
      maxTeamMembers: 1,
      // Additional event details not in schema but needed for UI
      date: "August 5, 2024",
      time: "5:00 PM - 9:00 PM",
      location: "Open Air Theatre",
      description: "An evening of music, dance, and performances celebrating diverse cultures.",
      image: "/assets/events/cultural-fest.png"
    }
  }
];

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEvents, setExpandedEvents] = useState({});

  // Fetch user data and registrations from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Backend API calls would go here
        // const userData = await fetch('/api/user/profile');
        // const registrationsData = await fetch('/api/user/registrations');
        
        // setUser(await userData.json());
        // setRegistrations(await registrationsData.json());
        
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
      setRegistrations(dummyRegistrations);
      setIsLoading(false);
    }, 800); // Simulate a short loading time
  };

  // Toggle expanded state for an event
  const toggleEventDetails = (registrationId) => {
    setExpandedEvents(prev => ({
      ...prev,
      [registrationId]: !prev[registrationId]
    }));
  };

  // Helper function to determine payment status
  const getPaymentStatus = (registration) => {
    if (!registration.paymentAmount) return "FREE";
    if (registration.paymentId && registration.paymentId.includes("failed")) return "FAILED";
    if (registration.paymentId) return "PAID";
    return "PENDING";
  };

  // Get payment status badge based on status
  const getPaymentStatusBadge = (registration) => {
    const status = getPaymentStatus(registration);
    
    switch(status) {
      case "PAID":
        return (
          <div className="flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            <Check className="h-3.5 w-3.5 mr-1" />
            Payment Status: Paid
          </div>
        );
      case "PENDING":
        return (
          <div className="flex items-center px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Payment Status: Pending
          </div>
        );
      case "FAILED":
        return (
          <div className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <X className="h-3.5 w-3.5 mr-1" />
            Payment Status: Failed
          </div>
        );
      case "FREE":
        return (
          <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Check className="h-3.5 w-3.5 mr-1" />
            Payment Status: Free
          </div>
        );
      default:
        return (
          <div className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            Payment Status: Unknown
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth">
      {/* <NavBar /> */}
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="md:col-span-1">
            {user ? (
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6 sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#5F4A37] mb-4">
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
                  <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                  <p className="text-[#5F4A37]/80 mb-4">{user.email}</p>
                  
                  <div className="w-full pt-4 border-t border-[#5F4A37]/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Your Registrations</span>
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
            ) : !isLoading ? (
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6 text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 rounded-full bg-[#5F4A37]/20 mx-auto flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-[#5F4A37]/50" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Welcome!</h2>
                  <p className="text-[#5F4A37]/80 mb-4">Log in to view your profile and registered events</p>
                </div>
                <button 
                  onClick={loadDummyData}
                  className="w-full py-2.5 px-4 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors"
                >
                  View Demo Profile
                </button>
              </div>
            ) : (
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-[#5F4A37] animate-spin mb-4" />
                  <p>Loading profile...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Registered Events Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Your Registered Events</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl">
                <Loader2 className="h-12 w-12 text-[#5F4A37] animate-spin mb-4" />
                <p className="text-xl">Loading your events...</p>
              </div>
            ) : user && registrations.length === 0 ? (
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-8 text-center">
                <div className="max-w-md mx-auto py-8">
                  <Image 
                    src="/assets/mvjLogo.png" 
                    alt="No events" 
                    width={120} 
                    height={120}
                    className="mx-auto opacity-40 mb-6"
                  />
                  <h3 className="text-xl font-bold mb-3">No Events Registered</h3>
                  <p className="mb-6">You haven't registered for any events yet. Browse our exciting events and join the fun!</p>
                  <Link href="/events" className="inline-block px-6 py-2.5 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors">
                    Browse Events
                  </Link>
                </div>
              </div>
            ) : !user ? (
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-8 text-center">
                <div className="max-w-md mx-auto py-8">
                  <h3 className="text-xl font-bold mb-3">Log in to View Your Events</h3>
                  <p className="mb-6">Sign in to see your registered events and manage your participation.</p>
                  <button 
                    onClick={loadDummyData}
                    className="inline-block px-6 py-2.5 bg-[#5F4A37]/80 text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/70 transition-colors"
                  >
                    View Demo Data
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div 
                    key={registration.id} 
                    className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Event Card - Similar to the image provided */}
                    <div className="p-4">
                      <div className="flex flex-row items-center justify-between mb-3">
                        <div className="flex flex-row items-center gap-3">
                          <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0 bg-[#5F4A37]/10">
                            {registration.event.image ? (
                              <Image
                                src={registration.event.image}
                                alt={registration.event.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[#5F4A37] text-xl font-bold">{registration.event.title.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-xs text-[#5F4A37]/70 mb-0.5">Event Name:</div>
                            <h3 className="text-xl font-bold">{registration.event.title}</h3>
                            <div className="text-xs text-[#5F4A37]/70 mt-1 mb-0.5">Club:</div>
                            <p className="text-sm text-[#5F4A37]/80">{registration.event.clubName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getPaymentStatusBadge(registration)}
                          <button
                            onClick={() => toggleEventDetails(registration.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 transition-colors text-[#5F4A37]"
                            aria-expanded={expandedEvents[registration.id]}
                          >
                            {expandedEvents[registration.id] ? (
                              <>
                                <span className="text-sm font-medium">Hide Details</span>
                                <ChevronUp className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span className="text-sm font-medium">View Details</span>
                                <ChevronDown className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {/* Event Summary - Always visible */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#5F4A37]/70" />
                          <div>
                            <div className="text-xs text-[#5F4A37]/70 mb-0.5">Date:</div>
                            <span className="text-sm">{registration.event.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#5F4A37]/70" />
                          <div>
                            <div className="text-xs text-[#5F4A37]/70 mb-0.5">Time:</div>
                            <span className="text-sm">{registration.event.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#5F4A37]/70" />
                          <div>
                            <div className="text-xs text-[#5F4A37]/70 mb-0.5">Location:</div>
                            <span className="text-sm">{registration.event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded Event Details - Only visible when expanded */}
                    {expandedEvents[registration.id] && (
                      <div className="p-4 border-t border-[#5F4A37]/10 bg-[#5F4A37]/5">
                        {/* Payment Details - Compact */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="h-4 w-4 text-[#5F4A37]/70" />
                            <h4 className="text-sm font-bold">Payment Details</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-[#5F4A37]/70">Amount:</span>{" "}
                              <span className="font-medium">₹{registration.paymentAmount || 'Free'}</span>
                            </div>
                            <div>
                              <span className="text-[#5F4A37]/70">Status:</span>{" "}
                              <span className="font-medium">{getPaymentStatus(registration)}</span>
                            </div>
                            <div>
                              <span className="text-[#5F4A37]/70">ID:</span>{" "}
                              <span className="font-medium truncate">{registration.paymentId || "N/A"}</span>
                            </div>
                          </div>
                          {(getPaymentStatus(registration) === "PENDING" || getPaymentStatus(registration) === "FAILED") && (
                            <div className="mt-3">
                              <button className="px-4 py-1.5 bg-[#5F4A37] text-[#fff4d4] rounded-lg text-sm font-medium hover:bg-[#5F4A37]/90 transition-colors">
                                {getPaymentStatus(registration) === "PENDING" ? "Complete Payment" : "Retry Payment"}
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-sm leading-relaxed">{registration.event.description}</p>
                        </div>
                        
                        {/* Participants */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-[#5F4A37]/70" />
                            <h4 className="text-sm font-bold">Participants ({registration.participants.length})</h4>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {registration.participants.map((participant) => (
                              <div 
                                key={participant.id}
                                className="flex items-center gap-2 bg-[#5F4A37]/10 px-3 py-2 rounded-lg"
                              >
                                <div className="w-6 h-6 rounded-full bg-[#5F4A37] flex items-center justify-center text-[#fff4d4] text-xs font-bold">
                                  {participant.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{participant.name}</p>
                                  <p className="text-xs text-[#5F4A37]/70">{participant.usn} • {participant.college}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Check-in Status */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-[#5F4A37]/70" />
                            <h4 className="text-sm font-bold">Check-in Status</h4>
                          </div>
                          <div className="mt-2 text-sm">
                            {registration.isCheckedIn ? (
                              <div className="flex items-center text-emerald-700">
                                <Check className="h-4 w-4 mr-1" />
                                <span>Checked in at {new Date(registration.checkedInAt).toLocaleString()}</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-700">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span>Not checked in yet</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Ticket QR Code - Only show for paid registrations */}
                        {getPaymentStatus(registration) === "PAID" && (
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-[#fff4d4] rounded-lg">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Ticket className="h-4 w-4 text-[#5F4A37]/70" />
                                <h4 className="text-sm font-bold">Event Ticket</h4>
                              </div>
                              <p className="text-xs text-[#5F4A37]/80">Scan this QR code at the venue for entry</p>
                            </div>
                            <div className="p-2 bg-[#fff4d4] border border-[#5F4A37]/20 rounded-lg shadow-sm">
                              {registration.ticketQR ? (
                                <Image
                                  src={registration.ticketQR}
                                  alt="Ticket QR Code"
                                  width={80}
                                  height={80}
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-20 h-20 bg-[#5F4A37]/10 flex items-center justify-center text-center p-2">
                                  <span className="text-xs text-[#5F4A37]/70">QR code will be available soon</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 