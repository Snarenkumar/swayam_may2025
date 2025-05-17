"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";
import type { TeamMember } from "./admin-dashboard";

interface TeamMembersDialogProps {
  leadName: string;
  leadUsn: string;
  leadCollege: string;
  teamMembers: TeamMember[];
}

export function TeamMembersDialog({
  leadName,
  leadUsn,
  leadCollege,
  teamMembers,
}: TeamMembersDialogProps) {
  const totalMembers = teamMembers.length + 1; // Including the lead

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Users className="h-4 w-4 mr-2" />
          {totalMembers} {totalMembers === 1 ? "member" : "members"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
          <DialogDescription>
            Showing all {totalMembers} team{" "}
            {totalMembers === 1 ? "member" : "members"} for this registration.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>USN</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Lead Member */}
              <TableRow className="font-medium">
                <TableCell>1</TableCell>
                <TableCell>{leadName}</TableCell>
                <TableCell>{leadUsn}</TableCell>
                <TableCell>{leadCollege}</TableCell>
                <TableCell>Lead</TableCell>
              </TableRow>

              {/* Team Members */}
              {teamMembers.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>{index + 2}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.usn}</TableCell>
                  <TableCell>{member.collegeName}</TableCell>
                  <TableCell>Member</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
