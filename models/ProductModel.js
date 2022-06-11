const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
    supplier: String
},{
    timestamps: true
})

const ProductModel = mongoose.model('Product',ProductSchema)

module.exports = ProductModel