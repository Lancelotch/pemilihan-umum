const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const polling = require('./routes/polling');

//DB config
require('./config/db');

const app = express();

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Enable CORS
app.use(cors());

app.use('/polling', polling);

const port = 5000;

app.listen(port, ()=> {
    console.log(`Server has started from port : ${port}`);
})