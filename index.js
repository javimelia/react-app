const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');

const { mongoose } = require('./database');

const app = express()

require('dotenv').config();


// Settings
app.set('port', process.env.PORT);

// Middlewares (funciones que se ejecutan antes de que lleguen las rutas)
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use('/api/bike',require('./routes/bike.routes'))
app.use('/api/user',require('./routes/user.routes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});