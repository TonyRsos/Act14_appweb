# Movies and Characters API

Una aplicación web para gestionar películas y personajes utilizando React y FastAPI.

## Tecnologías Utilizadas

- Frontend: React con Material-UI
- Backend: FastAPI (Python)
- Base de datos: MySQL (XAMPP)

## Características

- Gestión de películas (agregar, listar, editar, eliminar)
- Gestión de personajes (agregar, listar, editar, eliminar)
- Estructura de base de datos relacional
- Interfaz moderna con componentes Material-UI
- Sistema de autenticación y autorización
- Validación de datos

## Instalación

### Configuración del Backend

1. Crear entorno virtual:
python -m venv venv

2. Activar el entorno virtual:
# Windows
venv\Scripts\activate


3. Instalar las dependencias necesarias:
pip install -r requirements.txt

4. Configurar base de datos:
Instalar XAMPP
Iniciar servicios de MySQL
Crear base de datos 'movies_db'

5. Iniciar servidor:
uvicorn main:app --reload

### Configuración del forntend
1. Instalar dependencias del frontend:
cd frontend
npm install
2. Iniciar el servidor del frontend:
npm start

### Estructura
    movies/
    ├── backend/
    │   ├── models/
    │   ├── routes/
    │   ├── schemas/
    │   ├── database.py
    │   └── main.py
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── App.js
    │   └── package.json
    └── README.md

### API Endpoints
* GET /api/movies: Obtener todas las películas
* POST /api/movies: Crear nueva película
* GET /api/movies/{id}: Obtener película por ID
* PUT /api/movies/{id}: Actualizar película
* DELETE /api/movies/{id}: Eliminar película
* GET /api/characters: Obtener todos los personajes
* POST /api/characters: Crear nuevo personaje
* GET /api/characters/{id}: Obtener personaje por ID
* PUT /api/characters/{id}: Actualizar personaje
* DELETE /api/characters/{id}: Eliminar personaje


