"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Loader2, 
  ArrowLeft,
  ChevronRight,
  Check, 
  AlertCircle, 
  X,
  Home,
  CreditCard,
  Users,
  Info,
  Ticket,
  Download,
  Printer
} from "lucide-react";

// Same dummy data from profile page
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
        <div className="flex items-center px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
          <Check className="h-3 w-3 mr-1" />
          Paid
        </div>
      );
    case "PENDING":
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
          <AlertCircle className="h-3 w-3 mr-1" />
          Pending
        </div>
      );
    case "FAILED":
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
          <X className="h-3 w-3 mr-1" />
          Failed
        </div>
      );
    case "FREE":
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          <Check className="h-3 w-3 mr-1" />
          Free
        </div>
      );
    default:
      return (
        <div className="flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
          Unknown
        </div>
      );
  }
};

const RegistrationDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [registration, setRegistration] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        // const response = await fetch(`/api/registrations/${params.id}`);
        // const data = await response.json();
        // setRegistration(data);
        
        // For demo, find registration with matching ID in our dummy data
        setTimeout(() => {
          const found = dummyRegistrations.find(reg => reg.id === params.id);
          if (found) {
            setRegistration(found);
          } else {
            // Simulating a 404 scenario
            console.error('Registration not found');
          }
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching registration:', error);
        setIsLoading(false);
      }
    };
    
    fetchRegistrationDetails();
  }, [params.id]);
  
  // Function to handle going back (browser history or fallback to profile)
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <div className="min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
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
            {registration && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-[#5F4A37]/60" />
                  <span className="ml-1 text-sm font-medium text-[#5F4A37] md:ml-2 truncate max-w-[150px] sm:max-w-none">
                    {registration.event.title}
                  </span>
                </div>
              </li>
            )}
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-[#5F4A37]/60" />
                <span className="ml-1 text-sm font-medium text-[#5F4A37] md:ml-2">Details</span>
              </div>
            </li>
          </ol>
        </nav>
        
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-[#5F4A37] hover:text-[#5F4A37]/80 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Back to Profile</span>
        </button>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl">
            <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 text-[#5F4A37] animate-spin mb-4" />
            <p className="text-lg sm:text-xl">Loading registration details...</p>
          </div>
        ) : !registration ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl">
            <div className="bg-[#5F4A37]/10 rounded-full p-4 mb-4">
              <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-[#5F4A37]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Registration Not Found</h2>
            <p className="text-base mb-6">The registration you're looking for doesn't exist or may have been deleted.</p>
            <Link 
              href="/profile" 
              className="px-4 py-2 bg-[#5F4A37] text-[#fff4d4] rounded-lg font-medium hover:bg-[#5F4A37]/90 transition-colors"
            >
              Back to Profile
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Event Header with Title and Status */}
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 relative rounded overflow-hidden flex-shrink-0 bg-[#5F4A37]/10">
                    {registration.event.image ? (
                      <Image
                        src={registration.event.image}
                        alt={registration.event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#5F4A37] text-xl sm:text-2xl font-bold">{registration.event.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">{registration.event.title}</h1>
                    <p className="text-sm text-[#5F4A37]/80 mb-1">{registration.event.clubName}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getPaymentStatusBadge(registration)}
                      <div className="flex items-center px-2.5 py-0.5 bg-[#5F4A37]/10 text-[#5F4A37] rounded-full text-xs">
                        <span>Reg: #{registration.id.slice(-5)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Details Card */}
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-4 sm:p-5">
              <h2 className="text-xl font-bold mb-6">Registration Details</h2>
              
              {/* Payment Details */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-[#5F4A37]/70" />
                  <h3 className="text-lg font-medium">Payment Details</h3>
                </div>
                
                <div className="bg-[#5F4A37]/5 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#5F4A37]/70 mb-1">Amount</p>
                      <p className="text-lg font-medium">₹{registration.paymentAmount || 'Free'}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-[#5F4A37]/70 mb-1">Status</p>
                      <div className="flex items-center">
                        {getPaymentStatus(registration) === "PAID" ? (
                          <div className="flex items-center text-emerald-700">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="font-medium">Paid</span>
                          </div>
                        ) : getPaymentStatus(registration) === "PENDING" ? (
                          <div className="flex items-center text-amber-700">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span className="font-medium">Pending</span>
                          </div>
                        ) : getPaymentStatus(registration) === "FAILED" ? (
                          <div className="flex items-center text-red-700">
                            <X className="h-4 w-4 mr-1" />
                            <span className="font-medium">Failed</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-blue-700">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="font-medium">Free</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {registration.paymentId && (
                    <div className="mt-3 pt-3 border-t border-[#5F4A37]/10">
                      <p className="text-xs text-[#5F4A37]/70 mb-1">Payment ID</p>
                      <p className="text-sm font-medium">{registration.paymentId}</p>
                    </div>
                  )}
                  
                  {(getPaymentStatus(registration) === "PENDING" || getPaymentStatus(registration) === "FAILED") && (
                    <div className="mt-4">
                      <button className="px-4 py-2 bg-[#5F4A37] text-[#fff4d4] rounded-lg text-sm font-medium hover:bg-[#5F4A37]/90 transition-colors">
                        {getPaymentStatus(registration) === "PENDING" ? "Complete Payment" : "Retry Payment"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Participants */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-[#5F4A37]/70" />
                  <h3 className="text-lg font-medium">Participants ({registration.participants.length})</h3>
                </div>
                
                <div className="space-y-3">
                  {registration.participants.map((participant, index) => (
                    <div 
                      key={participant.id}
                      className="flex items-start gap-3 bg-[#5F4A37]/5 p-3 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#5F4A37] flex items-center justify-center text-[#fff4d4] text-sm font-bold mt-0.5">
                        {participant.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold truncate">{participant.name}</h4>
                          {index === 0 && (
                            <span className="text-xs bg-[#5F4A37]/10 text-[#5F4A37] px-2 py-0.5 rounded-full flex-shrink-0">
                              Team Lead
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5F4A37]/70 mt-1 truncate">USN: {participant.usn}</p>
                        <p className="text-xs text-[#5F4A37]/70 truncate">College: {participant.college}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Event Ticket */}
              {getPaymentStatus(registration) === "PAID" && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Ticket className="h-5 w-5 text-[#5F4A37]/70" />
                    <h3 className="text-lg font-medium">Event Ticket</h3>
                  </div>
                  
                  <div className="bg-[#5F4A37]/5 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="bg-white p-3 rounded-lg border border-[#5F4A37]/10 shadow-sm">
                        <div className="w-32 h-32 bg-[#5F4A37]/10 flex items-center justify-center">
                          <span className="text-sm text-[#5F4A37]/70 p-2">
                            QR code for entry
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-sm mb-3">
                          Present this QR code at the venue entrance for check-in
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 text-[#5F4A37] rounded text-xs">
                            <Download className="h-3 w-3" />
                            <span>Save Ticket</span>
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 text-[#5F4A37] rounded text-xs">
                            <Printer className="h-3 w-3" />
                            <span>Print Ticket</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#5F4A37]/5 rounded-lg p-3">
                  <p className="text-xs text-[#5F4A37]/70 mb-1">Phone Number</p>
                  <p className="text-sm font-medium">{registration.phone}</p>
                </div>
                
                <div className="bg-[#5F4A37]/5 rounded-lg p-3">
                  <p className="text-xs text-[#5F4A37]/70 mb-1">College</p>
                  <p className="text-sm font-medium truncate">{registration.collegeName}</p>
                </div>
              </div>
            </div>
            
            {/* Event Info Card */}
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl overflow-hidden">
              {/* Event Image */}
              <div className="relative h-40 sm:h-48 w-full">
                {registration.event.image ? (
                  <Image
                    src={registration.event.image}
                    alt={registration.event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#5F4A37]/20 flex items-center justify-center">
                    <span className="text-[#5F4A37] text-4xl font-bold">{registration.event.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              {/* Event Info */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-bold mb-3">Event Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#5F4A37]/70 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#5F4A37]/70 mb-0.5">Date</p>
                      <p className="text-sm font-medium">{registration.event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#5F4A37]/70 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#5F4A37]/70 mb-0.5">Time</p>
                      <p className="text-sm font-medium">{registration.event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#5F4A37]/70 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#5F4A37]/70 mb-0.5">Location</p>
                      <p className="text-sm font-medium">{registration.event.location}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-[#5F4A37]/10">
                    <p className="text-xs text-[#5F4A37]/70 mb-2">Description</p>
                    <p className="text-sm">{registration.event.description}</p>
                  </div>
                  
                  <div className="pt-3 border-t border-[#5F4A37]/10">
                    <p className="text-xs text-[#5F4A37]/70 mb-2">Team Size</p>
                    <p className="text-sm">
                      {registration.event.minTeamMembers === registration.event.maxTeamMembers
                        ? `${registration.event.minTeamMembers} participants`
                        : `${registration.event.minTeamMembers} - ${registration.event.maxTeamMembers} participants`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Support */}
            <div className="bg-[#fff4d4]/80 backdrop-blur-sm border border-[#5F4A37]/30 shadow-lg rounded-xl p-4 sm:p-5">
              <div className="text-center">
                <p className="text-sm text-[#5F4A37]/70 mb-3">
                  Need help with your registration? Have questions about the event?
                </p>
                <Link
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-[#5F4A37]/10 hover:bg-[#5F4A37]/20 text-[#5F4A37] rounded-lg font-medium text-sm transition-colors"
                >
                  Contact Support
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationDetailsPage; 