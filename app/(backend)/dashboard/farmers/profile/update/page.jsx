import PageHeader from "@/components/backend/layout/PageHeader";
import ListProfileForm from "@/components/data-display/Forms/ListProfileForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export default async function FarmerProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const { user } = session;

    return (
        <div>
            <PageHeader
                title="Farmer Profile"
                href="/dashboard/farmers/profile/update"
                linkTitle="Update Farmer Profile"
            />
            <ListProfileForm userId={user.id} />
        </div>
    );
}