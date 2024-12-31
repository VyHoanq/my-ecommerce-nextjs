"use client";

import ImageInput from "@/components/forms/FormInput/Imageinput";
import SubmitButton from "@/components/forms/SubmitButton";
import TextInput from "@/components/forms/FormInput/Textinput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";


export default function NewUserForm({ updateData = {}, userId }) {
    const [imageUrl, setImageUrl] = useState(updateData?.profileImage || "");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...updateData,
        },
    });

    function redirect() {
        router.push("/dashboard/profile");
    }

    async function onSubmit(data) {
        data.profileImage = imageUrl;
        data.userId = userId;

        if (updateData?.id) {
            makePutRequest(
                setLoading,
                `api/users/${userId}/profile`,
                data,
                "Profile",
                redirect
            );
        } else {
            makePostRequest(
                setLoading,
                `api/users/${userId}/profile`,
                data,
                "Profile",
                redirect
            );
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <TextInput
                    label="First Name"
                    name="name"
                    register={register}
                    errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="Username"
                    name="username"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="Last Name"
                    name="lastName"
                    register={register}
                    errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="Email"
                    name="email"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="Phone"
                    name="phone"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="Street Address"
                    name="streetAddress"
                    register={register}
                    errors={errors}
                    className="w-full"
                />
                <TextInput
                    label="City"
                    name="city"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="Country"
                    name="country"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <TextInput
                    label="District"
                    name="district"
                    register={register}
                    className="w-full"
                    errors={errors}
                />
                <ImageInput
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="profileImageUploader"
                    label="Profile Image"
                />
            </div>
            <SubmitButton
                isLoading={loading}
                buttonTitle={updateData?.id ? "Update Profile" : "Create Profile"}
                loadingButtonTitle={`${updateData?.id ? "Updating" : "Creating"} Profile...`}
            />
        </form>
    );
}
