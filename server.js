require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Conectado ao Database'))

app.use(express.json())

const clientesRota = require('./rotas/clientes')
app.use('/clientes', clientesRota);


app.listen(3000, () => console.log('Server Started!'))