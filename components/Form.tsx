"use client";

import addLogo from "@/actions/addLogo";
import Button from "./Button";
import { useEffect, useOptimistic, useState } from "react";
import showToast from "@/utils/showToast";
import DeleteButton from "./DeleteButton";

type Logo = { _id?: any; name: string; image: string };

export default function Form({ data }: { data: string }) {
    const logos = JSON.parse(data) as Logo[];

    const updateFn = (
        state: Logo[],
        action: {
            type: "add" | "remove";
            payload: { _id?: string; name?: string; image?: string };
        }
    ): Logo[] => {
        switch (action.type) {
            case "add":
                return [
                    ...state,
                    {
                        name: action.payload.name as string,
                        image: action.payload.image as string,
                    },
                ];
            case "remove":
                return state.filter((item) => item._id !== action.payload._id);
            default:
                return state;
        }
    };

    const [image, setImage] = useState<File>();
    const [base64, setBase64] = useState("");
    const [optimisticLogos, addOptimisticLogos] = useOptimistic(
        logos,
        updateFn
    );

    const handleForm = async (f: FormData) => {
        const name = f.get("name") as string;
        addOptimisticLogos({
            type: "add",
            payload: {
                name: f.get("name") as string,
                image: base64,
            },
        });
        const res = await addLogo(name, base64);

        if (res?.error) showToast(res.error);
    };

    useEffect(() => {
        if (!image) return;

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event) => {
            setBase64(event.target?.result as string);
        };
    }, [image]);

    return (
        <div className="w-[50%] mx-auto">
            <form
                action={handleForm}
                className="flex flex-col gap-2 py-4 px-8 rounded-lg bg-slate-700"
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="text-black"
                />

                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => {
                        if (e.target.files) setImage(e.target.files[0]);
                    }}
                    accept="image/png"
                />
                <Button />
            </form>

            <ul className="grid grid-cols-3 gap-4 my-2">
                {optimisticLogos.map((logo) => (
                    <li
                        key={logo._id}
                        className="bg-slate-700 p-4 rounded-lg flex flex-col gap-4 text-center relative"
                    >
                        <h1>{logo.name}</h1>
                        <img
                            src={logo.image}
                            alt={logo.name}
                            className="w-32 aspect-square block mx-auto"
                        />

                        <DeleteButton
                            _id={logo._id}
                            addOptimisticLogos={addOptimisticLogos}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
