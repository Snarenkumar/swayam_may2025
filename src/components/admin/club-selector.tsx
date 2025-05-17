"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Club } from "./admin-dashboard"

interface ClubSelectorProps {
  clubs: Club[]
  selectedClub: string | null
  onSelectClub: (club: string | null) => void
}

export function ClubSelector({ clubs, selectedClub, onSelectClub }: ClubSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="club-select">Select Club</Label>
      <Select value={selectedClub || ""} onValueChange={(value) => onSelectClub(value || null)}>
        <SelectTrigger id="club-select" className="w-full">
          <SelectValue placeholder="Select a club" />
        </SelectTrigger>
        <SelectContent>
          {clubs.map((club) => (
            <SelectItem key={club.name} value={club.name}>
              {club.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
