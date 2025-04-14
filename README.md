# 🚀 Rick & Morty GraphQL API
[![Open Source](https://img.shields.io/badge/Open-Source-orange)](https://github.com)

Una API GraphQL que expone personajes de Rick & Morty, con caché en Redis, base de datos en PostgreSQL, documentación Swagger y cronjob de actualización automática.  


---

## 📦 Tecnologías

- Node.js + Express
- GraphQL (`graphql-http`)
- PostgreSQL + Sequelize
- Redis
- Swagger
- Cron Jobs (`node-cron`)
- TypeScript

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/rick-morty-api.git
cd rick-morty-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.sample .env
```
Editar el archivo .env con sus valores:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=rick-morty
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
```
> Asegúrarse de tener PostgreSQL y Redis corriendo localmente o en servicios accesibles.

### 4. 🚀 Ejecución
```bash
npm run dev
```
> El servidor correrá en: 
🔗 GraphQL Playground: http://localhost:3000/graphiql
📊 Swagger: http://localhost:3000/api/docs

### 5. 🧪 Testing
```bash
npm run test
```

### 📖 Licencia
MIT


### Autor
Hecho con 🧠 y 💻 por Walter Alturo