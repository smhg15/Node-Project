const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    product: String,
    unitCost: Number,
    quantity: Number
},{
    timestamps: true
})

const StockModel = mongoose.model('Stock',StockSchema)

module.exports = StockModel