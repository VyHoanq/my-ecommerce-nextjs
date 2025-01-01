"use client";
import FormHeader from "@/components/forms/FormHeader";
import React, { useState } from "react";
import NewFarmerForm from "@/components/data-display/Forms/NewFarmerForm";

export default function NewFarmer() {

  return (
    <div>
      <FormHeader title="New Seller" />
      <NewFarmerForm />
    </div>
  );
}
