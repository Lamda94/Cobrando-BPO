const request = require("request")
const Sequelize = require("../../config/db")
const DataTypes = require("sequelize/lib/data-types")
const Empleados = require("../../models/empleado")(Sequelize, DataTypes)
require('dotenv').config()

const Ajv = require("ajv")
const ajv = new Ajv()   
const schema = {
    type: "object",
    properties: {
        codigo:{type: "integer"},
        nombre:{type: "string"},
        nif: {type: "string"},
        apellido_2: {type: "string"},
        apellido_1: {type: "string"},
        codigo_departamento: {type: "integer"}
    },
    required: ["codigo","nombre","nif","apellido_2","apellido_1","codigo_departamento"],
    additionalProperties: false,
}

exports.list = async (req,res)=>{
    try {
        const data = await Empleados.findAll({where:{status:1}})
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.get = async (req,res)=>{
    const {id} = req.params
    try {
        const data = await Empleados.findOne({where:{id, status:1}})
        if (typeof data === 'undefined' || data == null) {
            return res.status(404).json({msj:"Usuario no encontrado."})
        }
        return res.status(200).json(data)
        
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

exports.create = async (req,res)=>{
    try {
        const validator = ajv.compile(schema);
        if (validator(req.body)) {
            req.body.codigo_departamento = `${process.env.DEPA_HOST}:${process.env.DEPA_PORT}/depa/${req.body.codigo_departamento}`
            req.body.status = 1
            const data = await Empleados.create(req.body)
            if (Object.keys(data).length>0) {
                return res.status(200).json(data)
            }
            return res.status(404).json({msj:"Error registrando el usuario."})   
        }
        return res.status(202).json({msj:"Datos invalidos."})
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

exports.update = async (req,res)=>{
    const {id} = req.params
    try {
        const validator = ajv.compile(schema);
        if (validator(req.body)) {
            const data = await Empleados.update(req.body, {
                where:{id}
            })
            if (Object.keys(data).length>0) {
                return res.status(200).json(data)
            }
            return res.status(404).json({msj:"Error actualizando el usuario."})
        }
        return res.status(202).json({msj:"Datos invalidos o incompletos."})
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}

exports.delete = async(req,res)=>{
    const {id} = req.params
    try {
        const data = await Empleados.update({status:0}, {
            where:{id}
        })
        if (Object.keys(data).length>0) {
            return res.status(200).json(data)
        }
        return res.status(404).json({msj:"Error actualizando el usuario."})
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
}