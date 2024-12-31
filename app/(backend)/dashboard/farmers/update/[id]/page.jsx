
import FormHeader from "@/components/forms/FormHeader";
import NewFarmerForm from "@/components/data-display/Forms/NewFarmerForm";
import { getData } from "@/lib/getData";

export default async function UpdateFarmer({params:{id}}) {
  const farmer = await getData(`farmer/${id}`)

  return (
    <div>
      <FormHeader title="Update Farmer" />
        <NewFarmerForm updateData={farmer}/>
    </div>
  );
}
