Cuando pidan crear servidor, rutas, archivos, API, etc.

- Servidor HTTP
- Ruta / endpoint
- Método GET / POST / PUT / DELETE
- Consumir API externa
- Guardar archivo JSON / TXT
- Leer archivo
- Responder cliente
- Error 404
- Try / Catch
- Modularizar

clase 12/05 arquitecturas ---> MVC (modelo vista controladora) como se organiza la logica como se separa, permite que el codigo sea MANTENIBLE Y ESCALABLE. ESTE TIPO DE ARQUITECTURA SE DIVIDE EN EN MODULOS Y CAPAS
1.CAPAS DE RESPONSABILIDAD :  diseño que organiza el código en secciones especializadas (presentación, negocio, datos) 
para separar funciones.
2.CONTROLADOR: se encarga de conectar (va la logica del negocio)
3.MODELO: se encarga de la capa de datos.
4. en vista ponemos las rutas. y AGREGAMOS OTRO MODULO PARA QUE TOME LOS DATOS Y EL USUARIO LO UTILICE PARA (VISTA PROCESA DATOS)

actualizar codigo de clase
MULTER
VARIABLES DEL ENTORNO
SUTER ARCHIVOS ---> MULTER




backend --- localhost300
   |
   | API
   |
front end  (SERVIDAS ENE L MISMO DOMINIO)
TENTO LA API COMO EL FRONT INGRESA AL MISMODOMINIO(LOCALHODT3009
cuandos e desgargue el html el 



{enctype en binario en el formulario html} para que tome la imagen 

El flujo de esta clase(cookies)
1. Usuario entra a /login → ve el formulario
2. Completa usuario y contraseña → manda POST a /autenticar
3. Servidor verifica las credenciales
4. Si son correctas → crea una cookie y redirige a /admin
5. Si no → redirige de vuelta a /login
6. Cada vez que entra a /admin → el middleware chequea si tiene la cookie válida
7. Si no tiene cookie → lo manda de vuelta a /login

   ## Clase 04/06 — Cookies y autenticación

**Dependencias:** `npm install cookie-parser express nodemon`

**¿Qué es una cookie?**
Dato que el servidor guarda en el navegador. El navegador lo manda
automáticamente en cada petición siguiente. Se usa para mantener sesiones.

**Lógica clave:**
- `cookieParser('secreto')` va en `app.use()` antes de las rutas
- `res.cookie('nombre', 'valor', opciones)` crea la cookie
- `req.signedCookies['nombre']` lee una cookie firmada
- `signed: true` protege la cookie para que nadie la pueda modificar desde el navegador
- `httpOnly: true` evita que JavaScript del navegador la lea
- `maxAge` es en milisegundos
- `express.urlencoded()` es necesario para leer formularios HTML puros
- `res.redirect('/ruta')` manda al usuario a otra página
- El middleware de protección chequea la cookie y llama a `next()` o redirige
