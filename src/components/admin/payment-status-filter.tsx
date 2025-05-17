"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { PaymentStatus } from "./admin-dashboard"

interface PaymentStatusFilterProps {
  value: PaymentStatus
  onChange: (value: PaymentStatus) => void
}

export function PaymentStatusFilter({ value, onChange }: PaymentStatusFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Payment Status</Label>
      <RadioGroup value={value} onValueChange={(val) => onChange(val as PaymentStatus)} className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="cursor-pointer">
            All
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pending" id="pending" />
          <Label htmlFor="pending" className="cursor-pointer">
            Payment Pending
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="completed" id="completed" />
          <Label htmlFor="completed" className="cursor-pointer">
            Payment Completed
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
