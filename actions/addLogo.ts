"use server";

import connectDB from "@/DB/connectDB";
import { Logos } from "@/DB/logo-model";
import { revalidatePath } from "next/cache";

export default async function addLogo(name: string, image: string) {
    try {
        await connectDB();
        await Logos.create({ name, image });
    } catch (error) {
        if (error instanceof Error) return { error: error.message };
    } finally {
        revalidatePath("/");
    }
}
