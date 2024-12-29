"use client";
import FormHeader from "@/components/forms/FormHeader";
import React, { useState } from "react";
import NewFarmerForm from "@/components/data-display/NewFarmerForm";

export default function NewFarmer() {

  return (
    <div>
      <FormHeader title="New Farmer" />
        <NewFarmerForm/>
    </div>
  );
}
