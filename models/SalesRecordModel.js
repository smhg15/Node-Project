const mongoose = require('mongoose');

const SalesRecordSchema = new mongoose.Schema({
    product: String,
    unitPrice: Number,
    quantitySold: Number
},{
    timestamps: true
})

const SalesRecordModel = mongoose.model('Sales',SalesRecordSchema)

module.exports = SalesRecordModel