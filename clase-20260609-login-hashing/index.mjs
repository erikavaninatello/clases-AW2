import express from 'express';
import bcrypt from 'bcrypt';  // ← importar bcrypt
import path from 'path'
import pool from './conexion.bd.mjs'


const PUERTO = 3000
const app = express();  

app.use(express.json())  // ← necesario para leer req.body
app.use(express.urlencoded({ extended:true})) 



app.use('/admin', express.static('./fronts/front-admin'))
app.use('/login', express.static('./fronts/front-login'))

app.post('/autenticacion', (req, res) => {

})

app.post('/registrar', async (req, res) => {  // ← async
    const { usuario, pass } = req.body

    if (!usuario || !pass) {
        return res.status(400).json({
            mensaje: 'datos incompletos'
        })
    }

    // hashing
    const salt = await bcrypt.genSalt(10)  // ← bcrypt 
    const hash = await bcrypt.hash(pass, salt)  // ← hash 

    console.log(hash)
    res.json({
        mensaje: 'registrado'
    })
})

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});