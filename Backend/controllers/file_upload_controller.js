const upload = require("../utils/multer_upload"); // Import the multer configuration from the utils folder
const cloudinary = require("cloudinary").v2;

const User = require('../models/user_model')
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


module.exports.file_upload = async (req, res, next) => {
    // res.send("upload file");
    try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path).catch((err) => {
            //console.log(err);
            return res.status(500).json({ Error: "Failed to upload file, Try Again" })
        })

        // console.log("Received file:", req.file); // Log the uploaded file information
        // console.log("Upload result:", uploadResult); // Log the uploaded file information

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

    } catch (err) {
        console.log("Error uploading file: ", err);
        res.status(500).json({ Error: "Failed to upload file, Try Again" })

    }
}