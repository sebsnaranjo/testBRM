const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Products = require("../models/products")

//CRUD de productos

router.get("/products", async (req, res) => {
    const products = await Products.findAll();;
    res.status(200).json({
        ok: true,
        status: 200,
        body: products
    })
});

router.get("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const product = await Products.findOne({
        where: {id: id},
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: product
    })
});

router.post("/products", async (req, res) => {
    const dataProducts = req.body;
    await Products.sync();
    const createProduct = await Products.create({
        num_lot: dataProducts.num_lot,
        name: dataProducts.name,
        price: dataProducts.price,
        amount: dataProducts.amount,
        date_entry: dataProducts.date_entry,
        date_update:  dataProducts.date_update
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Creado"
    })
});

router.put("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const dataProducts = req.body;
    const updateProduct = await Products.update({
        num_lot: dataProducts.num_lot,
        name: dataProducts.name,
        price: dataProducts.price,
        amount: dataProducts.amount,
        date_entry: dataProducts.date_entry,
        date_update:  dataProducts.date_update
    }, {
        where: {
            id: id,
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: updateProduct
    })
});

router.delete("/products/:product_id", async (req, res) => {
    const id = req.params.product_id;
    const deleteProduct = await Products.destroy({
        where: {
            id: id
        }
    });
    res.status(204).json({
        ok: true,
        status: 204,
        body: deleteProduct
    })
});

module.exports = router;