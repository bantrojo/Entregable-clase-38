const express = require('express');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const User = require("./models/User.js");
const session = require('express-session');
require('dotenv').config();

const app = express();


const admin = true;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', userRouter);



app.get('/', (req, res) => {
    res.send('connected');
})

//conectar base de datos
const URL = process.env.URL;

mongoose.connect(URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) throw new Error("unable to coneect");
    console.log("connected to database successfully");
});


const PORT = process.env.PORT || 8080
// app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`));
app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`));