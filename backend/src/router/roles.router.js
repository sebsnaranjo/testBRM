const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Roles = require("../models/roles")

//Servicios para la creacion de los roles (Cliente y Administrador)

router.get("/roles", async (req, res) => {
    const roles = await Roles.findAll();;
    res.status(200).json({
        ok: true,
        status: 200,
        body: roles
    })
});

router.post("/roles", async (req, res) => {
    const dataRoles = req.body;
    await Roles.sync();
    const createRol = await Roles.create({
        name: dataRoles.name
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Creado"
    })
});

module.exports = router;