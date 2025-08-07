import { Order } from "../Models/order.model.js";
import { Menu } from "../Models/Menu.model.js";
import User from "../Models/user.model.js"
import jwt from 'jsonwebtoken';


//Create order :
export let createOrder = async (req, res) => {
  try {
   let token = req.cookies.token;
    if (!token) {
      return res.json({
        massage: "Token not available or token got expired ...",
        success: false
      })
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    if (!user) {
      return res.json({
        massage: "user Id not found ..",
        success: false
      })
    }

    let orderItem = [];
    let totalPrice = 0;
    
    let {items} = req.body;
    if(!items || !Array.isArray(items) || items === 0 ){
      return res.json({
        massage : "Items must be array ..",
        success : false
      })
    }


    for (let item of items){
      let {menuItem , quantity } = item ;

      if(!menuItem || !quantity || quantity < 1 ){
        return res.json({
        massage : "All fields are required (quantity must be 1 atleast) ..",
        success : false
      })
      }

      let menu = await Menu.findById(menuItem);
      if(!menu){
        return res.json({
          massage : "Menu not found ..",
          success : false
        })
      }
      
      if(menu.available === false){
        return res.status(404).json({
          massage : `${menu.name} is not available ..`,
          success : false
        })
      }
      

      // With GST :
      // totalPrice +=( menu.price * quantity ) + (menu.price * quantity * .18)

      //WithOut GST :
      totalPrice +=( menu.price * quantity );

      orderItem.push({
        menuItem : menu.id,
        quantity
      })
    }

    let newOrder = await Order.create({
      user : user,
      items : orderItem,
      totalPrice
    })

    // Populate response
    let populatedOrder = await Order.findById(newOrder.id)
      .populate("user", "name email role")
      .populate("items.menuItem", "name price available");

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: populatedOrder,
    })

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}


//Get Order By ID :
export let getOrderById = async (req , res) => {
  try {
    let id = req.params.id;
    if(!id){
      return res.json({
        massage : "Menu id not found ..",
        success : false
      })
    }

    let menu = await Order.findById(id);
    if(!menu){
      return res.json({
        massage : "Menu id not found ..",
        success : false
      })
    }

    return res.json({
      massage : "The Order ..",
      order : menu
    })
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}


//Get all Order :
export let getAllOrder = async (req , res) => {
  try {
    let menu = await Order.find();
    if(!menu){
      return res.json({
        massage : "Menu id not found ..",
        success : false
      })
    }

    return res.json({
      massage : "The Order ..",
      order : menu
    })
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}


//Delete Order By ID :
export let deleteOrderById = async (req , res) => {
  try {
    let id = req.params.id;
    if(!id){
      return res.json({
        massage : "Menu id not found ..",
        success : false
      })
    }

    let menu = await Order.findByIdAndDelete(id);
    if(!menu){
      return res.json({
        massage : "Menu id not found ..",
        success : false
      })
    }

    return res.json({
      massage : "The Order deleted succesfully..",
      success : true
    })

  } catch (error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}