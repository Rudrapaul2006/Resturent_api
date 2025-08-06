  import mongoose from 'mongoose';

  const orderSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Refers to the User model
    required: true,
  },
  // restaurantId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Restaurant", // Optional, if you have a Restaurant model
  //   required: true,
  // },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu", // Refers to the Menu model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  } , { timestamps : true });

  export let  Order = mongoose.model("Order", orderSchema);
