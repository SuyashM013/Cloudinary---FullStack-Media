const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
// const upload = multer({ dest: "./uploads" });
const app = express();
const connectDB = require("./config/mongo_db");
connectDB();

app.use(cors());

const User = require("./models/user_model");
const fs = require("fs");

const upload = require("./utils/multer_upload"); // Import the multer configuration from the utils folder

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



app.get("/", (req, res) => {
    res.send("Welcome to Cloudinary FullStack Backend!");
});


// Single image upload endpoint
app.post("/api/upload", upload.single('image'), async (req, res) => {

    // Upload the image to Cloudinary using the file path from multer and handle the response accordingly

    const uploadResult = await cloudinary.uploader
        .upload(
            req.file.path
        )
        .catch((error) => {
            console.log(error);
        });

    console.log("Received file:", req.file); // Log the uploaded file information
    console.log("Upload result:", uploadResult); // Log the uploaded file information

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        imageUrl: uploadResult.secure_url
    });

    newUser.save();

    console.log("User Created", newUser);


    // Delete the uploaded file from the server after uploading to Cloudinary to free up server storage and prevent accumulation of files on the server. This is done using the fs module to unlink (delete) the file from the server's filesystem after it has been successfully uploaded to Cloudinary.
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('File could not be deleted or does not exist.');
        }
        console.log(`File ${req.file.filename} deleted successfully.`);
    });

    res.json({ image_url: uploadResult.secure_url });

});

app.get("/api/get-users", async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});