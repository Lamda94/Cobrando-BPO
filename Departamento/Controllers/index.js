const Sequelize = require("../../config/db")
const DataTypes = require("sequelize/lib/data-types")
const Departamento = require("../../models/departamento")(Sequelize, DataTypes)

const Ajv = require("ajv")
const ajv = new Ajv()   
const schema = {
    type: "object",
    properties: {
        codigo:{type: "integer"},
        nombre:{type: "string"},
        presupuesto:{type: "string"}
    },
    required: ["codigo","nombre","presupuesto"],
    additionalProperties: false,
}

exports.list = async (req,res)=>{
    try {
        const data = await Departamento.findAll({where:{status:1}})
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.get = async (req,res)=>{
    const {id} = req.params
    try {
        const data = await Departamento.findOne({where:{id, status:1}})
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
            req.body.status = 1
            const data = await Departamento.create(req.body)
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
            const data = await Departamento.update(req.body, {
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
        const data = await Departamento.update({status:0}, {
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