const Stock = require('../models/StockModel');
const validator = require('validator');

const getTheStockProductsController = async (req, res) => {
    try {
        const stock = await Stock.find()
        res.send(stock)
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const createStockController = async (req, res) => {
    const { product, unitCost, quantity } = req.body
    if (!validator.isAlpha(product)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(unitCost, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isInt(quantity, {gt: 0})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const new_product = new Product(req.body)
        await new_product.save()
        res.send("A new stock was created")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const editStockController = async (req, res) => {
    const { product, unitCost, quantity } = req.body
    if (!validator.isAlpha(product)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(unitCost, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isInt(quantity, {gt: 0})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const product = await Product.findById(id)
        await product.update({ $set: { product, unitCost, quantity } })
        res.send("the stock was updated successfully")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const deleteStockController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("invalid parameters")
        return
    }

    try {
        const deleted = await Product.findByIdAndDelete(id)
        if (deleted) {
            res.send("The product stock was deleted from the record database")
        } else {
            res.status(400).send("The product does not exist / It cannot be deleted")
        }
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

module.exports = {
    getTheStockProductsController,
    createStockController,
    editStockController,
    deleteStockController
}