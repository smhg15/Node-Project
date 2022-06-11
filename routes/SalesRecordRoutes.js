const express = require('express');
const { getAllSalesRecordController , createASalesRecordController , editASalesRecordController , deleteASalesRecordController } = require('../controllers/SalesRecordController');



const app = express.Router()

app.get("/",getAllSalesRecordController)

app.post("/",createASalesRecordController)

app.put("/",editASalesRecordController)

app.delete("/",deleteASalesRecordController)


module.exports = app;
