# Rescalar imágenes API Rest.

Rescalado de imágenes con la librería [Sharp](https://www.npmjs.com/package/sharp/).
Prueba de acceso a Plexus.

---
## Arquitectura

El patrón de arquitectura seguida en el diseño es Modelo–vista–controlador.
En *./src/* encotramos el código de la API.
Dicho proyecto tiene eslint y standard version para un manejo mas rápido del versionado y bug-fixes.

---
## API REST

La API esta compuesta de dos rutas:
- ##### POST /task
    -La ruta espera un FormData con la imagen almacenada en *original*.
    -Devuelve un JSON que contiene el taskId y status,
        -Si la imagen ya existe o no se a recibido devuelve status:"error" y un mensaje (message), sin taskId.
- ##### GET /task/:taksId
    -Devuelve un JSON con:
        -status: "error"|"success",
        -message: Si el estado es erroneo devuelve el motivo (tarea no encontrada).
        -task: Toda la información almacena de la tarea.

## Formato de los JSON

- ##### Tasks.json
    {
        [tasksId]:{
            "800": "complete"|"imcomplete",
            "1024": "complete"|"imcomplete",
            "status": "complete"|"imcomplete",
            "date": timestamp,
            "path": "./images/original/filename",
            "1024Timestamp": timestamp,
            "800Timestamp": timestamp
        }
    .
    .
    .
    }
- ##### Images.json
    {
        [filename]:{
            "date": timestamp,
            "pathOriginal": "./images/original/filename",
            "path800": "./images/output/filename/800/md5.ext",
            "path1024": "./images/output/filename/1024/md5.ext",
            "taskId": tasksId
        }
    .
    .
    .
    }

- #### Instalación y ejecución

      $ npm i
      $ npm run start
*Utilizar [Postman](https://www.postman.com/) para realizar las peticiones.
**Por defecto el servidor se ejecuta en el puerto 3400 se puede cambiar desde *./src/config.js***
