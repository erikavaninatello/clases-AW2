import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000
const app = express()

// Middlewares globales
app.use(cookieParser('misecreto'))         // lee cookies firmadas con este secreto
app.use(express.json())                    // lee JSON del body
app.use(express.urlencoded({ extended: true }))  // lee formularios HTML

// Servimos el login en /login
app.use('/login', express.static('./fronts/front-login'))

// Middleware que protege /admin
function chequearAcceso(req, res, next) {
    const miIdentificador = req.signedCookies['sesion']

    if (miIdentificador === 'identificador') {
        return next()
    }
    return res.redirect('/login')
}

// /admin está protegido — pasa por chequearAcceso primero
app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'))

// Ruta que procesa el formulario de login
app.post('/autenticar', (req, res) => {
    const { usuario, clave } = req.body

    // Verificamos credenciales (en producción esto sería una consulta a la BD)
    if (usuario != 'miusuario' || clave != '123456') {
        return res.redirect('/login')
    }

    // Credenciales correctas → creamos la cookie
    res.cookie('sesion', 'identificador', {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        signed: true,
        maxAge: 1000 * 20   // dura 20 segundos
    })

    res.redirect('/admin')
})

app.listen(PUERTO)