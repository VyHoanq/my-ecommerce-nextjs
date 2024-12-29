'use client'

import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function MultiImageInput({
  label,
  imageUrls=[],
  setImageUrls,
  className = "sm:col-span-2",
  endpoint = "",
}) {
  function handleImageRemove(imageIndex) {
    const updatedImages = imageUrls.filter(
      (image, index) => index !== imageIndex
    )
    setImageUrls(updatedImages)
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium text-gray-900 leading-6 mb-2 dark:text-slate-50"
        >
          {label}
        </label>

      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((imageUrl, i) => {
            return (
              <div key={i} className="relative mb-6">
                <button
                  onClick={() => handleImageRemove(i)}
                  className="absolute -top-4 -right-2 bg-slate-100 text-slate-800 rounded-full p-1">
                  <XCircle className="text-slate-500" />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-40 object-cover"
                />
              </div>
            )
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log(res)
            const urls = res.map((item) => item.url)
            setImageUrls(urls)
            console.log(urls)
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Image Upload Failed, Try Again")
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}