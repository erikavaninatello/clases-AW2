# 📚 Aplicaciones Web 2 — Resumen de Clases

---

## ⚡ Comandos rápidos de referencia

```bash
# Iniciar proyecto nuevo
npm init -y

# Correr el servidor
npm run dev

# Git — subir cambios
git add .
git commit -m "mensaje"
git push
```

---

## 📦 Paquetes por clase — referencia rápida

| Clase | Paquetes a instalar |
|-------|-------------------|
| 07/04 — Node archivos/API | sin paquetes (módulos nativos de Node) |
| 14/04 — Servidor HTTP | sin paquetes (módulos nativos de Node) |
| 21/04 — Express básico | `npm install express nodemon` |
| 23/04 — Express rutas/POST | `npm install express nodemon` |
| 28/04 — Middleware/static | `npm install express nodemon` |
| 05/05 — API REST | `npm install express nodemon` |
| 12/05 — MVC-1 | `npm install express nodemon` |
| 19/05 — MVC-2 | `npm install express nodemon` |
| Multer | `npm install express multer mime-types nanoid nodemon` |
| 26/05 — TP3-1 Variables de entorno + PostgreSQL | `npm install express dotenv pg nodemon` |
| 26/05 — TP3-2 Multer + PostgreSQL | `npm install express dotenv pg multer nodemon` |
| 04/06 — Cookies | `npm install express cookie-parser nodemon` |

> 💡 `nodemon` reinicia el servidor automáticamente cuando guardás cambios. Siempre va en `devDependencies`.

---

## 📁 Clase 07/04 — Node.js: Archivos y APIs

**Sin paquetes externos** — usa módulos nativos de Node.

```js
import fsp from 'node:fs/promises'   // leer/escribir archivos
import path from 'node:path'         // armar rutas de archivos
```

**Leer un archivo:**
```js
const ruta = path.join('texto.txt')
const contenido = await fsp.readFile(ruta, 'utf8')  // 'utf8' para que devuelva texto
```

**Escribir un archivo** (lo crea si no existe, lo pisa si existe):
```js
await fsp.writeFile(ruta, 'contenido a guardar')
```

**Consumir una API externa y guardar el resultado:**
```js
const respuesta = await fetch('https://...')
const datos = await respuesta.json()                    // convierte a objeto JS
await fsp.writeFile(ruta, JSON.stringify(datos, null, 2))  // guarda bonito
```

**Lógica clave:**
- Siempre usar `try/catch` — si el archivo no existe, el error va al `catch` y no explota todo
- `fetch` y `.json()` son promesas → los dos necesitan `await`
- `JSON.stringify(datos, null, 2)` convierte objeto JS a texto JSON con sangría de 2 espacios

---

## 🌐 Clase 14/04 — Servidor HTTP con Node puro

**Sin paquetes externos** — módulo nativo `http`.

```js
import http from 'node:http'

const app = http.createServer(async (peticion, respuesta) => {
    if (peticion.method === 'GET' && peticion.url === '/') {
        respuesta.statusCode = 200
        return respuesta.end('ruta raiz')
    }
    // si no coincide nada:
    respuesta.statusCode = 404
    return respuesta.end('No se encontró la ruta')
})

app.listen(3000)
```

**Códigos HTTP:**
| Código | Significado |
|--------|-------------|
| `200` | OK |
| `201` | Creado |
| `404` | No encontrado |
| `500` | Error del servidor |

**Lógica clave:**
- El `return` antes de `respuesta.end()` es importante — evita que siga ejecutando código y responda dos veces
- Las rutas se distinguen con `if` sobre `peticion.method` y `peticion.url`

---

## ⚡ Clase 21/04 — Express: primer servidor

```bash
npm install express nodemon
```

Express simplifica todo lo que hacíamos con `http`. En vez de `if` para cada ruta, usamos `.get()`, `.post()`, etc.

```js
import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Hola!')
})

app.listen(3000, () => console.log('servidor en http://localhost:3000'))
```

**Métodos de respuesta:**
| Método | ¿Qué hace? |
|--------|-----------|
| `res.send('texto')` | Responde con texto |
| `res.json({...})` | Responde con JSON |
| `res.sendStatus(200)` | Solo el código de estado |
| `res.status(201).json({...})` | Código + JSON juntos |
| `res.redirect('/ruta')` | Redirige a otra URL |

---

