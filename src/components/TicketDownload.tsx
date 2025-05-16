"use client";

import { useState } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Registration, TeamMember } from "@prisma/client";
import { Event } from "@/types/event";

export function TicketDownload({
  registration,
  event,
}: {
  registration: Registration & { teamMembers: TeamMember[] };
  event: Event;
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTicketContent = async () => {
    // Calculate the minimum height based on team members count
    // More aggressive scaling for larger teams
    const baseHeight = 297; // A4 height in mm
    const extraHeightPerMember = 15; // More mm per member
    const minHeight = `${Math.max(
      baseHeight,
      baseHeight + (registration.teamMembers.length - 5) * extraHeightPerMember
    )}mm`;

    const container = document.createElement("div");
    Object.assign(container.style, {
      width: "210mm",
      minHeight: minHeight,
      padding: "15mm 20mm",
      backgroundColor: "#fff4d4",
      color: "#5f4a37",
      fontFamily: "'Open Sans', Arial, sans-serif",
      position: "absolute", // Changed from fixed to absolute
      left: "-10000px",
      top: 0,
      boxSizing: "border-box",
    });

    // Generate QR code with larger dimensions and proper scaling
    const qrCodeDataURL = await QRCode.toDataURL(registration.id, {
      width: 200, // Increased from 150
      margin: 2,
      scale: 8, // Explicit scale factor
      color: {
        dark: "#5f4a37ff",
        light: "#fff4d400",
      },
    });

    // Handle team members display
    const teamMembersContent = renderTeamMembers(registration.teamMembers);

    container.innerHTML = `
      <!-- Header with Logos -->
      <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10mm;">
        <div>
          <img src="/assets/mvjLogo.png" alt="College Logo" style="height: 20mm; width: auto; object-fit: contain" />
          <img src="/assets/SwayamLogo.png" alt="Event Logo" style="height: 20mm; width: auto; object-fit: contain;" />
        </div>
        <div style="margin-left:8mm">
          <h1 style="font-size: 24pt; margin: 0; font-weight: 700; letter-spacing: -0.5pt;">
            ${event.name}
          </h1>
        </div>
      </div>

      <!-- Divider -->
      <div style="border-bottom: 2px solid #5f4a37; margin-bottom: 8mm;"></div>

      <!-- Main Content -->
      <div style="display: flex; gap: 15mm;">
        <!-- Left Column -->
        <div style="flex: 1; overflow: visible;">
          <!-- Participant Details -->
          <section style="margin-bottom: 8mm;">
            <h2 style="font-size: 16pt; margin: 0 0 4mm 0; font-weight: 600; text-transform: uppercase;">
              Participant Details
            </h2>
            <div style="font-size: 12pt; line-height: 1.6;">
              <p style="margin: 0 0 3mm 0;"><strong>Name:</strong> ${
                registration.name
              }</p>
              <p style="margin: 0 0 3mm 0;"><strong>College:</strong> ${
                registration.collegeName
              }</p>
              <p style="margin: 0 0 3mm 0;"><strong>USN:</strong> ${
                registration.usn
              }</p>
              <p style="margin: 0 0 3mm 0;"><strong>Phone:</strong> ${
                registration.phone
              }</p>
            </div>
          </section>

          <!-- Team Members -->
          <section style="margin-bottom: 8mm;">
            <h2 style="font-size: 16pt; margin: 0 0 4mm 0; font-weight: 600; text-transform: uppercase;">
              Team Members (${registration.teamMembers.length})
            </h2>
            ${teamMembersContent}
          </section>
        </div>

        <!-- Right Column -->
        <div style="width: 70mm; flex-shrink: 0;">
          <!-- QR Code Section -->
          <div style="background: white; padding: 5mm; border-radius: 3mm; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 5mm; text-align: center;">
            <img src="${qrCodeDataURL}" style="width: 50mm; height: 50mm; display: block; margin: 0 auto; image-rendering: pixelated;" />
            <p style="font-size: 10pt; margin: 3mm 0 0 0; color: #666;">Scan to verify registration</p>
          </div>

          <!-- Payment Info -->
          <div style="background: rgba(95,74,55,0.08); padding: 4mm; border-radius: 3mm; margin-bottom: 5mm;">
            <h3 style="font-size: 14pt; margin: 0 0 3mm 0; font-weight: 600; text-align: center;">Payment Details</h3>
            <p style="font-size: 12pt; margin: 0 0 2mm 0;"><strong>Status:</strong> ${
              registration.paymentId ? "Paid" : "Pending"
            }</p>
            <p style="font-size: 12pt; margin: 0 0 2mm 0;"><strong>Amount:</strong> ₹${
              event.registration_fee
            }</p>
            ${
              registration.paymentId
                ? `<p style="font-size: 11pt; margin: 0;"><strong>Transaction ID:</strong> ${registration.paymentId}</p>`
                : ""
            }
          </div>

          <!-- Event Quick Info -->
          <div style="background: rgba(95,74,55,0.08); padding: 4mm; border-radius: 3mm;">
            <h3 style="font-size: 14pt; margin: 0 0 3mm 0; font-weight: 600; text-align: center;">Event Info</h3>
            <p style="font-size: 11pt; margin: 0 0 2mm 0;"><strong>Date:</strong> ${
              event.date_time
            }</p>
            <p style="font-size: 11pt; margin: 0 0 2mm 0;"><strong>Team Size:</strong> ${
              registration.teamMembers.length + 1
            }</p>
            <p style="font-size: 11pt; margin: 0;"><strong>Registration ID:</strong> ${
              registration.id
            }</p>
          </div>
        </div>
      </div>

      <!-- Footer Section -->
      <div style="margin-top: 15mm; padding-top: 5mm; border-top: 2px solid #5f4a37;">
        <div style="display: flex; gap: 10mm;">
          <!-- Prizes -->
          <div style="flex: 1;">
            <h3 style="font-size: 14pt; margin: 0 0 3mm 0; font-weight: 600;">Prizes</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 11pt;">
              <li style="margin: 0 0 2mm 0; display: flex; align-items: center;">
                <span style="font-size: 16pt; margin-right: 2mm;">🥇</span>
                <span>${event.prizes.first}</span>
              </li>
              <li style="margin: 0; display: flex; align-items: center;">
                <span style="font-size: 16pt; margin-right: 2mm;">🥈</span>
                <span>${event.prizes.second}</span>
              </li>
            </ul>
          </div>

          <!-- Coordinators -->
          <div style="flex: 1;">
            <h3 style="font-size: 14pt; margin: 0 0 3mm 0; font-weight: 600;">Coordinators</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 11pt;">
              ${event.coordinators
                .map(
                  (coord) => `
                  <li style="margin: 0 0 2mm 0;">
                    <strong>${coord.name}</strong><br/>
                    ${coord.phone}
                  </li>
                `
                )
                .join("")}
            </ul>
          </div>

          <!-- Rules -->
          <div style="flex: 1;">
            <h3 style="font-size: 14pt; margin: 0 0 3mm 0; font-weight: 600;">Important Notes</h3>
            <ul style="list-style: disc; padding-left: 5mm; margin: 0; font-size: 11pt;">
              ${event.rules
                .slice(0, 3)
                .map((rule) => `<li style="margin: 0 0 2mm 0;">${rule}</li>`)
                .join("")}
            </ul>
          </div>
        </div>

        <!-- Footer Note -->
        <div style="margin-top: 5mm; font-size: 9pt; text-align: center; color: rgba(95,74,55,0.6);">
          Please bring this ticket and college ID for verification. Generated on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    return container;
  };

  // Function to handle team members display - improved for many members
  const renderTeamMembers = (teamMembers: TeamMember[]) => {
    // Always use a more compact display for consistency
    return `
      <div style="width: 100%;">
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 11pt; display: grid; grid-template-columns: 1fr; gap: 2mm;">
          ${teamMembers
            .map(
              (
                member,
                index
              ) => ` <li id=${index} style="margin: 0 0 4mm 0; padding: 3mm; background: rgba(95,74,55,0.05); border-radius: 2mm;">
                  <strong style="display: block; margin-bottom: 1mm; font-size: 13pt;">${member.name}</strong>
                  <div style="font-size: 11pt;">
                    <p style="margin: 0 0 1mm 0;"><strong>USN:</strong> ${member.usn}</p>
                    <p style="margin: 0;"><strong>College:</strong> ${member.collegeName}</p>
                  </div>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `;
  };

  const downloadPDF = async () => {
    setIsGenerating(true);
    try {
      const ticketContent = await generateTicketContent();
      document.body.appendChild(ticketContent);

      // Calculate the actual height required based on team members
      const teamMemberRows = registration.teamMembers.length;
      const extraHeight = Math.max(0, (teamMemberRows - 5) * 15);
      const pdfHeight = 297 + extraHeight; // A4 height + extra

      const canvas = await html2canvas(ticketContent, {
        scale: 2, // Higher scale for better quality
        logging: false,
        useCORS: true,
        backgroundColor: "#fff4d4",
        allowTaint: true,
        height: ticketContent.scrollHeight,
        windowHeight: ticketContent.scrollHeight,
        onclone: (clonedDoc, element) => {
          // Force the height to match the content
          element.style.height = `${element.scrollHeight}px`;
        },
      });

      document.body.removeChild(ticketContent);

      // Create PDF with dynamic dimensions
      const imgWidth = 210; // A4 width in mm
      const pdfWidth = imgWidth;

      // Calculate height to maintain aspect ratio
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [pdfWidth, Math.max(pdfHeight, imgHeight)], // Use calculated height
      });

      // Add the image to the PDF, respecting the aspect ratio
      pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, imgHeight, undefined, "FAST");

      pdf.save(`${event.name.replace(/[^a-z0-9]/gi, "_")}_Ticket.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={downloadPDF}
      disabled={isGenerating}
      className="bg-[#5f4a37] hover:bg-[#4a3a2c] text-[#fff4d4]"
    >
      {isGenerating ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          Generating Ticket...
        </span>
      ) : (
        "Download Ticket"
      )}
    </Button>
  );
}
