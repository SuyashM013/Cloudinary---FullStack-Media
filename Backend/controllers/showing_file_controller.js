const User = require("../models/user_model");

module.exports.file_showing = async (req,res, next) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        console.log("Error Fetching Users: ", err);
        res.status(500).json({Error: "Failed to Fetch users, Try Refreshing the Page"})
    }
}