## 🔀 Clase 23/04 — Express: rutas, parámetros y POST

```bash
npm install express nodemon
```

**Parámetros en la URL** — para rutas como `/productos/5`:
```js
app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id)  // siempre llega como string, hay que convertir
    const resultado = productos.filter(p => p.id === id)
    res.json(resultado)
})
```

**Recibir datos de un POST** — `req.body`:
```js
app.use(express.json())  // ← va ANTES de las rutas, sino req.body es undefined

app.post('/productos', (req, res) => {
    const datosCliente = req.body
    productos.push(datosCliente)
    res.status(201).json({ mensaje: 'Producto creado' })
})
```

**Lógica clave:**
- `req.params.id` siempre es **string** → convertir con `Number()` o `parseInt()`
- `express.json()` siempre antes de las rutas
- `filter()` devuelve nuevo array con los que cumplen la condición, no modifica el original

---

## 🔧 Clase 28/04 — Middleware y archivos estáticos

```bash
npm install express nodemon
```

**¿Qué es un middleware?** Función que se ejecuta entre que llega la petición y se envía la respuesta. Tiene `req`, `res` y `next`.

```js
function miMiddleware(req, res, next) {
    const usuarioExiste = true
    if (usuarioExiste) {
        return next()           // continúa hacia la ruta
    }
    return res.send('no autorizado')  // corta acá
}

app.get('/', miMiddleware, (req, res) => {
    res.send('llegaste!')
})
```

**`app.use()`** — aplica el middleware a TODAS las rutas:
```js
app.use(miMiddleware)   // se ejecuta antes de todo
```

**Servir archivos estáticos** (HTML, CSS, imágenes):
```js
import path from 'node:path'
app.use(express.static(path.resolve('front')))     // sirve la carpeta front/
app.use('/admin', express.static(path.resolve('admin')))  // solo en /admin
```

**Lógica clave:**
- Sin `next()` la petición queda colgada y nunca responde
- `express.static()` es un middleware que viene incluido en Express
- Backend y frontend pueden vivir en el mismo servidor

---

## 🔌 Clases 05/05 y 07/05 — API REST

```bash
npm install express nodemon
```

Una API REST organiza las rutas según el método HTTP:

| Método | Acción | Ruta ejemplo |
|--------|--------|-------------|
| `GET` | Obtener todos | `/api/v1/productos` |
| `GET` | Obtener uno | `/api/v1/productos/:id` |
| `POST` | Crear | `/api/v1/productos` |
| `PUT` | Modificar | `/api/v1/productos/:id` |
| `DELETE` | Eliminar | `/api/v1/productos/:id` |

**Estructura del proyecto:**
```
├── index.mjs        → servidor + rutas
├── funciones.mjs    → lógica de cada ruta
└── productos.mjs    → datos (la "base de datos" en memoria)
```

**Formato de respuesta de la clase:**
```js
const respuesta = {
    datos: productosFiltrados,
    url: 'http://localhost:3000/api/v1/productos/' + id,
    status: 200
}
res.json(respuesta)
```

**Spread operator** `...` para crear/modificar objetos:
```js
const productoFinal = { id: nuevoId, ...req.body }
// equivale a copiar todas las propiedades de req.body y agregarle el id
```

**Lógica clave:**
- `filter()` para buscar → devuelve array con los que cumplen
- `filter()` para eliminar → devuelve todos MENOS el que tiene ese id
- `.indexOf(elemento)` → devuelve la posición en el array
- `splice(indice, 1)` → elimina 1 elemento en esa posición (modifica el original)

---

## 🏗️ Clases 12/05 y 19/05 — Arquitectura MVC

```bash
npm install express nodemon
```

MVC = **Modelo - Vista - Controlador**. Organiza el código en capas para que sea mantenible y escalable.

```
Petición → RUTAS → CONTROLADOR → MODELO → VISTA → Respuesta
```

**Estructura de carpetas:**
```
├── index.mjs
├── productos.mjs                          → datos
└── modulos/
    └── productos/
        ├── rutas.productos.mjs            → define qué función se llama
        ├── controlador.productos.mjs      → lógica (conecta modelo y vista)
        ├── modelo.productos.mjs           → accede a los datos
        └── vista.productos.mjs            → formatea la respuesta
```

