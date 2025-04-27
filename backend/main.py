# backend/main.py
# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
import mysql.connector
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los headers
)


# Configuración de la conexión
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",  # Cambia si tienes contraseña
    "database": "api_personajes",
    "port": 3306
}

# Modelos Pydantic
class Pelicula(BaseModel):
    titulo: str
    anio: int

class Personaje(BaseModel):
    nombre: str
    pelicula_id: int

# Conexión a la base de datos
def get_db():
    return mysql.connector.connect(**db_config)

# Crea las tablas si no existen
def crear_tablas():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS peliculas (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            anio INT NOT NULL
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS personajes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            pelicula_id INT,
            FOREIGN KEY (pelicula_id) REFERENCES peliculas(id)
        )
    """)
    db.commit()
    cursor.close()
    db.close()

crear_tablas()

# Endpoints GET y POST para películas
@app.get("/peliculas")
def get_peliculas():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM peliculas")
    peliculas = cursor.fetchall()
    cursor.close()
    db.close()
    return peliculas

@app.post("/peliculas")
def add_pelicula(pelicula: Pelicula):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO peliculas (titulo, anio) VALUES (%s, %s)", (pelicula.titulo, pelicula.anio))
    db.commit()
    cursor.close()
    db.close()
    return {"mensaje": "Película agregada"}

# Endpoints GET y POST para personajes
@app.get("/personajes")
def get_personajes():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM personajes")
    personajes = cursor.fetchall()
    cursor.close()
    db.close()
    return personajes

@app.post("/personajes")
def add_personaje(personaje: Personaje):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO personajes (nombre, pelicula_id) VALUES (%s, %s)", (personaje.nombre, personaje.pelicula_id))
    db.commit()
    cursor.close()
    db.close()
    return {"mensaje": "Personaje agregado"}