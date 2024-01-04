const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Billing = require("../models/billing")
const Users = require("../models/users")
const Products = require("../models/products")

const sequelize = require('../../sequelize');

//Metodo para obtener todas las facturas
router.get("/billing", async (req, res) => {
    const billing = await Billing.findAll();;
    res.status(200).json({
        ok: true,
        status: 200,
        body: billing
    })
});

//Metodo para obtener las facturas por un ID
router.get("/billing/:billing_id", async (req, res) => {
    const id = req.params.users_id;
    const billing = await Billing.findOne({
        where: {id: id},
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: user
    })
});

//Metodo para obtener las facturas de acuerdo al historial del usuario
router.get("/billing/history/:user_id", async (req, res) => {
    const userId = req.params.user_id;

    try {
        const userBilling = await Billing.findAll({
            where: { users_id: userId }, // Filtra por el ID de usuario
        });

        if (userBilling.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'No se encontraron facturas para este usuario',
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: userBilling, // Retorna todas las facturas vinculadas al usuario
        });
    } catch (error) {
        console.error('Error al obtener las facturas del usuario:', error);
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error al obtener las facturas del usuario',
        });
    }
});

//Metodo para crear las facturas
router.post("/billing", async (req, res) => {
    const dataBilling = req.body;
    await Billing.sync();
    const createBilling = await Billing.create({
        cantidad: dataBilling.cantidad,
        price: dataBilling.price,
        cod_purchase: dataBilling.cod_purchase,
        date_created: dataBilling.date_created,
        users_id: dataBilling.users_id,
        products_id:  dataBilling.products_id
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Creado"
    })
});

//Metodo para la visualización de compras realizadas por los clientes agrupando productos, cantidad y dando el valor total
router.get("/billing-info", async (req, res) => {
    const billing = await Billing.findAll(); // Obtener datos de la API

    // Agrupar compras por código de compra (cod_purchase)
    const groupedBilling = billing.reduce((acc, purchase) => {
        if (!acc[purchase.cod_purchase]) {
            acc[purchase.cod_purchase] = {
                date_created: purchase.date_created,
                user_id: purchase.users_id,
                purchases: []
            };
        }

        acc[purchase.cod_purchase].purchases.push({
            product_id: purchase.products_id,
            cantidad: purchase.cantidad,
            price: purchase.price
        });

        return acc;
    }, {});

    // Transformar los datos para mostrar la información requerida
    const formattedBilling = Object.keys(groupedBilling).map(key => {
        const purchaseInfo = groupedBilling[key];
        const totalAmount = purchaseInfo.purchases.reduce((total, item) => total + item.price * item.cantidad, 0);

        return {
            date_created: purchaseInfo.date_created,
            user_id: purchaseInfo.user_id,
            products: purchaseInfo.purchases.map(purchase => ({
                product_id: purchase.product_id,
                cantidad: purchase.cantidad,
                price: purchase.price
            })),
            total_price: totalAmount
        };
    });

    res.status(200).json({
        ok: true,
        status: 200,
        body: formattedBilling
    });
});

module.exports = router;