"use client"

import { useState } from "react"
import { ClubSelector } from "@/components/admin/club-selector"
import { EventSelector } from "@/components/admin/event-selector"
import { RegistrationsTable } from "@/components/admin/registrations-table"
import { PaymentStatusFilter } from "@/components/admin/payment-status-filter"
import { ExportButton } from "@/components/admin/export-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Filter } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Types based on the Prisma schema
export type Club = {
  name: string
}

export type Event = {
  id: string
  title: string
  clubName: string
}

export type Registration = {
  id: string
  name: string
  userId: string
  phone: string
  usn: string
  collegeName: string
  clubName: string
  paymentAmount: number | null
  paymentId: string | null
  createdAt: Date
  updatedAt: Date | null
  eventId: string
  isCheckedIn: boolean | null
  checkedInAt: Date | null
  event: Event
  teamMembers: TeamMember[]
}

export type TeamMember = {
  id: string
  name: string
  usn: string
  collegeName: string
}

export type PaymentStatus = "all" | "pending" | "completed"

export default function AdminDashboard() {
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("all")
  const [activeTab, setActiveTab] = useState<string>("custom")
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [allFetchedRegistrations, setAllFetchedRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  // Mock data for demonstration - in a real app, this would come from an API
  const clubs: Club[] = [{ name: "Tech Club" }, { name: "Arts Club" }, { name: "Sports Club" }]

  const events: Event[] = [
    { id: "1", title: "Hackathon", clubName: "Tech Club" },
    { id: "2", title: "Web Dev Workshop", clubName: "Tech Club" },
    { id: "3", title: "Painting Competition", clubName: "Arts Club" },
    { id: "4", title: "Basketball Tournament", clubName: "Sports Club" },
  ]

  // Filter events based on selected club
  const filteredEvents = selectedClub ? events.filter((event) => event.clubName === selectedClub) : []

  // Function to fetch registrations based on selected events
  const fetchRegistrations = async () => {
    setLoading(true)

    // In a real app, this would be an API call
    // For now, we'll simulate with a timeout
    setTimeout(() => {
      // Mock data for registrations
      const mockRegistrations: Registration[] = [
        {
          id: "reg1",
          name: "John Doe",
          userId: "user1",
          phone: "1234567890",
          usn: "USN001",
          collegeName: "Engineering College",
          clubName: selectedClub || "",
          paymentAmount: 500,
          paymentId: "pay123",
          createdAt: new Date(),
          updatedAt: null,
          eventId: "1",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "1", title: "Hackathon", clubName: "Tech Club" },
          teamMembers: [
            { id: "tm1", name: "Team Member 1", usn: "USN002", collegeName: "Engineering College" },
            { id: "tm2", name: "Team Member 2", usn: "USN003", collegeName: "Engineering College" },
          ],
        },
        {
          id: "reg2",
          name: "Jane Smith",
          userId: "user2",
          phone: "9876543210",
          usn: "USN003",
          collegeName: "Science College",
          clubName: selectedClub || "",
          paymentAmount: null,
          paymentId: null,
          createdAt: new Date(),
          updatedAt: null,
          eventId: "1",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "1", title: "Hackathon", clubName: "Tech Club" },
          teamMembers: [],
        },
      ]

      // Store all fetched registrations
      setAllFetchedRegistrations(mockRegistrations)

      // Apply payment status filter
      applyPaymentStatusFilter(mockRegistrations, paymentStatus)

      setLoading(false)
    }, 1000)
  }

  // Function to apply payment status filter
  const applyPaymentStatusFilter = (registrations: Registration[], status: PaymentStatus) => {
    if (status === "all") {
      setRegistrations(registrations)
    } else if (status === "pending") {
      setRegistrations(registrations.filter((reg) => reg.paymentId === null))
    } else if (status === "completed") {
      setRegistrations(registrations.filter((reg) => reg.paymentId !== null))
    }
  }

  // Function to handle payment status change
  const handlePaymentStatusChange = (status: PaymentStatus) => {
    setPaymentStatus(status)

    // Apply the filter to already fetched registrations
    if (allFetchedRegistrations.length > 0) {
      applyPaymentStatusFilter(allFetchedRegistrations, status)
    }
  }

  // Function to fetch all registrations
  const fetchAllRegistrations = () => {
    setSelectedClub(null)
    setSelectedEvents([])
    setPaymentStatus("all")
    setActiveTab("all")

    // Then fetch registrations
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for all registrations
      const allMockRegistrations: Registration[] = [
        // Tech Club - Hackathon
        {
          id: "reg1",
          name: "John Doe",
          userId: "user1",
          phone: "1234567890",
          usn: "USN001",
          collegeName: "Engineering College",
          clubName: "Tech Club",
          paymentAmount: 500,
          paymentId: "pay123",
          createdAt: new Date(),
          updatedAt: null,
          eventId: "1",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "1", title: "Hackathon", clubName: "Tech Club" },
          teamMembers: [{ id: "tm1", name: "Team Member 1", usn: "USN002", collegeName: "Engineering College" }],
        },
        // Tech Club - Web Dev Workshop
        {
          id: "reg3",
          name: "Alice Johnson",
          userId: "user3",
          phone: "5551234567",
          usn: "USN004",
          collegeName: "Tech Institute",
          clubName: "Tech Club",
          paymentAmount: 300,
          paymentId: "pay456",
          createdAt: new Date(),
          updatedAt: null,
          eventId: "2",
          isCheckedIn: true,
          checkedInAt: new Date(),
          event: { id: "2", title: "Web Dev Workshop", clubName: "Tech Club" },
          teamMembers: [
            { id: "tm3", name: "Team Member 3", usn: "USN005", collegeName: "Tech Institute" },
            { id: "tm4", name: "Team Member 4", usn: "USN006", collegeName: "Tech Institute" },
          ],
        },
        // Arts Club
        {
          id: "reg4",
          name: "Bob Williams",
          userId: "user4",
          phone: "7778889999",
          usn: "USN005",
          collegeName: "Arts College",
          clubName: "Arts Club",
          paymentAmount: null,
          paymentId: null,
          createdAt: new Date(),
          updatedAt: null,
          eventId: "3",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "3", title: "Painting Competition", clubName: "Arts Club" },
          teamMembers: [],
        },
      ]

      setRegistrations(allMockRegistrations)
      setLoading(false)
    }, 1000)
  }

  // Function to fetch only pending payment registrations
  const fetchPendingPayments = () => {
    setSelectedClub(null)
    setSelectedEvents([])
    setPaymentStatus("pending")
    setActiveTab("pending")

    // Then fetch registrations
    setLoading(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data for pending payments
      const pendingMockRegistrations: Registration[] = [
        {
          id: "reg2",
          name: "Jane Smith",
          userId: "user2",
          phone: "9876543210",
          usn: "USN003",
          collegeName: "Science College",
          clubName: "Tech Club",
          paymentAmount: null,
          paymentId: null,
          createdAt: new Date(),
          updatedAt: null,
          eventId: "1",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "1", title: "Hackathon", clubName: "Tech Club" },
          teamMembers: [{ id: "tm5", name: "Team Member 5", usn: "USN007", collegeName: "Science College" }],
        },
        {
          id: "reg4",
          name: "Bob Williams",
          userId: "user4",
          phone: "7778889999",
          usn: "USN005",
          collegeName: "Arts College",
          clubName: "Arts Club",
          paymentAmount: null,
          paymentId: null,
          createdAt: new Date(),
          updatedAt: null,
          eventId: "3",
          isCheckedIn: false,
          checkedInAt: null,
          event: { id: "3", title: "Painting Competition", clubName: "Arts Club" },
          teamMembers: [],
        },
      ]

      setRegistrations(pendingMockRegistrations)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="custom">Custom Selection</TabsTrigger>
          <TabsTrigger value="all">All Registrations</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Club and Events</CardTitle>
              <CardDescription>
                Choose a club to view its events, then select events to view registrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ClubSelector clubs={clubs} selectedClub={selectedClub} onSelectClub={setSelectedClub} />
                </div>
                <div>
                  <EventSelector
                    events={filteredEvents}
                    selectedEvents={selectedEvents}
                    onSelectEvents={setSelectedEvents}
                    disabled={!selectedClub}
                  />
                </div>
              </div>

              {selectedClub && selectedEvents.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <PaymentStatusFilter value={paymentStatus} onChange={handlePaymentStatusChange} />
                  <div className="flex gap-2">
                    <Button onClick={fetchRegistrations} disabled={loading}>
                      <Filter className="mr-2 h-4 w-4" />
                      Fetch Registrations
                    </Button>
                    {registrations.length > 0 && <ExportButton data={registrations} />}
                  </div>
                </div>
              )}

              {selectedClub && selectedEvents.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No events selected</AlertTitle>
                  <AlertDescription>Please select at least one event to view registrations.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {registrations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Registration Results</CardTitle>
                <CardDescription>
                  Showing {registrations.length} registrations
                  {paymentStatus !== "all" && ` with ${paymentStatus} payment status`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationsTable data={registrations} loading={loading} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Registrations</CardTitle>
              <CardDescription>View all registrations grouped by Club → Event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Showing all registrations across all clubs and events</p>
                <div className="flex gap-2">
                  <Button onClick={fetchAllRegistrations} disabled={loading}>
                    Fetch All Registrations
                  </Button>
                  {registrations.length > 0 && <ExportButton data={registrations} />}
                </div>
              </div>

              {registrations.length > 0 && (
                <RegistrationsTable data={registrations} loading={loading} groupByClubAndEvent={true} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
              <CardDescription>View all registrations with pending payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Showing registrations with pending payment status</p>
                <div className="flex gap-2">
                  <Button onClick={fetchPendingPayments} disabled={loading} variant="destructive">
                    Fetch Pending Payments
                  </Button>
                  {registrations.length > 0 && <ExportButton data={registrations} />}
                </div>
              </div>

              {registrations.length > 0 && (
                <RegistrationsTable data={registrations} loading={loading} groupByClubAndEvent={true} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
