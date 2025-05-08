"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search,
  Filter,
  MessageSquare,
  Download,
  Check,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  Calendar,
  CreditCard,
  Building2,
  Loader2,
  FileText,
  Mail
} from "lucide-react";

/**
 * TODO: Backend Integration Notes
 * 
 * 1. Authentication:
 *    - Use NextAuth.js for authentication
 *    - Add middleware to protect /admin routes
 *    - Check for ADMIN role in session
 * 
 * 2. Data Fetching:
 *    - Replace demoRegistrations with API calls
 *    - Add loading states
 *    - Implement error handling
 *    - Add pagination for large datasets
 * 
 * 3. Actions:
 *    - Implement export functionality
 *    - Add contact user functionality
 *    - Add check-in functionality
 *    - Add payment status update
 * 
 * 4. Real-time Updates:
 *    - Consider using WebSocket for real-time updates
 *    - Add notifications for new registrations
 */

// Demo data for registrations
const demoRegistrations = [
  // Nrityatrix Events
  {
    id: "reg1",
    eventId: "event1",
    userId: "user123",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    usn: "1MV21CS001",
    collegeName: "MVJCE",
    participants: [
      { id: "p1", name: "John Doe", usn: "1MV21CS001", college: "MVJCE" }
    ],
    paymentAmount: 250,
    paymentId: "pay_123456789",
    paymentStatus: "paid",
    createdAt: "2024-05-15T10:30:00Z",
    isCheckedIn: true,
    checkedInAt: "2024-05-15T11:30:00Z",
    event: {
      id: "event1",
      title: "Classical Dance Workshop",
      clubName: "Nrityatrix",
      date: "2024-06-15",
      time: "10:00 AM - 1:00 PM",
      venue: "Dance Studio"
    }
  },
  // Raagabhinaya Events
  {
    id: "reg2",
    eventId: "event2",
    userId: "user456",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543211",
    usn: "1MV21CS002",
    collegeName: "MVJCE",
    participants: [
      { id: "p2", name: "Jane Smith", usn: "1MV21CS002", college: "MVJCE" },
      { id: "p3", name: "Alice Brown", usn: "1MV21CS003", college: "MVJCE" }
    ],
    paymentAmount: 500,
    paymentId: null,
    paymentStatus: "pending",
    createdAt: "2024-05-16T14:20:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event2",
      title: "Carnatic Music Competition",
      clubName: "Raagabhinaya",
      date: "2024-06-20",
      time: "2:00 PM - 6:00 PM",
      venue: "Main Auditorium"
    }
  },
  // Saahitya Events
  {
    id: "reg3",
    eventId: "event3",
    userId: "user789",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "9876543212",
    usn: "1MV21CS003",
    collegeName: "MVJCE",
    participants: [
      { id: "p4", name: "Mike Johnson", usn: "1MV21CS003", college: "MVJCE" }
    ],
    paymentAmount: 150,
    paymentId: "pay_failed123",
    paymentStatus: "failed",
    createdAt: "2024-05-17T09:15:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event3",
      title: "Poetry Slam",
      clubName: "Saahitya",
      date: "2024-06-25",
      time: "4:00 PM - 7:00 PM",
      venue: "Open Air Theatre"
    }
  },
  // Toastmasters Events
  {
    id: "reg4",
    eventId: "event4",
    userId: "user101",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "9876543213",
    usn: "1MV21CS004",
    collegeName: "MVJCE",
    participants: [
      { id: "p5", name: "Sarah Wilson", usn: "1MV21CS004", college: "MVJCE" }
    ],
    paymentAmount: 300,
    paymentId: "pay_789012345",
    paymentStatus: "paid",
    createdAt: "2024-05-18T11:45:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event4",
      title: "Public Speaking Workshop",
      clubName: "Toastmasters",
      date: "2024-06-30",
      time: "10:00 AM - 4:00 PM",
      venue: "Conference Hall"
    }
  },
  // Aakriti Events
  {
    id: "reg5",
    eventId: "event5",
    userId: "user102",
    name: "David Chen",
    email: "david@example.com",
    phone: "9876543214",
    usn: "1MV21CS005",
    collegeName: "MVJCE",
    participants: [
      { id: "p6", name: "David Chen", usn: "1MV21CS005", college: "MVJCE" },
      { id: "p7", name: "Emma Lee", usn: "1MV21CS006", college: "MVJCE" }
    ],
    paymentAmount: 400,
    paymentId: "pay_456789012",
    paymentStatus: "paid",
    createdAt: "2024-05-19T15:30:00Z",
    isCheckedIn: true,
    checkedInAt: "2024-05-19T16:30:00Z",
    event: {
      id: "event5",
      title: "Art Exhibition",
      clubName: "Aakriti",
      date: "2024-07-05",
      time: "11:00 AM - 5:00 PM",
      venue: "Art Gallery"
    }
  },
  // Dhwani Events
  {
    id: "reg6",
    eventId: "event6",
    userId: "user103",
    name: "Lisa Patel",
    email: "lisa@example.com",
    phone: "9876543215",
    usn: "1MV21CS007",
    collegeName: "MVJCE",
    participants: [
      { id: "p8", name: "Lisa Patel", usn: "1MV21CS007", college: "MVJCE" }
    ],
    paymentAmount: 200,
    paymentId: null,
    paymentStatus: "pending",
    createdAt: "2024-05-20T09:00:00Z",
    isCheckedIn: false,
    checkedInAt: null,
    event: {
      id: "event6",
      title: "Western Music Night",
      clubName: "Dhwani",
      date: "2024-07-10",
      time: "6:00 PM - 9:00 PM",
      venue: "Open Air Theatre"
    }
  }
];

