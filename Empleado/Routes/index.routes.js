const EmpleadosController = require("../Controllers/index")
const route = require("express").Router()

route.get("/", EmpleadosController.list)
route.get("/:id", EmpleadosController.get)
route.post("/create", EmpleadosController.create)
route.put("/update", EmpleadosController.update)
route.delete("/:id", EmpleadosController.delete)

module.exports = route;