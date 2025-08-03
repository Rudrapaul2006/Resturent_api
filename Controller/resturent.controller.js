import Restaurant from "../Models/resturent_details.model.js";


//Creating restuent details :
export let resturentDetails = async (req, res) => {
    try {
        let { name, adress, fooditems, phone, openinghours } = req.body;
        if (!name || !adress || !fooditems || !phone || !openinghours) {
            return res.json({
                massage: "All fields are required ..",
                success: true
            })
        }

        let adressofresturent = await Restaurant.findOne({ adress });
        let nameofresturent = await Restaurant.findOne({ name })
        if (adressofresturent, nameofresturent) {
            return res.json({
                massage: "Resturent name and adress already exists ...",
                success: false
            })
        }

        let details = await Restaurant.create({ name, adress, fooditems, phone, openinghours });
        return res.json({
            massage: "Resturent details created successfully ...",
            details: details,
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({
            massage: "Internal server error ...",
            success: false
        })
    }
}

//Get Resturent Details :
export let getResturentDetails = async (req, res) => {

    // try {
    //     let allResturents = await Restaurant.find(); // fetch all entries
    //     return res.status(200).json({
    //         message: "Restaurant details fetched successfully",
    //         data: allResturents,
    //         success: true
    //     });
    // } catch (error) {
    //     console.error("Error fetching restaurant details:", error);
    //     return res.status(500).json({
    //         message: "Failed to fetch restaurant details",
    //         success: false
    //     });
    // }

    try {
        let name = req.params.name;
        let restaurant = await Restaurant.findOne({ name });

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Restaurant fetched successfully",
            data: restaurant,
            success: true
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }

}


//Update Resturent Details :
export let updateResturentDetails = async (req, res) => {
    try {
        let { name } = req.params;

        let { fooditems, phone, openinghours } = req.body;
        if (!fooditems && !phone && !openinghours) {
            return res.status(400).json({
                message: "At least one field (fooditems, phone, openinghours) is required to update ( you cant change adress and name )",
                success: false
            });
        }

        let resturent = await Restaurant.findOneAndUpdate(
            { name },
            { fooditems, phone, openinghours }
        )

        if (!resturent) {
            return res.status(404).json({
                message: "Restaurant not found with that name or one filed not updated , please update At least one field",
                success: false
            })
        }

        return res.status(200).json({
            message: "Restaurant updated successfully (can't change name or adress )",
            updated_data: resturent,
            success: true
        })

    } catch (error) {
        console.error("Error updateing restaurant details:", error);
        return res.status(500).json({
            message: "Server Error ",
            success: false
        });
    }
}


//Resturent Details Delete :
export let deleteResturent = async (req, res) => {
    try {
        let name = req.params.name;
        let resturent = await Restaurant.findOneAndDelete({ name });

        if (!resturent) {
            return res.status(404).json({
                message: "Restaurant not found",
                success: false
            });
        }

        return res.json({
            message: "Restaurant details deleted successfully.",
            deleted_resturent: {name : resturent.name , adress : resturent.adress},
            success: true
        })

    } catch (error) {
        console.error("Error updateing restaurant details:", error);
        return res.status(500).json({
            message: "Server Error ",
            success: false
        })
    }
}