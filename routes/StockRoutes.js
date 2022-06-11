const express = require('express');
const { getTheStockProductsController , createStockController , editStockController , deleteStockController } = require('../controllers/StockController');



const app = express.Router()

app.get("/",getTheStockProductsController)

app.post("/",createStockController)

app.put("/",editStockController)

app.delete("/",deleteStockController)


module.exports = app;