// Helper function to get payment status badge
const getPaymentStatusBadge = (status) => {
  switch (status) {
    case "paid":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="w-3 h-3 mr-1" />
          Paid
        </span>
      );
    case "pending":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <X className="w-3 h-3 mr-1" />
          Failed
        </span>
      );
    default:
      return null;
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [selectedClub, setSelectedClub] = useState("all");
  const [filteredRegistrations, setFilteredRegistrations] = useState(demoRegistrations);
  const [expandedRegistrations, setExpandedRegistrations] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For API integration
  const [isFiltered, setIsFiltered] = useState(false);

  // Get unique events and clubs for filters
  const events = [...new Set(demoRegistrations.map(reg => reg.event.title))];
  const clubs = [...new Set(demoRegistrations.map(reg => reg.event.clubName))];

  // Club-wise registration count
  const clubCounts = clubs.map(club => ({
    club,
    count: filteredRegistrations.filter(reg => reg.event.clubName === club).length
  }));

  // Toggle registration details
  const toggleRegistrationDetails = (registrationId) => {
    setExpandedRegistrations(prev => ({
      ...prev,
      [registrationId]: !prev[registrationId]
    }));
  };

  // Filter registrations based on search and filters
  useEffect(() => {
    let filtered = demoRegistrations;
    let hasFilters = false;
    
    if (searchQuery) {
      filtered = filtered.filter(reg => 
        reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.usn.toLowerCase().includes(searchQuery.toLowerCase())
      );
      hasFilters = true;
    }
    
    if (selectedPaymentStatus !== "all") {
      filtered = filtered.filter(reg => reg.paymentStatus === selectedPaymentStatus);
      hasFilters = true;
    }
    
    if (selectedEvent !== "all") {
      filtered = filtered.filter(reg => reg.event.title === selectedEvent);
      hasFilters = true;
    }
    
    if (selectedClub !== "all") {
      filtered = filtered.filter(reg => reg.event.clubName === selectedClub);
      hasFilters = true;
    }
    
    setIsFiltered(hasFilters);
    setFilteredRegistrations(filtered);
  }, [searchQuery, selectedPaymentStatus, selectedEvent, selectedClub]);

  return (
    <div className="min-h-screen bg-contain bg-center bg-[url('/assets/AndroidBackground.png')] md:bg-[url('/assets/Background.png')] bg-fixed text-[#5F4A37] scroll-smooth">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            {/* <p className="text-[#5F4A37]/70">Manage event registrations and communications</p> */}
          </div>
          <Link 
            href="/admin/chats"
            className="inline-flex items-center px-4 py-2 bg-[#5F4A37] text-[#fff4d4] rounded-lg hover:bg-[#5F4A37]/90 transition-colors"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            View Chatbot messages
          </Link>
        </div>

        {/* Stats Overview - compact */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <div className="bg-[#fff4d4]/90 border border-[#5F4A37]/20 rounded-lg p-2 flex items-center justify-between min-w-0">
            <div>
              <p className="text-xs text-[#5F4A37]/70">Total</p>
              <p className="text-lg font-bold">{demoRegistrations.length}</p>
            </div>
            <Users className="w-6 h-6 text-[#5F4A37]/40" />
          </div>
          <div className="bg-[#fff4d4]/90 border border-[#5F4A37]/20 rounded-lg p-2 flex items-center justify-between min-w-0">
            <div>
              <p className="text-xs text-[#5F4A37]/70">Paid</p>
              <p className="text-lg font-bold">{demoRegistrations.filter(reg => reg.paymentStatus === 'paid').length}</p>
            </div>
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <div className="bg-[#fff4d4]/90 border border-[#5F4A37]/20 rounded-lg p-2 flex items-center justify-between min-w-0">
            <div>
              <p className="text-xs text-[#5F4A37]/70">Pending</p>
              <p className="text-lg font-bold">{demoRegistrations.filter(reg => reg.paymentStatus === 'pending').length}</p>
            </div>
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="bg-[#fff4d4]/90 border border-[#5F4A37]/20 rounded-lg p-2 flex items-center justify-between min-w-0">
            <div>
              <p className="text-xs text-[#5F4A37]/70">Failed</p>
              <p className="text-lg font-bold">{demoRegistrations.filter(reg => reg.paymentStatus === 'failed').length}</p>
            </div>
            <X className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Club-wise breakdown - only show when filtered */}
        {isFiltered && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-sm font-semibold">Filtered Results</h2>
              <span className="text-xs bg-[#5F4A37]/10 px-2 py-0.5 rounded">
                {filteredRegistrations.length} of {demoRegistrations.length} registrations
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {clubCounts.filter(c => c.count > 0).map(({ club, count }) => (
                <div key={club} className="bg-[#fff4d4]/90 border border-[#5F4A37]/20 rounded-lg px-3 py-1 flex items-center gap-2 text-xs">
                  <Building2 className="w-3 h-3 text-[#5F4A37]/40" />
                  <span className="font-medium">{club}:</span>
                  <span className="font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-[#fff4d4]/80 border border-[#5F4A37]/20 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50" />
              <input
                type="text"
                placeholder="Search by name, email, or USN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-[#5F4A37]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F4A37]/30"
              />
            </div>
            {/* Payment Status Filter */}
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50" />
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-[#5F4A37]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F4A37]/30 appearance-none"
              >
                <option value="all">All Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50 pointer-events-none" />
            </div>
            {/* Event Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50" />
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-[#5F4A37]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F4A37]/30 appearance-none"
              >
                <option value="all">All Events</option>
                {events.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50 pointer-events-none" />
            </div>
            {/* Club Filter */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50" />
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-[#5F4A37]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F4A37]/30 appearance-none"
              >
                <option value="all">All Clubs</option>
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5F4A37]/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Registrations List - with dropdowns */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-[#5F4A37] animate-spin" />
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-8 bg-[#fff4d4]/80 border border-[#5F4A37]/20 rounded-lg">
              <p className="text-base text-[#5F4A37]/70">No registrations found</p>
            </div>
          ) : (
            filteredRegistrations.map(registration => (
              <div 
                key={registration.id}
                className="bg-[#fff4d4]/80 border border-[#5F4A37]/20 rounded-lg overflow-hidden"
              >
                {/* Registration Header */}
                <div 
                  className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 justify-between cursor-pointer hover:bg-[#5F4A37]/5"
                  onClick={() => toggleRegistrationDetails(registration.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold truncate">{registration.name}</span>
                      {getPaymentStatusBadge(registration.paymentStatus)}
                    </div>
                    <p className="text-xs text-[#5F4A37]/70 truncate">{registration.email}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-0.5 min-w-[120px]">
                    <span className="text-xs font-medium truncate">{registration.event.title}</span>
                    <span className="text-xs text-[#5F4A37]/70 truncate">{registration.event.clubName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">₹{registration.paymentAmount}</span>
                    {expandedRegistrations[registration.id] ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    )}
                  </div>
                </div>
                
                {/* Dropdown Details */}
                {expandedRegistrations[registration.id] && (
                  <div className="border-t border-[#5F4A37]/10 bg-[#5F4A37]/5 px-4 py-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* First column */}
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-[#5F4A37]/70">Registration ID</p>
                          <p>{registration.id}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#5F4A37]/70">Contact</p>
                          <p>Phone: {registration.phone}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#5F4A37]/70">Academics</p>
                          <p>USN: {registration.usn}</p>
                          <p>College: {registration.collegeName}</p>
                        </div>
                      </div>
                      
                      {/* Second column */}
                      <div className="space-y-2">
                        <div>
                          <p className="font-semibold text-[#5F4A37]/70">Payment</p>
                          <p>Amount: ₹{registration.paymentAmount}</p>
                          <p>Payment ID: {registration.paymentId || 'N/A'}</p>
                          <p>Status: {registration.paymentStatus}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-[#5F4A37]/70">Event</p>
                          <p>{registration.event.title}</p>
                          <p>Club: {registration.event.clubName}</p>
                          <p>Date: {formatDate(registration.event.date)}</p>
                          <p>Time: {registration.event.time}</p>
                          <p>Venue: {registration.event.venue}</p>
                        </div>
                      </div>
                      
                      {/* Participants */}
                      {registration.participants.length > 0 && (
                        <div className="col-span-1 md:col-span-2">
                          <p className="font-semibold text-[#5F4A37]/70 mb-1">Participants ({registration.participants.length})</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {registration.participants.map(participant => (
                              <div key={participant.id} className="bg-[#fff4d4]/80 rounded p-2">
                                <p className="font-medium">{participant.name}</p>
                                <p>USN: {participant.usn}</p>
                                <p>College: {participant.college}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 