
import express from 'express'

const PUERTO = 3000

const app = express()

// Middlewares
function middleware1(req, res, next){
    const usuarioExiste = true
    
    // if(usuarioExiste){
    //     console.log('usuario existe puede pasar')
    //     next() // avanzar al siguiente ----------->
    // }else{
    //     console.log('usuario NO existe NO puede pasar')
    //     res.send('usuario no registrado')
    // }
    if(usuarioExiste){
        return next()
    }
     console.log('usuario NO existe NO puede pasar')
    return res.send('usuario no registrado')
}

// ----------------------------------->
app.get('/', middleware1 /*, middleware2, middleware3*/, (req, res)=>{
    console.log('respuesta final')
    res.send('Hola')
})


app.listen(PUERTO, ()=>{
    console.log(`http://localhost:${PUERTO}`)
})



// const middleware1 = ()=>{

// }