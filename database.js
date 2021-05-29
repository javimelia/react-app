const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect( process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then (db => console.log("DB is connected"))
    .catch (error => console.error(error));
 
module.exports = mongoose;


