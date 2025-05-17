"use client"

import { Button } from "@/components/ui/button"
import { FileSpreadsheet } from "lucide-react"
import type { Registration } from "./admin-dashboard"
import { useState } from "react"

interface ExportButtonProps {
  data: Registration[]
}

export function ExportButton({ data }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const formatTeamMembers = (registration: Registration): string => {
    // Format the lead member
    let result = `Lead: ${registration.name} (${registration.usn}, ${registration.collegeName})`

    // Add team members if any
    if (registration.teamMembers.length > 0) {
      result +=
        "; Members: " +
        registration.teamMembers
          .map((member, index) => `${index + 1}. ${member.name} (${member.usn}, ${member.collegeName})`)
          .join("; ")
    }

    return result
  }

  const exportToExcel = async () => {
    try {
      setExporting(true)

      // In a real application, you would use a library like xlsx
      // For this example, we'll just simulate the export

      // Format the data for export
      const exportData = data.map((reg) => ({
        Club: reg.clubName,
        Event: reg.event.title,
        Name: reg.name,
        USN: reg.usn,
        Phone: reg.phone,
        College: reg.collegeName,
        "Team Members": formatTeamMembers(reg),
        "Team Size": reg.teamMembers.length + 1,
        "Payment Status": reg.paymentId ? "Paid" : "Pending",
        Amount: reg.paymentAmount ? `₹${reg.paymentAmount.toFixed(2)}` : "-",
        "Check-in Status": reg.isCheckedIn ? "Checked In" : "Not Checked In",
        "Registration Date": new Date(reg.createdAt).toLocaleDateString(),
      }))

      // In a real app, you would use a library to create and download the Excel file
      // For this example, we'll just log the data and simulate a download
      console.log("Exporting data:", exportData)

      // Simulate download delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a fake download
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain;charset=utf-8,")
      element.setAttribute("download", `registrations_export_${new Date().toISOString().slice(0, 10)}.xlsx`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      setExporting(false)
    } catch (error) {
      console.error("Export failed:", error)
      setExporting(false)
    }
  }

  return (
    <Button variant="outline" onClick={exportToExcel} disabled={exporting}>
      <FileSpreadsheet className="mr-2 h-4 w-4" />
      {exporting ? "Exporting..." : "Export to Excel"}
    </Button>
  )
}
