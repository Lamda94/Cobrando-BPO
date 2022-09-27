const express = require("express")
const bodyParser = require("body-parser")
const empleados = require("./Routes/index.routes")
const morgan = require("morgan")
require('dotenv').config()

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(morgan('tiny'))
app.use("/emple", empleados)

const PORT = process.env.EMPLE_PORT || 3001;
app.listen(PORT,()=>console.log(`Servicio de empleados corriendo en el puerto ${PORT}`))
