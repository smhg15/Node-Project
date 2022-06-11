const express = require('express');
const { getAllProductsController , createProductController , editProductController , deleteProductController } = require('../controllers/ProductController');



const app = express.Router()

app.get("/",getAllProductsController)

app.post("/",createProductController)

app.put("/",editProductController)

app.delete("/",deleteProductController)


module.exports = app;