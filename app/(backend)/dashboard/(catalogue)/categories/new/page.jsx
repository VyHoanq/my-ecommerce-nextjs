'use client'
export const dynamic = 'force-dynamic'
import NewCategoryForm from "@/components/data-display/Forms/NewCategoryForm";
import FormHeader from "@/components/forms/FormHeader";

export default function NewCategory() {
 
  return (
    <div>
      <FormHeader title="New category" />
      <NewCategoryForm/>
    </div>
  );
}
