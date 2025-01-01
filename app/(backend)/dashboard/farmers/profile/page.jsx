import PageHeader from "@/components/backend/layout/PageHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import ListFarmerForm from "@/components/data-display/Forms/ListFarmerForm";

export default async function FarmerProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) return;

    const { user } = session;

    return (
        <div>
            <PageHeader
                title="Seller Profile"
                href="/dashboard/profile/update"
                linkTitle="Update Seller Profile"
            />
            <ListFarmerForm userId={user.id} />
        </div>
    );
}
