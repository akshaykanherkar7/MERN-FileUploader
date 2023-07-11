const mongoose = require('mongoose');

const connection = mongoose.connect(`${process.env.CONNECTION_STRING}`);

module.exports = {
    connection
}