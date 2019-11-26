# post-api

## Clonar el repositorio usando una consola
`git clone https://github.com/mmarulandc/post-api.git`

## Ingresar al directorio
`$ cd post-api`

## Instalar dependencias (**NPM requerido**)
`$ npm install`

## Ejecutar proyecto
`$ npm start`

# Por obvias razones no subí las credenciales del cluster de MongoAtlas, ni tampoco las access key de aws

# Heroku app
### https://post-api-2019.herokuapp.com/api/
## End points 

|Verbo |End point| Parametros:tipo |Obligatorio| 
| ----- | ---- | ---- | ---- |
| POST | /api/signup | - username :text <br> - password :text <br> - email :email <br> **TODOS** req.body  | **TODOS**    |
| POST | /api/login <br> **Devuelve Token de sesión necesario** <br> **para el resto de end points** | - email :text <br> - password :text <br>  **TODOS** req.body  | **TODOS**    |
| POST | /api/sendpost | - image :file <br> - content :text <br> - title :text <br> - creatorId :text <br> **usar form-data <br> en Body  Postman**   | -**content** <br> -**title** <br>  -**creatorId**   |
| GET | /api/getpost/:userID | - userID :text **req.params** <br> - perPage :number **req.body** <br> - currentPage :number **req.body**  | **userID**    |
| GET | /api/getallpost | <br> - perPage :number **req.body** <br> - currentPage :number **req.body**  | Nada    |
| DELETE | /api/deletepost/:postID | - userID:text **req.body** <br> - postID:text **req.params** | **TODOS**    |
| POST | /api/findpost | - search :text **req.body** <br> - perPage :number **req.body** <br> - currentPage :number **req.body** | **search** <br> (Porque es el campo de busqueda)    |
