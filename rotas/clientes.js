const express = require('express')
const rota = express.Router()
const Cliente = require('../models/clientes')

// Getting all
rota.get('/', async (req,res) => {
    try {
        const pessoas = await Cliente.find()
        res.json(pessoas)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
// Getting one
rota.get('/:id', getCliente, (req,res)  => {
    res.send(res.pessoa)
})
// Create one
rota.post('/', async (req,res) => {
    const pessoa = new Cliente({
        nome: req.body.nome,
        id: req.body.id,
        statusPagamento: req.body.statusPagamento
    })

    try {
        const novaPessoa = await pessoa.save()
        res.status(201).json(novaPessoa)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Update one
rota.patch('/:id', getCliente, async (req,res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.id != null){
        res.pessoa.id = req.body.id
    }

    try {
        const updateCliente = await res.cliente.save()
        res.json(updateCliente)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
rota.delete('/:id', getCliente, async (req,res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'cliente deletado'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getCliente (req, res, next){
    let pessoa
    try {
        pessoa = await  Cliente.findById(req.params.id)
        if(!pessoa){
            return res.status(404).json({message: "Pessoa não achada"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.pessoa = pessoa
    next()
}


module.exports = rota