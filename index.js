const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const productRoutes = require('./routes/ProductRoutes');
const stockRoutes = require('./routes/StockRoutes');
const salesRecordRoutes = require('./routes/SalesRecordRoutes');
const userRoutes = require('./routes/UserRoutes');

const app = express()
const PORT = process.env.PORT || 5000


//WEBSERVER CONFIG
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//WEBSERVER ROUTES
app.use("/product",productRoutes)
app.use("/stock",stockRoutes)
app.use("/sales",salesRecordRoutes)
app.use("/user",userRoutes)


//DB CONNECTION
mongoose.connect("mongodb://localhost:27017/test")
.then(()=>{
    console.log("Connected to mongodb")
})


//WEBSERVER LISTEN
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})