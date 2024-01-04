const express = require("express");
const morgan = require("morgan")

const products = require("../router/products.router")
const roles = require("../router/roles.router")
const users = require("../router/users.router")
const billing = require("../router/billing.router")

const app  = express();

app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("This is Express");
})

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json())
app.use("/api/v1", products)
app.use("/api/v1", roles)
app.use("/api/v1", users)
app.use("/api/v1", billing)

module.exports = app;