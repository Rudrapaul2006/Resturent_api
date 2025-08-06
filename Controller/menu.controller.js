import { Menu } from "../Models/Menu.model.js";


//Create Menu :
export let addMenu = async (req, res) => {
    try {
    let newMenus = req.body; // expecting array of menu items
    let insertedMenus = [];

    for (let item of newMenus) {
      let exists = await Menu.findOne({ name: item.name });

      if (!exists) {
        // Insert the item if it does not exist
        let newItem = new Menu(item);
        await newItem.save();
        insertedMenus.push(newItem);
      }
    }

    if (insertedMenus.length === 0) {
      return res.status(400).json({
        message: "All items or (This item) already exist in the database ..",
        success: false,
      });
    }

    return res.status(201).json({
      message: "New menu items added.",
      success: true,
      menu: insertedMenus,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
}

//Update Menu By id :
export let updateMenu = async (req, res) => {
    try {

        let menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.json({
                massage: "can't find menu ..",
                success: false
            })
        }

        let { name, description, price } = req.body;
        if (!name && !price && !description) {
            return res.json({
                massage: "Update atleast one thing ( name / description / price ) ..",
                success: false
            })
        }

        if (name) menu.name = name;
        if (description) menu.description = description;
        if (price) menu.price = price;
        menu.save();

        return res.json({
            massage: "Menu Updated ..",
            Menu: menu,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "Internal server error ..",
            success: false
        })
    }
}


//Get all menu item :
export let getAllMenu = async (req, res) => {
    try {
        let menu = await Menu.find();
        if (!menu) {
            return res.json({
                massage: "can't find menu ..",
                success: false
            })
        }

        return res.json({
            massage: "Menu's ..",
            Menu: menu,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "Internal server error ..",
            success: false
        })
    }
}


//Get menu ijtem by id :
export let getMenuById = async (req, res) => {
    try {
        let menu = await Menu.findById(req.params.id);
        if(!menu){
            return res.json({
                massage : "This menu is not available ..",
                success : false
            })
        }

        return res.json({
            massage: "Found the menu ..",
            Menu: menu,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "Internal server error ..",
            success: false
        })
    }
}

//Delete menu by id :
export let deleteMenu = async (req, res) => {
    try {
        let menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.json({
                massage: "can't find menu ..",
                success: false
            })
        }

        return res.json({
            massage: "Menu Deleted Succesfully ..",
            Menu: { name: menu.name, description: menu.description, price: menu.price },
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.json({
            massage: "Internal server error ..",
            success: false
        })
    }
}