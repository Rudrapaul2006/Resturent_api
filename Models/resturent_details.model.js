import mongoose from "mongoose";

let restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    adress: {
        type: String,
        required: true
    },
    fooditems: {
        type: [String], // e.g., ["Pizza", "Burger", "Biryani"]
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    openinghours: {
        type: String, // e.g., "10:00 AM - 10:00 PM"
        required: true
    }
}, { timestamps: true });

let Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
