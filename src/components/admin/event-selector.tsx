"use client"

import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import type { Event } from "./admin-dashboard"
import { useState } from "react"

interface EventSelectorProps {
  events: Event[]
  selectedEvents: string[]
  onSelectEvents: (events: string[]) => void
  disabled?: boolean
}

export function EventSelector({ events, selectedEvents, onSelectEvents, disabled = false }: EventSelectorProps) {
  const [open, setOpen] = useState(false)

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      onSelectEvents(selectedEvents.filter((id) => id !== eventId))
    } else {
      onSelectEvents([...selectedEvents, eventId])
    }
  }

  const selectedEventTitles = events.filter((event) => selectedEvents.includes(event.id)).map((event) => event.title)

  return (
    <div className="space-y-2">
      <Label htmlFor="event-select">Select Events</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
            id="event-select"
          >
            {selectedEvents.length > 0
              ? `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} selected`
              : "Select events"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search events..." />
            <CommandList>
              <CommandEmpty>No events found.</CommandEmpty>
              <CommandGroup>
                {events.map((event) => (
                  <CommandItem key={event.id} value={event.title} onSelect={() => toggleEvent(event.id)}>
                    <CheckIcon
                      className={cn("mr-2 h-4 w-4", selectedEvents.includes(event.id) ? "opacity-100" : "opacity-0")}
                    />
                    {event.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedEvents.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedEventTitles.map((title) => (
            <Badge key={title} variant="secondary">
              {title}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
