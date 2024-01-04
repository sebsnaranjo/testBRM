const router = require("express").Router();
const { faker } = require("@faker-js/faker")

const Users = require("../models/users")

router.get("/users", async (req, res) => {
    const users = await Users.findAll();;
    res.status(200).json({
        ok: true,
        status: 200,
        body: users
    })
});

router.get("/products/:users_id", async (req, res) => {
    const id = req.params.users_id;
    const user = await Users.findOne({
        where: {id: id},
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: user
    })
});

router.post("/users", async (req, res) => {
    const dataUsers= req.body;
    await Users.sync();
    const createUser = await Users.create({
        name: dataUsers.name,
        mail: dataUsers.mail,
        password: dataUsers.password,
        date_created: dataUsers.date_created,
        date_update: dataUsers.date_update,
        roles_id:  dataUsers.roles_id
    })
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Creado"
    })
});

//Servicio pora ingresar a la aplicación
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                error: "Correo electrónico o contraseña inválidos",
            });
        }

        // Encuentra al usuario con el correo electrónico proporcionado
        const user = await Users.findOne({
            where: { mail: email },
        });

        if (!user) {
            return res.status(401).json({
                ok: false,
                error: "Correo electrónico o contraseña inválidos",
            });
        }

        // Compara la contraseña proporcionada con la contraseña en la base de datos
        const isMatch = user.password === password;

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                error: "Correo electrónico o contraseña inválidos",
            });
        }
        res.status(200).json({
            ok: true,
            id: user.id,
            name: user.name,
            mail: user.mail,
            roles_id: user.roles_id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: "Error interno del servidor",
        });
    }
});

module.exports = router;