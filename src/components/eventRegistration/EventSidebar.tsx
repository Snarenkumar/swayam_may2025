import { Check } from "lucide-react";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";
import { Event } from "@/types/event";

const EventSidebar = ({
  event: {
    maxTeamMembers,
    minTeamMembers,
    name,
    registration_fee,
    rules,
    date_time,
  },
  clubName,
}: {
  event: Event;
  clubName: string;
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <Card className="bg-[#5f4a37] text-[#fff4d4] p-6 shadow-md mb-6">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-[#fff4d4]/80">Organized by {clubName}</p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-[#d4a72c]/20 p-2 rounded-md mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#d4a72c]"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Date and Time</p>
                <p className="text-sm text-[#fff4d4]/80">{date_time}</p>
              </div>
            </div>

            {/* <div className="flex items-start">
              <div className="bg-[#d4a72c]/20 p-2 rounded-md mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#d4a72c]"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Main Auditorium</p>
                <p className="text-sm text-[#fff4d4]/80">
                  University Campus, Bangalore
                </p>
              </div>
            </div> */}

            <div className="flex items-start">
              <div className="bg-[#d4a72c]/20 p-2 rounded-md mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#d4a72c]"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Registration Fee</p>
                <p className="text-sm text-[#fff4d4]/80">₹{registration_fee}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#d4a72c]/20 p-2 rounded-md mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#d4a72c]"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Team Size</p>
                <p className="text-sm text-[#fff4d4]/80">
                  {maxTeamMembers == minTeamMembers
                    ? minTeamMembers == 1
                      ? "Solo event"
                      : maxTeamMembers + "members per team"
                    : `${minTeamMembers}-${maxTeamMembers} members per team`}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-[#fff4d4]/20" />

          <div>
            <h3 className="font-medium mb-2">Event Rules</h3>
            <ul className="space-y-2 text-sm text-[#fff4d4]/90">
              {rules.map((rule) => (
                <li key={rule} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-[#d4a72c]" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </Card>
        {/* 
        <Card className="p-4 border-[#e0d5c0] bg-white shadow-md">
          <h3 className="font-medium mb-2">Need Help?</h3>
          <p className="text-sm text-[#5f4a37]/80 mb-3">
            If you have any questions or need assistance with your registration,
            please contact us.
          </p>
          <div className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-[#d4a72c]"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center text-sm mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-[#d4a72c]"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>support@techsymposium.com</span>
          </div>
        </Card> */}
      </div>
    </div>
  );
};
export default EventSidebar;
