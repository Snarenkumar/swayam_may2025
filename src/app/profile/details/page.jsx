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
  ChevronRight,
  Check, 
  AlertCircle, 
  X,
  Home,
  CreditCard,
  Users,
  Info
} from "lucide-react";

// Re-using the same dummy data and helpers from the profile page
// In a real app, these would be in a shared utility file
const dummyUserData = {
  id: "user123",
  name: "John Doe",
  email: "johndoe@example.com",
  image: "/assets/default-avatar.png",
  role: "USER",
  phone: "9876543210",
  usn: "1MV21CS001", 
  collegeName: "MVJCE"
};

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
      date: "August 5, 2024",
      time: "5:00 PM - 9:00 PM",
      location: "Open Air Theatre",
      description: "An evening of music, dance, and performances celebrating diverse cultures.",
      image: "/assets/events/cultural-fest.png"
    }
  }
];

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

const ProfileDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
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
        
        // For demo purposes, we'll load the dummy data automatically
        setTimeout(() => {
          setUser(dummyUserData);
          setRegistrations(dummyRegistrations);
          
          // Sort events into upcoming and past
          const now = new Date();
          const upcoming = [];
          const past = [];
          
          dummyRegistrations.forEach(reg => {
            const eventDate = new Date(reg.event.date);
            if (eventDate > now) {
              upcoming.push(reg);
            } else {
              past.push(reg);
            }
          });
          
          setUpcomingEvents(upcoming);
          setPastEvents(past);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Toggle expanded state for an event
  const toggleEventDetails = (registrationId) => {
    setExpandedEvents(prev => ({
      ...prev,
      [registrationId]: !prev[registrationId]
    }));
  };

  // Get active events based on selected tab
  const activeEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-[#5F4A37] hover:text-[#5F4A37]/80">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-[#5F4A37]/60" />
                <Link href="/profile" className="ml-1 text-sm font-medium text-[#5F4A37] hover:text-[#5F4A37]/80 md:ml-2">
                  Profile
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-[#5F4A37]/60" />
                <span className="ml-1 text-sm font-medium text-[#5F4A37] md:ml-2">All Registrations</span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center md:text-left">Your Profile Details</h1>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl">
            <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 text-[#5F4A37] animate-spin mb-4" />
            <p className="text-lg sm:text-xl">Loading your profile details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-5 sm:p-6">
                <div className="flex flex-col items-center text-center mb-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#5F4A37] mb-4">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#5F4A37] flex items-center justify-center text-[#fff4d4] text-3xl sm:text-4xl font-bold">
                        {user.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">{user.name}</h2>
                  <p className="text-sm text-[#5F4A37]/80">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="border-t border-[#5F4A37]/20 pt-4">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#5F4A37]/70 w-24 flex-shrink-0">Email:</span>
                        <span className="font-medium">{user.email}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#5F4A37]/70 w-24 flex-shrink-0">Phone:</span>
                        <span className="font-medium">{user.phone}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-[#5F4A37]/20 pt-4">
                    <h3 className="text-lg font-semibold mb-3">College Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#5F4A37]/70 w-24 flex-shrink-0">USN:</span>
                        <span className="font-medium">{user.usn}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#5F4A37]/70 w-24 flex-shrink-0">College:</span>
                        <span className="font-medium">{user.collegeName}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-[#5F4A37]/20 pt-4">
                    <h3 className="text-lg font-semibold mb-3">Registration Stats</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#5F4A37]/10 rounded-lg p-3 text-center">
                        <p className="text-sm text-[#5F4A37]/70 mb-1">Upcoming</p>
                        <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                      </div>
                      <div className="bg-[#5F4A37]/10 rounded-lg p-3 text-center">
                        <p className="text-sm text-[#5F4A37]/70 mb-1">Past</p>
                        <p className="text-2xl font-bold">{pastEvents.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Details */}
            <div className="lg:col-span-8">
              {/* Tabs for Upcoming/Past Events */}
              <div className="flex mb-4 border-b border-[#5F4A37]/20">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`px-4 py-2 font-medium text-sm sm:text-base relative ${
                    activeTab === "upcoming"
                      ? "text-[#5F4A37] border-b-2 border-[#5F4A37]"
                      : "text-[#5F4A37]/60 hover:text-[#5F4A37]/80"
                  }`}
                >
                  Upcoming Events
                  {upcomingEvents.length > 0 && (
                    <span className="ml-2 bg-[#5F4A37] text-[#fff4d4] text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {upcomingEvents.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={`px-4 py-2 font-medium text-sm sm:text-base relative ${
                    activeTab === "past"
                      ? "text-[#5F4A37] border-b-2 border-[#5F4A37]"
                      : "text-[#5F4A37]/60 hover:text-[#5F4A37]/80"
                  }`}
                >
                  Past Events
                  {pastEvents.length > 0 && (
                    <span className="ml-2 bg-[#5F4A37]/20 text-[#5F4A37] text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {pastEvents.length}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Display Events Based on Active Tab */}
              {activeEvents.length === 0 ? (
                <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-6 text-center">
                  <p className="text-lg">No {activeTab} events found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeEvents.map((registration) => (
                    <div 
                      key={registration.id} 
                      className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl overflow-hidden"
                    >
                      {/* Event Header */}
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 relative rounded overflow-hidden flex-shrink-0 bg-[#5F4A37]/10">
                              {registration.event.image ? (
                                <Image
                                  src={registration.event.image}
                                  alt={registration.event.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-[#5F4A37] text-lg sm:text-xl font-bold">{registration.event.title.charAt(0)}</span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold truncate">{registration.event.title}</h3>
                              <p className="text-xs sm:text-sm text-[#5F4A37]/80 mb-1">{registration.event.clubName}</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {getPaymentStatusBadge(registration)}
                              </div>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
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
                                  <span className="text-sm font-medium">Show Details</span>
                                  <ChevronDown className="h-4 w-4" />
                                </>
                              )}
                            </button>
                            <Link
                              href={`/profile/details/${registration.id}`}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#5F4A37] hover:bg-[#5F4A37]/90 transition-colors text-[#fff4d4]"
                            >
                              <span className="text-sm font-medium">Full View</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                        
                        {/* Event Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                            <span className="text-sm">{registration.event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                            <span className="text-sm">{registration.event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#5F4A37]/70 flex-shrink-0" />
                            <span className="text-sm">{registration.event.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      {expandedEvents[registration.id] && (
                        <div className="border-t border-[#5F4A37]/10 bg-[#5F4A37]/5 p-4 sm:p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Registration Details */}
                            <div>
                              <h4 className="flex items-center text-sm font-bold mb-3">
                                <CreditCard className="h-4 w-4 mr-2 text-[#5F4A37]/70" />
                                Registration Details
                              </h4>
                              
                              <div className="space-y-4">
                                <div className="bg-[#fff4d4]/80 rounded-lg p-3">
                                  <h5 className="text-xs text-[#5F4A37]/70 mb-1">Registration ID</h5>
                                  <p className="text-sm font-medium">{registration.id}</p>
                                </div>
                                
                                <div className="bg-[#fff4d4]/80 rounded-lg p-3">
                                  <h5 className="text-xs text-[#5F4A37]/70 mb-1">Payment Details</h5>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                      <p className="text-xs text-[#5F4A37]/70">Amount</p>
                                      <p className="font-medium">₹{registration.paymentAmount || 'Free'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-[#5F4A37]/70">Status</p>
                                      <p className="font-medium">{getPaymentStatus(registration)}</p>
                                    </div>
                                    <div className="col-span-2">
                                      <p className="text-xs text-[#5F4A37]/70">Payment ID</p>
                                      <p className="font-medium truncate">{registration.paymentId || "N/A"}</p>
                                    </div>
                                  </div>
                                  
                                  {(getPaymentStatus(registration) === "PENDING" || getPaymentStatus(registration) === "FAILED") && (
                                    <div className="mt-3">
                                      <button className="px-3 py-1.5 bg-[#5F4A37] text-[#fff4d4] rounded-lg text-xs font-medium hover:bg-[#5F4A37]/90 transition-colors">
                                        {getPaymentStatus(registration) === "PENDING" ? "Complete Payment" : "Retry Payment"}
                                      </button>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="bg-[#fff4d4]/80 rounded-lg p-3">
                                  <h5 className="text-xs text-[#5F4A37]/70 mb-1">Registered On</h5>
                                  <p className="text-sm font-medium">
                                    {new Date(registration.createdAt).toLocaleDateString()} at {new Date(registration.createdAt).toLocaleTimeString()}
                                  </p>
                                </div>
                                
                                <div className="bg-[#fff4d4]/80 rounded-lg p-3">
                                  <h5 className="text-xs text-[#5F4A37]/70 mb-1">Check-in Status</h5>
                                  {registration.isCheckedIn ? (
                                    <div className="flex items-center text-emerald-700 text-sm">
                                      <Check className="h-4 w-4 mr-1" />
                                      <span>Checked in at {new Date(registration.checkedInAt).toLocaleString()}</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center text-amber-700 text-sm">
                                      <AlertCircle className="h-4 w-4 mr-1" />
                                      <span>Not checked in yet</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Event and Participants Details */}
                            <div>
                              <div className="mb-5">
                                <h4 className="flex items-center text-sm font-bold mb-3">
                                  <Info className="h-4 w-4 mr-2 text-[#5F4A37]/70" />
                                  Event Details
                                </h4>
                                <div className="bg-[#fff4d4]/80 rounded-lg p-3">
                                  <p className="text-sm mb-2">{registration.event.description}</p>
                                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                                    <div>
                                      <p className="text-xs text-[#5F4A37]/70">Min Team Size</p>
                                      <p className="font-medium">{registration.event.minTeamMembers}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-[#5F4A37]/70">Max Team Size</p>
                                      <p className="font-medium">{registration.event.maxTeamMembers}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="flex items-center text-sm font-bold mb-3">
                                  <Users className="h-4 w-4 mr-2 text-[#5F4A37]/70" />
                                  Participants ({registration.participants.length})
                                </h4>
                                <div className="space-y-2">
                                  {registration.participants.map((participant) => (
                                    <div 
                                      key={participant.id}
                                      className="flex items-center gap-2 bg-[#fff4d4]/80 p-3 rounded-lg"
                                    >
                                      <div className="w-8 h-8 rounded-full bg-[#5F4A37] flex items-center justify-center text-[#fff4d4] text-xs font-bold">
                                        {participant.name.charAt(0)}
                                      </div>
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium truncate">{participant.name}</p>
                                        <p className="text-xs text-[#5F4A37]/70 truncate">{participant.usn} • {participant.college}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailsPage; 