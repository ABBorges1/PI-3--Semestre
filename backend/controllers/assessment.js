const Assessment = require('../models/Assessment')

const controller = {}   // Objeto vazio

controller.create = async (req, res) => {
    try {
        await Assessment.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async (req, res) => {
    try {
        // find() sem parâmetros retorna todos os documentos
        // da coleção
        const result = await Assessment.find().populate('user')
        // HTTP 200: OK (implícito)
        res.send(result)
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const result = await Assessment.findById(req.params.id)

        // HTTP 200: OK (implícito)
        if(result) res.send(result)     // Encontrou o documento
        // HTTP 404: Not Found
        else res.status(404).end()      // Não encontrou
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const result = await Assessment.findByIdAndUpdate(req.params.id, req.body)

        // HTTP 204: No content
        if(result) return res.status(204).end() // Encontrou e atualizou
        else res.status(404).end()      // Não encontrou
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const result = await Assessment.findByIdAndDelete(req.params.id)

        // HTTP 204: No content
        if(result) res.status(204).end()    // Encontrou e excluiu
        else res.status(404).end()          // Não encontrou
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller