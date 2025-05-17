import ChatDashboard from "@/components/admin/chats/ChatDashboard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const authorizedEmails = ["varun1492006@gmail.com", "hameemshan@gmail.com"];

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!(session?.user?.email && authorizedEmails.includes(session.user.email)))
    return <p className="mt-12 text-xl font-medium">Unauthorized</p>;
  return <ChatDashboard />;
}
