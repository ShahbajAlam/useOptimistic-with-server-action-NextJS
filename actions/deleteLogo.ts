"use server";

import connectDB from "@/DB/connectDB";
import { Logos } from "@/DB/logo-model";
import { revalidatePath } from "next/cache";

export default async function deleteLogo(_id: string) {
    try {
        await connectDB();
        await Logos.findByIdAndDelete(_id);
    } catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
    } finally {
        revalidatePath("/");
    }
}
