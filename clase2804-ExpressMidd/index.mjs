import express from 'express'
import path from 'node:path'

const PUERTO = 3000

const app = express()

// La ruta en use es un prefijo 
app.use(express.static(/*utilizar el modulo path */path.resolve('front')))


app.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}`)
})
