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

/api/tags --> Saca todos los distintos tags de los anuncios

Para acceder al index que devuelve una lista de anuncios: http://localhost:3001/

Query sugerida en el navegador para visualizar anuncios filtrados:

http://localhost:3001/?pminimo=190&pmaximo=2000&tag=lifestyle&venta=true&sort=-precio&limit=15