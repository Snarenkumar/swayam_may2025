/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Trash2,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Event } from "@/types/event";
import axios from "axios";
import Script from "next/script";
import { createOrderId } from "@/lib/createOrderId";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

let isFormSubmitted = false;
// Keyframes for pulse animation
const pulseAnimation = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
`;

// Define types for our form data
type TeamMember = {
  id: string;
  name: string;
  usn: string;
  collegeName: string;
};

type FormData = {
  name: string;
  phone: string;
  usn: string;
  collegeName: string;
  teamMembers: TeamMember[];
  termsAccepted: boolean;
};

type RegistrationWithTeamMembers = Prisma.RegistrationGetPayload<{
  include: { teamMembers: true };
}>;

let registrationId: string;

export default function EventRegistration({
  event: { id, registration_fee, maxTeamMembers, minTeamMembers, name },
  userId,
  clubName,
  registeredBefore,
  email,
}: {
  event: Event;
  userId: string;
  clubName: string;
  registeredBefore?: RegistrationWithTeamMembers;
  email: string;
}) {
  // State for tracking the current step
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isResetting, setisResetting] = useState(false);
  if (currentStep == 2 && maxTeamMembers == 1) setCurrentStep(3);
  // Animation for step transitions
  const [animatingStep, setAnimatingStep] = useState(false);
  // Initialize form data
  const [formData, setFormData] = useState<FormData>({
    name: registeredBefore?.name ? registeredBefore.name : "",
    phone: registeredBefore?.phone ? registeredBefore.phone : "",
    usn: registeredBefore?.usn ? registeredBefore.usn : "",
    collegeName: registeredBefore?.usn ? registeredBefore.usn : "",
    teamMembers: registeredBefore?.teamMembers
      ? registeredBefore.teamMembers
      : [],
    termsAccepted: false,
  });

  useEffect(() => {
    if (registeredBefore?.name) setCurrentStep(3);
  }, []);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle primary contact form changes
  const handlePrimaryContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Add a new team member
  const addTeamMember = () => {
    if (formData.teamMembers.length >= maxTeamMembers - 1) {
      toast.error("Maximum team size reached", {
        description: `The maximum about of people that can be in a team is ${maxTeamMembers}`,
      });
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "",
      usn: "",
      collegeName: "",
    };

    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, newMember],
    });
  };

  // Remove a team member
  const removeTeamMember = (id: string) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((member) => member.id !== id),
    });
  };

  // Update team member data
  const updateTeamMember = (
    id: string,
    field: keyof TeamMember,
    value: string
  ) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.map((member) => {
        if (member.id === id) {
          return {
            ...member,
            [field]: value,
          };
        }
        return member;
      }),
    });

    // Clear error when field is updated
    const errorKey = `member-${id}-${field}`;
    if (errors[errorKey]) {
      setErrors({
        ...errors,
        [errorKey]: "",
      });
    }
  };

  // Validate the current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validate primary contact
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }

      if (!formData.usn.trim()) {
        newErrors.usn = "USN is required";
      }

      if (!formData.collegeName.trim()) {
        newErrors.collegeName = "College name is required";
      }
    } else if (step === 2) {
      // Validate team members
      formData.teamMembers.forEach((member) => {
        if (!member.name.trim()) {
          newErrors[`member-${member.id}-name`] = "Name is required";
        }

        if (!member.usn.trim()) {
          newErrors[`member-${member.id}-usn`] = "USN is required";
        }

        if (!member.collegeName.trim()) {
          newErrors[`member-${member.id}-college`] = "College name is required";
        }
      });
      if (formData.teamMembers.length < minTeamMembers - 1)
        newErrors.teamMembers = `Minimum of ${minTeamMembers} people are required to participate in this event`;
      console.log(formData.teamMembers);
    } else if (step === 3) {
      // Validate payment and terms
      if (!formData.termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setAnimatingStep(true);
      setTimeout(() => {
        setCurrentStep((step) => (maxTeamMembers == 1 ? step + 2 : step + 1));
        setAnimatingStep(false);
        window.scrollTo(0, 0);
      }, 300);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setAnimatingStep(true);
    setTimeout(() => {
      setCurrentStep((step) => (maxTeamMembers == 1 ? step - 2 : step - 1));
      setAnimatingStep(false);
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleReset = async () => {
    setisResetting(true);
    try {
      if (registrationId || registeredBefore?.id)
        await axios.delete(
          "/api/registration?id=" + (registrationId || registeredBefore?.id)
        );
      setFormData(() => ({
        name: "",
        collegeName: "",
        phone: "",
        teamMembers: [],
        termsAccepted: false,
        usn: "",
      }));
      setCurrentStep(1);
      toast.success("Form reset successfully");
    } catch (err) {
      console.log(err);
      toast.error(
        "Could not reset the form. Contact the coordinators for more help"
      );
    } finally {
      setisResetting(false);
    }
  };
  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsSubmitting(true);

      // Simulate API call
      try {
        if (!(isFormSubmitted || registeredBefore)) {
          const register = await axios.post(
            "/api/registration?clubName=" + clubName,
            {
              ...formData,
              eventId: id,
              userId,
              paymentAmount: registration_fee,
            }
          );
          registrationId = register.data.id;
        }
        isFormSubmitted = true;
        const orderId: string = await createOrderId(registration_fee);
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: registration_fee * 100,
          currency: "INR",
          name: "MVJCE",
          description: `Payment for the registration of the event ${name}`,
          order_id: orderId,
          modal: {
            ondismiss: function () {
              toast.warning("Complete the payment to avoid any issues");
            },
          },
          handler: async function (response: any) {
            try {
              await axios.post("/api/verifyOrder", {
                razorpay_order_id: orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: registeredBefore?.id || registrationId,
              });

              toast.success("Payment was Successful!");
              setIsComplete(true);
            } catch (error) {
              alert("Payment verification failed. Please contact support.");
              console.error(error);
            }
          },
          prefill: {
            name: formData.name,
            email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.on("payment.failed", function (response: any) {
          console.log(response);
          toast.error("Payment failed", {
            description:
              "There was an error processing your registration. Please try again.",
          });
        });
        razorpay.open();
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
        toast.error("Registration failed", {
          description:
            "There was an error processing your registration. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Handle terms acceptance
  const handleTermsChange = (checked: boolean) => {
    setFormData({
      ...formData,
      termsAccepted: checked,
    });

    if (errors.terms && checked) {
      setErrors({
        ...errors,
        terms: "",
      });
    }
  };

  return (
    <div className="lg:col-span-2">
      <style jsx>{pulseAnimation}</style>
      {/* Progress Stepper */}
      {!isComplete && (
        <div className="mb-8">
          <div className="relative flex justify-between">
            {/* Progress Bar Background */}
            <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-[#e0d5c0]" />

            {/* Progress Bar Fill - Animated */}
            <div
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-[#d4a72c] transition-all duration-500 ease-in-out"
              style={{
                width:
                  currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
              }}
            />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  currentStep >= 1
                    ? "border-[#d4a72c] bg-[#d4a72c] text-white"
                    : "border-[#e0d5c0] bg-white text-[#5f4a37]"
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="h-5 w-5 transition-all duration-300" />
                ) : (
                  <span className="text-sm font-medium">1</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium transition-all duration-300 ${
                  currentStep === 1 ? "text-[#5f4a37]" : "text-[#5f4a37]/70"
                }`}
              >
                Primary Contact
              </span>
            </div>

            {/* Step 2 */}

            {!(maxTeamMembers == 1) && (
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    currentStep >= 2
                      ? "border-[#d4a72c] bg-[#d4a72c] text-white"
                      : "border-[#e0d5c0] bg-white text-[#5f4a37]"
                  }`}
                >
                  {currentStep > 2 ? (
                    <Check className="h-5 w-5 transition-all duration-300" />
                  ) : (
                    <span className="text-sm font-medium">2</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-all duration-300 ${
                    currentStep === 2 ? "text-[#5f4a37]" : "text-[#5f4a37]/70"
                  }`}
                >
                  Team Members
                </span>
              </div>
            )}

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  currentStep >= 3
                    ? "border-[#d4a72c] bg-[#d4a72c] text-white"
                    : "border-[#e0d5c0] bg-white text-[#5f4a37]"
                }`}
              >
                {currentStep > 3 ? (
                  <Check className="h-5 w-5 transition-all duration-300" />
                ) : (
                  <span className="text-sm font-medium">
                    {maxTeamMembers == 1 ? 2 : 3}
                  </span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium transition-all duration-300 ${
                  currentStep === 3 ? "text-[#5f4a37]" : "text-[#5f4a37]/70"
                }`}
              >
                Review & Payment
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Form Steps */}
      <Card
        className={`p-6 bg-white border-[#e0d5c0] shadow-md transition-opacity duration-300 ${
          animatingStep ? "opacity-50" : "opacity-100"
        }`}
      >
        {/* Step 1: Primary Contact */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Primary Contact Information
            </h2>
            <p className="text-[#5f4a37]/80 mb-6">
              Please enter details for the team leader/primary contact
            </p>

            <div className="space-y-6">
              <div>
                <Label className="my-2" htmlFor="name">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handlePrimaryContactChange}
                  placeholder="Enter your full name"
                  className={`bg-[#fffbf0] border-[#e0d5c0] focus-visible:ring-chart-4 ${
                    errors.name ? "border-red-300" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label className="my-2" htmlFor="phone">
                  Phone Number
                </Label>
                <div className="flex">
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePrimaryContactChange}
                    placeholder="Eg: 9876543210"
                    className={`flex-1 bg-[#fffbf0] border-[#e0d5c0] focus-visible:ring-chart-4 ${
                      errors.phone ? "border-red-300" : ""
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label className="my-2" htmlFor="usn">
                  USN Number
                </Label>
                <Input
                  id="usn"
                  name="usn"
                  value={formData.usn}
                  onChange={handlePrimaryContactChange}
                  placeholder="e.g., 1XX21XX000"
                  className={`bg-[#fffbf0] border-[#e0d5c0] focus-visible:ring-chart-4 ${
                    errors.usn ? "border-red-300" : ""
                  }`}
                />
                {errors.usn && (
                  <p className="text-red-500 text-sm mt-1">{errors.usn}</p>
                )}
              </div>

              <div>
                <Label className="my-2" htmlFor="college">
                  College Name
                </Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handlePrimaryContactChange}
                  placeholder="Enter your college/university name"
                  className={`bg-[#fffbf0] border-[#e0d5c0] focus-visible:ring-chart-4 ${
                    errors.collegeName ? "border-red-300" : ""
                  }`}
                />
                {errors.collegeName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.collegeName}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={handleNext}
                className="bg-[#5f4a37] hover:bg-[#4a3a2a] text-[#fff4d4]"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Team Members */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Team Members</h2>
            <p className="text-[#5f4a37]/80 mb-2">
              Add between {minTeamMembers} and {maxTeamMembers} team members
              (including yourself)
            </p>
            <div className="bg-[#fffbf0] p-3 rounded-md border border-[#e0d5c0] mb-6 flex items-center">
              <Info className="h-5 w-5 mr-2 text-chartring-chart-4" />
              <p className="text-sm">
                Team Members: {formData.teamMembers.length + 1}/{maxTeamMembers}
              </p>
            </div>

            {/* Primary contact summary */}
            <div className="mb-6 p-4 bg-[#fffbf0] rounded-md border border-[#e0d5c0]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Primary Contact (You)</h3>
                <span className="text-xs px-2 py-1 bg-chartring-chart-4/20 text-[#5f4a37] rounded-full">
                  Team Leader
                </span>
              </div>
              <p className="text-sm">{formData.name}</p>
              <p className="text-sm text-[#5f4a37]/70">
                {formData.usn} • {formData.collegeName}
              </p>
            </div>

            {/* Team members */}
            <div className="space-y-4 mb-6">
              {formData.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-[#fffbf0] rounded-md border border-[#e0d5c0] relative"
                >
                  <button
                    type="button"
                    onClick={() => removeTeamMember(member.id)}
                    className="absolute top-2 right-2 text-[#5f4a37]/70 hover:text-[#5f4a37]"
                    aria-label="Remove team member"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label
                        className={"my-2"}
                        htmlFor={`member-${member.id}-name`}
                      >
                        Full Name
                      </Label>
                      <Input
                        id={`member-${member.id}-name`}
                        value={member.name}
                        onChange={(e) =>
                          updateTeamMember(member.id, "name", e.target.value)
                        }
                        placeholder="Enter team member's full name"
                        className={`bg-white border-[#e0d5c0] focus-visible:ring-chart-4 ${
                          errors[`member-${member.id}-name`]
                            ? "border-red-300"
                            : ""
                        }`}
                      />
                      {errors[`member-${member.id}-name`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`member-${member.id}-name`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        className={"my-2"}
                        htmlFor={`member-${member.id}-usn`}
                      >
                        USN Number
                      </Label>
                      <Input
                        id={`member-${member.id}-usn`}
                        value={member.usn}
                        onChange={(e) =>
                          updateTeamMember(member.id, "usn", e.target.value)
                        }
                        placeholder="e.g., 1XX21XX000"
                        className={`bg-white border-[#e0d5c0] focus-visible:ring-chart-4 ${
                          errors[`member-${member.id}-usn`]
                            ? "border-red-300"
                            : ""
                        }`}
                      />
                      {errors[`member-${member.id}-usn`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`member-${member.id}-usn`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        className={"my-2"}
                        htmlFor={`member-${member.id}-college`}
                      >
                        College Name
                      </Label>
                      <Input
                        id={`member-${member.id}-college`}
                        value={member.collegeName}
                        onChange={(e) =>
                          updateTeamMember(
                            member.id,
                            "collegeName",
                            e.target.value
                          )
                        }
                        placeholder="Enter team member's college name"
                        className={`bg-white border-[#e0d5c0] focus-visible:ring-chart-4 ${
                          errors[`member-${member.id}-college`]
                            ? "border-red-300"
                            : ""
                        }`}
                      />
                      {errors[`member-${member.id}-college`] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[`member-${member.id}-college`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add member button */}
            <Button
              type="button"
              onClick={addTeamMember}
              variant="outline"
              className="w-full border-dashed border-chartring-chart-4 text-[#5f4a37] hover:bg-chartring-chart-4/10 mb-8"
              disabled={formData.teamMembers.length + 1 == maxTeamMembers}
            >
              + Add Team Member
            </Button>

            {errors.teamMembers && (
              <p className="text-red-500 text-sm mb-4">{errors.teamMembers}</p>
            )}

            <div className="flex justify-between">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="border-[#5f4a37] text-[#5f4a37] hover:bg-[#5f4a37]/10"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="bg-[#5f4a37] hover:bg-[#4a3a2a] text-[#fff4d4]"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Payment */}
        {currentStep === 3 && !isComplete && (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Review & Complete Registration
            </h2>
            <p className="text-[#5f4a37]/80 mb-6">
              Please review your registration details and complete payment
            </p>

            {/* Registration summary */}
            <div className="bg-[#fffbf0] rounded-md border border-[#e0d5c0] p-4 mb-6">
              <h3 className="font-medium mb-3">Registration Summary</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium">Primary Contact</h4>
                  <p className="text-sm">{formData.name}</p>
                  <p className="text-sm text-[#5f4a37]/70">{formData.phone}</p>
                  <p className="text-sm text-[#5f4a37]/70">
                    {formData.usn} • {formData.collegeName}
                  </p>
                </div>

                <Separator className="bg-[#e0d5c0]" />

                {!(maxTeamMembers == 1) && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium">
                        Team Members ({formData.teamMembers.length})
                      </h4>
                      {formData.teamMembers.length === 0 ? (
                        <p className="text-sm text-[#5f4a37]/70">
                          No additional team members
                        </p>
                      ) : (
                        <div className="space-y-2 mt-2">
                          {formData.teamMembers.map((member) => (
                            <div key={member.id} className="text-sm">
                              <p>{member.name}</p>
                              <p className="text-[#5f4a37]/70">
                                {member.usn} • {member.collegeName}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Separator className="bg-[#e0d5c0]" />
                  </>
                )}

                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Payment</span>
                  <span className="font-bold text-lg">₹{registration_fee}</span>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="mb-8">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={handleTermsChange}
                  className="mt-1 border-chartring-chart-4 data-[state=checked]:bg-chartring-chart-4 data-[state=checked]:text-white"
                />
                <Label htmlFor="terms" className="text-sm block">
                  I agree to the{" "}
                  <a href="#" className="text-chartring-chart-4 underline">
                    Rules and regulations
                  </a>{" "}
                  of the fest Swayam
                  {/* and consent to the processing of my personal information as described in the{" "} */}
                  {/* <a href="#" className="text-chartring-chart-4 underline">
                    privacy policy
                  </a> */}
                  .
                </Label>
              </div>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1 ml-6">{errors.terms}</p>
              )}
            </div>

            <div className="flex justify-between">
              {!(isFormSubmitted || registeredBefore) && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="border-[#5f4a37] text-[#5f4a37] hover:bg-[#5f4a37]/10"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}
              {(isFormSubmitted || registeredBefore) && (
                <Button
                  onClick={handleReset}
                  variant="destructive"
                  disabled={isResetting}
                >
                  <Trash2 className="h-4 w-4" />
                  Reset Registration
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#5f4a37] hover:bg-[#4a3a2a] text-[#fff4d4]"
              >
                {isSubmitting ? "Processing..." : "Complete Payment"}
              </Button>
              <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
              />
            </div>
          </div>
        )}

        {/* Success Screen */}
        {isComplete && (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-[#d4a72c]/20 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-[#d4a72c]" />
              </div>
              <h2 className="text-2xl font-bold mt-4 mb-2">
                Registration Complete!
              </h2>
              <p className="text-[#5f4a37]/80">
                Thank you for registering for the event. We look forward to
                seeing you there!
              </p>
            </div>

            <div className="bg-[#fffbf0] rounded-md border border-[#e0d5c0] p-6 mb-6 text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Registration Details</h3>
                <span className="text-xs px-2 py-1 bg-[#d4a72c]/20 text-[#5f4a37] rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#5f4a37]/70">Event</p>
                  <p className="font-medium">{name}</p>
                </div>

                {/* <div>
                  <p className="text-sm text-[#5f4a37]/70">Date & Time</p>
                  <p className="font-medium"></p>
                </div> */}

                {/* <div>
                  <p className="text-sm text-[#5f4a37]/70">Venue</p>
                  <p className="font-medium">
                    Main Auditorium, University Campus
                  </p>
                </div> */}

                <div>
                  <h4 className="text-sm font-medium">Primary Contact</h4>
                  <p className="text-sm ml-1">{formData.name}</p>
                  <p className="text-sm ml-1 text-[#5f4a37]/70">
                    {formData.phone}
                  </p>
                  <p className="text-sm ml-1 text-[#5f4a37]/70">
                    {formData.usn} • {formData.collegeName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#5f4a37]/70">Team Size</p>
                  <p className="font-medium">
                    {formData.teamMembers.length
                      ? "Solo Event"
                      : `${formData.teamMembers.length + 1} members`}
                  </p>
                </div>
                {!(maxTeamMembers == 1) && (
                  <>
                    <div>
                      <h4 className="text-sm font-medium">
                        Team Members ({formData.teamMembers.length})
                      </h4>
                      {formData.teamMembers.length === 0 ? (
                        <p className="text-sm text-[#5f4a37]/70">
                          No additional team members
                        </p>
                      ) : (
                        <div className="space-y-2 mt-2">
                          {formData.teamMembers.map((member) => (
                            <div key={member.id} className="text-sm">
                              <p>{member.name}</p>
                              <p className="text-[#5f4a37]/70">
                                {member.usn} • {member.collegeName}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Separator className="bg-[#e0d5c0]" />
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={"/profile"}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-[#5f4a37] hover:bg-[#4a3a2a] text-[#fff4d4]"
                )}
              >
                Go to profile
              </Link>
            </div>
            <p className="opacity-65 text-sm mt-1">
              You can view all the events you have registered for in the profile
              page.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
