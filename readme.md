# NodePop

Install dependencies

```sh
npm install
```

Start in development mode

```sh
npm run dev
```

Create database script

```sh
npm run initDB
```

# Información general

Este servidor usa el puerto 3001.

Para acceder a la api de la base de datos:

http://localhost:3001/api

La API devuelve JSON

/api/authenticate --> Permite hacer login desde la API. RECUERDE usar x-www-form-urlencoded y enviar las key email y password con sus respectivos valores. En este caso, el usuario es user@example.com y la contraseña 1234

/login --> Si lo desea, puede hacer login y obtener el JWToken desde el frontend en esta ruta.

/api/anuncios/tags --> Saca todos los distintos tags de los anuncios. RECUERDE que esta ruta está protegida, y debe proveer en el header el JWToken que le ha devuelto /api/authenticate

/api/anuncios --> Saca todos los anuncios sin filtros. RECUERDE que esta ruta está protegida, y debe proveer en el header el JWToken que le ha devuelto /api/authenticate

Para acceder al index que devuelve una lista de anuncios: http://localhost:3001/

Query sugerida en el navegador para visualizar anuncios filtrados:

http://localhost:3001/?pminimo=190&pmaximo=2000&tag=lifestyle&venta=true&sort=-precio&limit=15