**Responsabilidad de cada capa:**
| Capa | Hace |
|------|------|
| Rutas | Recibe la petición y la manda al controlador correcto |
| Controlador | Lógica del negocio — llama al modelo, pasa por vista, responde |
| Modelo | Todo lo relacionado a datos (buscar, guardar, eliminar) |
| Vista | Formatea/restructura los datos antes de responder |

**Router de Express** — agrupa rutas en un módulo separado:
```js
import { Router } from 'express'
const rutasProductos = new Router()

rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)

export default rutasProductos
```

```js
// en index.mjs
app.use(rutasProductos)
```

---

## 📤 Multer — Subir archivos

```bash
npm install express multer mime-types nanoid nodemon
```

Multer es el middleware que permite recibir archivos desde formularios HTML.

**El HTML necesita `enctype`** obligatoriamente:
```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="nombre">
    <input type="file" name="archivo">
    <button>Enviar</button>
</form>
```

**Configuración:**
```js
import multer from 'multer'
import mime from 'mime-types'
import { nanoid } from 'nanoid'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './files'),  // carpeta destino
    filename: (req, file, cb) => {
        const nombre = nanoid() + '.' + mime.extension(file.mimetype)
        cb(null, nombre)   // nombre único + extensión correcta
    }
})

const upload = multer({ storage }).single('archivo')  // 'archivo' = name del input

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.sendStatus(500)
        console.log(req.file)   // datos del archivo
        console.log(req.body)   // otros campos del form
        res.sendStatus(200)
    })
})
```

**Lógica clave:**
- El `name` del input file tiene que coincidir con `.single('nombre')`
- `nanoid()` genera un nombre único para no pisar archivos con el mismo nombre
- `mime.extension(file.mimetype)` saca la extensión correcta según el tipo de archivo
- Crear la carpeta `files/` manualmente antes de correr el servidor

---

## 🌿 Clase 26/05 — Variables de entorno + PostgreSQL (TP3-1)

```bash
npm install express dotenv pg nodemon
```

**¿Por qué variables de entorno?** Para no subir contraseñas a GitHub. Van en un archivo `.env` que se agrega al `.gitignore`.

```bash
# .env
PUERTO=3000
BD_HOST='localhost'
BD_USER='root'
BD_PASS='pass'
BD_BD='tienda'
BD_PORT=5432
```

```bash
# .gitignore
node_modules
.env
```

**Cargar el `.env`:**
```js
// iniciar.env.mjs
import dotenv from 'dotenv'
dotenv.config()
```

```js
// index.mjs — importar PRIMERO antes de todo
import './iniciar.env.mjs'
import express from 'express'

const PUERTO = process.env.PUERTO || 3000  // || 3000 = valor por defecto
```

**Conexión a PostgreSQL con Pool:**
```js
// bd/conexion.bd.mjs
import pg from 'pg'

const pool = new pg.Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT
})

export default pool
```

**Consulta SQL en el modelo:**
```js
import pool from '../../bd/conexion.bd.mjs'

export async function obtenerTodos() {
    const resultado = await pool.query('SELECT * FROM productos')
    return resultado   // resultado.rows → array con las filas
}
```

**En el controlador:**
```js
export async function obtenerTodos(req, res) {
    const respuesta = await modelo.obtenerTodos()
    res.json(respuesta.rows)   // .rows es el array con los datos
}
```

**Lógica clave:**
- `import './iniciar.env.mjs'` siempre es la primera línea del `index.mjs`
- `process.env.NOMBRE` para acceder a cada variable
- `pool.query()` devuelve una promesa → necesita `async/await`
- El resultado tiene `.rows` que es el array con las filas de la tabla

---

## 🗄️ Clase 26/05 — Multer + PostgreSQL en MVC (TP3-2)

```bash
npm install express dotenv pg multer nodemon
```

Combina todo lo anterior: MVC + Variables de entorno + Multer + PostgreSQL.

**Lo nuevo: Multer dentro del controlador** (no en index.mjs):
```js
// controlador.productos.mjs
import multer from 'multer'
import path from 'node:path'

const subirArchivo = multer({ dest: path.join('archivos') })
const manejarArchivo = subirArchivo.single('archivo')

export async function crearUno(req, res) {
    manejarArchivo(req, res, async (error) => {
        if (error) return res.status(500).json({ mensaje: 'error' })

        const datos = {
            producto: req.body.producto,
            precio: req.body.precio,
            imagen: req.file.originalname
        }
        await modelo.crearUno(datos)
        res.status(201).json({ mensaje: 'Registro creado' })
    })
}
```

