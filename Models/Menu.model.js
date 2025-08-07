import mongoose from "mongoose";

let menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Menu item name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: String,
            enum: ["starter", "main course", "dessert", "drinks", "others"],
            // default: "main course", // ✅ fixed
        },
        image: {
            type: String,
            default: "",
        },
        available: {
            type: Boolean,
            enum : ["true" , "false"],
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export let Menu = mongoose.model("Menu", menuSchema);
