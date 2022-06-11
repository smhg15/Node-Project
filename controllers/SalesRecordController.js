const SalesRecord = require('../models/SalesRecordModel');
const validator = require('validator');

const getAllSalesRecordController = async (req, res) => {
    try {
        const salesRecord = await SalesRecord.find()
        res.send(stock)
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const createASalesRecordController = async (req, res) => {
    const { product, unitPrice, quantitySold } = req.body
    if (!validator.isAlpha(product)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(unitPrice, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isInt(quantitySold, {gt: 0})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const salesRecord = new SalesRecord (req.body)
        await salesRecord.save()
        res.send("A new sales was registered successfully")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const editASalesRecordController = async (req, res) => {
    const { product, unitPrice, quantitySold } = req.body
    if (!validator.isAlpha(product)) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isNumeric(unitPrice, {no_symbols: true})) {
        res.status(400).send("invalid parameters")
        return
    }
    if (!validator.isInt(quantitySold, {gt: 0})) {
        res.status(400).send("invalid parameters")
        return
    }
    try {
        const salesRecord = await SalesRecord.findById(id)
        await salesRecord.update({ $set: { product, unitPrice, quantitySold } })
        res.send("the sales record was updated successfully")
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

const deleteASalesRecordController = async (req, res) => {
    const { id } = req.body
    if (!validator.isMongoId(id)) {
        res.status(400).send("invalid parameters")
        return
    }

    try {
        const deleted = await SalesRecord.findByIdAndDelete(id)
        if (deleted) {
            res.send("The sales record was deleted from the database")
        } else {
            res.status(400).send("The sales record does not exist / It cannot be deleted")
        }
    } catch (e) {
        res.status(500).send("something unexpected happened that prevents fulfilling the request.")
    }
}

module.exports = {
    getAllSalesRecordController,
    createASalesRecordController,
    editASalesRecordController,
    deleteASalesRecordController
}