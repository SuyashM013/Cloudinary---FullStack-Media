const express = require("express");
const app = express();

const multer = require("multer");

require("dotenv").config();

const cors = require("cors");
app.use(cors());

const connectDB = require("./config/mongo_db");
connectDB();

const indexRouter = require('./routes/index_route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Cloudinary FullStack Backend!");
});

app.use("/api", indexRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});