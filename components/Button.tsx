"use client";

import { useFormStatus } from "react-dom";

export default function Button() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-gray-300 text-gray-800"
        >
            {pending ? "ADDING" : "ADD"}
        </button>
    );
}
