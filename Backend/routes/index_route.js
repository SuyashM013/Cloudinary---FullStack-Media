const express = require('express');
const router = express.Router();
const {file_upload} = require('../controllers/file_upload_controller')
const {file_showing} = require('../controllers/showing_file_controller')

const upload = require("../utils/multer_upload"); // Import the multer configuration from the utils folder


router.get('/', (req, res)=> {
    res.send('Working API');
})

router.post('/upload', upload.single('image'), file_upload);
router.get('/get-users', file_showing);

module.exports = router;