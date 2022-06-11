const Product = require('../models/ProductModel');
const validator = require('validator');

const getAllProductsController = async (req, res) => {
    try {
        const product = await Product.find()
        res.send(product)
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const createProductController = async (req, res) => {
    const {name, price, description, image, supplier} = req.body
    if (!validator.isAlpha(name, description, image, supplier)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(price, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const new_product = new Product(req.body)
        await new_product.save()
        res.send("A new product was created")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const editProductController = async (req, res) => {
    const { id, name, price, description, image, supplier} = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isAlpha(name, description, image, supplier)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(price, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const product = await Product.findById(id)
        await product.update({$set: { name, price, description, image, supplier}})
        res.send("the product was updated successfully")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const deleteProductController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("invalid parameters")
        return
    }

    try {
        const deleted = await Product.findByIdAndDelete(id)
        if (deleted) {
            res.send("The product was deleted")
        } else {
            res.status(400).send("The product does not exist / It cannot be deleted")
        }
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

module.exports = {
    getAllProductsController,
    createProductController,
    editProductController,
    deleteProductController
}