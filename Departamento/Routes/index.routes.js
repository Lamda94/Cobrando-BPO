const deparControler = require("../Controllers/index")
const route = require("express").Router()

route.get("/", deparControler.list)
route.get("/:id", deparControler.get)
route.post("/create", deparControler.create)
route.put("/update", deparControler.update)
route.delete("/:id", deparControler.delete)

module.exports = route;