**INSERT con parámetros en SQL** — `$1`, `$2` evitan inyección SQL:
```js
await pool.query(
    'INSERT INTO productos(producto, precio) VALUES($1, $2) RETURNING id, producto',
    [producto, precio]   // $1 = producto, $2 = precio
)
```

**Desestructuración** — forma corta de extraer propiedades:
```js
const { producto, precio, imagen } = datos
// equivale a:
// const producto = datos.producto
// const precio = datos.precio
```

**Lógica clave:**
- Multer va dentro del controlador para mantener el MVC limpio
- `RETURNING` en el INSERT devuelve el registro recién creado
- Crear la carpeta `archivos/` manualmente antes de correr

---

## 🍪 Clase 04/06 — Cookies y autenticación

```bash
npm install express cookie-parser nodemon
```

**¿Qué es una cookie?** Dato que el servidor guarda en el navegador. El navegador lo manda automáticamente en cada petición siguiente. Se usa para mantener sesiones (recordar que ya te logueaste).

**Flujo de la clase:**
```
1. Usuario entra a /login → ve el formulario
2. Completa usuario y contraseña → POST a /autenticar
3. Servidor verifica las credenciales
4. Si son correctas → crea cookie y redirige a /admin
5. Si no → redirige de vuelta a /login
6. Cada vez que entra a /admin → middleware chequea si tiene cookie válida
7. Si no tiene cookie → lo manda de vuelta a /login
```

**Setup:**
```js
import cookieParser from 'cookie-parser'

app.use(cookieParser('misecreto'))          // lee cookies firmadas
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // para leer formularios HTML puros
```

**Crear una cookie:**
```js
res.cookie('sesion', 'identificador', {
    secure: true,       // solo por HTTPS
    httpOnly: true,     // JS del navegador NO puede leerla
    sameSite: 'lax',    // controla desde qué dominios se manda
    signed: true,       // se firma con el secreto del cookieParser
    maxAge: 1000 * 20   // duración en milisegundos (20 segundos)
})
```

**Leer una cookie firmada:**
```js
const valor = req.signedCookies['sesion']
// si existe y no fue modificada → 'identificador'
// si no existe o fue modificada → false
```

**Middleware que protege rutas:**
```js
function chequearAcceso(req, res, next) {
    const id = req.signedCookies['sesion']
    if (id === 'identificador') return next()
    return res.redirect('/login')
}

app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'))
```

**Lógica clave:**
- `express.urlencoded()` es para formularios HTML puros (distinto a `express.json()` que es para fetch/axios)
- `signed: true` protege la cookie para que nadie la pueda modificar desde el navegador
- `httpOnly: true` evita que JavaScript del navegador la lea (más seguro)
- `res.redirect('/ruta')` redirige el navegador a otra página
- El middleware chequea la cookie y llama a `next()` si está bien, o redirige si no

---

##  Estructura de archivos típica de la materia

```
proyecto/
├── .env                    → variables de entorno (NO subir a git)
├── .gitignore              → node_modules y .env
├── package.json
├── iniciar.env.mjs         → carga el .env
├── index.mjs               → servidor principal
├── bd/
│   └── conexion.bd.mjs     → conexión a PostgreSQL
├── modulos/
│   └── productos/
│       ├── rutas.productos.mjs
│       ├── controlador.productos.mjs
│       ├── modelo.productos.mjs
│       └── vista.productos.mjs
├── publico/                → frontend principal
└── archivos/               → archivos subidos con Multer
```

---


| Concepto | Para qué sirve |
|----------|---------------|
| `async/await` | Para operaciones que tardan (archivos, BD, APIs) |
| `try/catch` | Para capturar errores sin que explote todo |
| `filter()` | Devuelve nuevo array con los que cumplen la condición |
| `map()` | Devuelve nuevo array transformando cada elemento |
| `forEach()` | Recorre sin devolver nada |
| `splice(i, 1)` | Elimina 1 elemento en la posición `i` (modifica el original) |
| `Number()` | Convierte string a número (necesario con `req.params.id`) |
| `...spread` | Copia propiedades de un objeto |
| `const { a } = obj` | Desestructuración — atajo para extraer propiedades |
| `process.env.X` | Accede a variables de entorno |
| `\|\| valor` | Valor por defecto si la variable es undefined |
