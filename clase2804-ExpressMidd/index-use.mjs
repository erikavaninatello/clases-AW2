import express from 'express'

const PUERTO = 3000

const app = express()

// Middlewares
function middleware1(req, res, next){
   console.log('middleware1')
   next()
}
// La ruta en use es un prefijo 
app.use(middleware1)

app.get('/', (req, res)=>{
    console.log('respuesta final')
    res.send('Hola')
})

app.get('/saludo', (req, res)=>{
    console.log('respuesta final consaludo')
    res.send('Hola')
})
app.get('/saludo/dedia', (req, res)=>{
    console.log('respuesta final consaludo')
    res.send('Hola')
})

app.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}`)
})
