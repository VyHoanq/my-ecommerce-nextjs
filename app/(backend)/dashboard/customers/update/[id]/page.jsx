import FormHeader from "@/components/forms/FormHeader";
import { getData } from "@/lib/getData";
import CustomerForm from "@/components/data-display/NewCustomerForm";

export default async function UpdateCustomer({ params: { id } }) {
  // Add error handling and logging
  try {
    console.log("Fetching user with ID:", id);
    const user = await getData(`api/customers/${id}`);

    if (!user) {
      throw new Error("User not found");
    }

    return (
      <div>
        <FormHeader title="Update Customer" />
        <CustomerForm user={user} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="text-center p-4">
        <h2 className="text-red-500">Error loading customer data</h2>
        <p>{error.message}</p>
      </div>
    );
  }
}
