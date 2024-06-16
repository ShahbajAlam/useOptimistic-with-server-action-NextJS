"use client";

import deleteLogo from "@/actions/deleteLogo";
import showToast from "@/utils/showToast";

export default function DeleteButton({
    _id,
    addOptimisticLogos,
}: {
    _id: string;
    addOptimisticLogos: any;
}) {
    const handleRemove = async (_id: string) => {
        addOptimisticLogos({
            type: "remove",
            payload: { _id },
        });
        const res = await deleteLogo(_id);

        if (res?.error) showToast(res.error);
    };

    return (
        <form action={() => handleRemove(_id)}>
            <button
                type="submit"
                className="absolute top-2 right-2 text-red-500 font-bold text-2xl"
            >
                x
            </button>
        </form>
    );
}
