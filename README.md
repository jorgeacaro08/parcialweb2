## Cómo correrlo

1. Copiar .env.example como .env y poner en JWT_SECRET un texto aleatorio largo.
2. Levantar la base. La primera vez se ejecutan los scripts de la carpeta db.

docker compose up -d


## Conexión a PostgreSQL

La conexión se configura con estas variables del .env. Los valores son los del docker-compose.yml.


DB_HOST=localhost
DB_PORT=5436
DB_USER=preparcial
DB_PASS=preparcial123
DB_NAME=preparcial_db


## Migraciones

- db/01_tablas.sql
- db/02_admin.sqlclave Admin1234.
- db/03_datos_prueba.sqlclave Clave1234.

docker compose down -v y docker compose up -d
