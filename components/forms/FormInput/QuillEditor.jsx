
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Import CSS từ react-quill-new

// Dynamic import cho ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function QuillEditor({ label, value, onChange, className="sm:col-span-2" }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "color", "image"],
            [{ "code-block": true }],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color",
    ];

    return (
        <div className={className}>
            <label className="block text-sm font-medium leading-6 dark:text-white text-black mb-2 ">
                {label}
            </label>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
            />
        </div>
    );
}