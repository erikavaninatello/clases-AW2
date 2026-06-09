import express from 'express';
import pool from './conexion.bd.mjs';
import { nanoid } from 'nanoid';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const PUERTO = process.env.PUERTO || 3000;
const app = express();

// Middlewares — el orden importa
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registro — guarda usuario con contraseña hasheada en la BD
app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).send('Usuario y contraseña son requeridos');
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Si se registró OK, va al login
        } else {
            res.status(500).send('Error al registrar el usuario');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }
});

// Login — verifica contraseña y crea cookie de sesión con nanoid
app.post('/autenticacion', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.status(400).send('Usuario y contraseña son requeridos');
    }
    let verificado = false;
    try {
        // Busca el hash del usuario en la BD
        const resultado = await pool.query(
            'SELECT password_hash FROM usuarios WHERE username = $1',
            [usuario]
        );
        // Compara la contraseña con el hash guardado
        verificado = await bcrypt.compare(pass, resultado.rows[0].password_hash);
    } catch (error) {
        return res.status(401).send('Error al verificar la contraseña');
    }
    if (verificado) {
        // Genera un ID de sesión único con nanoid
        const sesionId = nanoid(21);
        const resultado = await pool.query(
            'UPDATE usuarios SET session_id = $1 WHERE username = $2 RETURNING session_id',
            [sesionId, usuario]
        );
        // Guarda el session_id en una cookie
        res.cookie('sessionId', resultado.rows[0].session_id, {
            httpOnly: true,  // no accesible desde JS
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });
        res.redirect('/'); // Va al admin
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

// Logout — borra la cookie
app.get('/logout', async (req, res) => {
    res.cookie('sessionId', '', { maxAge: 0 });
    res.redirect('/');
});

// Login — carpeta pública sin protección
app.use('/login', express.static('./fronts/front-login'));

// Admin — protegido por middleware que verifica la cookie en la BD
app.use(async (req, res, next) => {
    const userSessionId = req.cookies.sessionId;
    const resultado = await pool.query(
        'SELECT session_id FROM usuarios WHERE session_id = $1',
        [userSessionId]
    );
    if (resultado.rowCount === 0) {
        return res.redirect('/login'); // Sin sesión válida → login
    } else {
        next(); // Sesión válida → dejamos pasar
    }
}, express.static('./fronts/front-admin'));

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});