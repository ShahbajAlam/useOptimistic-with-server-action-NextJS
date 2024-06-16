import { model, models, Schema } from "mongoose";

const LogoSchema = new Schema(
    {
        name: String,
        image: String,
    },
    { timestamps: true }
);

export const Logos = models.logos || model("logos", LogoSchema);
