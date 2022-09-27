const express = require("express")
const bodyParser = require("body-parser")
const Departamento = require("./Routes/index.routes")
const morgan = require("morgan")

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(morgan('tiny'))
app.use("/depa", Departamento)

const PORT = process.env.POSRT || 3000;
app.listen(PORT,()=>console.log(`Servicio de departamentos corriendo en el puerto ${PORT}`))
