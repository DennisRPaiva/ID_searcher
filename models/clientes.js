const mongoose =  require('mongoose')

const clienteSCHEMA = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    },
    statusPagamento:{
        type: String,
        require: true,
        default: "Unknown"
    }
})

module.exports = mongoose.model('clientes', clienteSCHEMA)