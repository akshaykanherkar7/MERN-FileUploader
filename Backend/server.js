const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4} = require('uuid');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
});

const filterpath = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage, filterpath});

const { connection } = require('./Config/connectionConfig.js');
const imgaeRouter = require('./Routes/ImageUploadRoute');

app.use('/file', upload.single('photo'), imgaeRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
    console.log("Server listening on port " + process.env.PORT)
})