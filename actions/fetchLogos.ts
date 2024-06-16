"use server";

import connectDB from "@/DB/connectDB";
import { Logos } from "@/DB/logo-model";

export default async function fetchLogos() {
    try {
        await connectDB();
        const logos = await Logos.find({}).select(["_id", "name", "image"]);
        return logos;
    } catch (error) {
        console.log(error);
    }
}
