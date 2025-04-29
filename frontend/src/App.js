// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import { Add as AddIcon, Movie as MovieIcon, Person as PersonIcon } from '@mui/icons-material';

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [anio, setAnio] = useState('');
  const [nombrePersonaje, setNombrePersonaje] = useState('');
  const [peliculaId, setPeliculaId] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchPeliculas();
    fetchPersonajes();
  }, []);

  const fetchPeliculas = async () => {
    try {
      const res = await axios.get('http://localhost:8000/peliculas');
      setPeliculas(res.data);
    } catch (error) {
      mostrarMensaje('Error al cargar películas');
    }
  };

  const fetchPersonajes = async () => {
    try {
      const res = await axios.get('http://localhost:8000/personajes');
      setPersonajes(res.data);
    } catch (error) {
      mostrarMensaje('Error al cargar personajes');
    }
  };

  const handleAddPelicula = async (e) => {
    e.preventDefault();
    if (parseInt(anio) <= 0) {
      mostrarMensaje('El año debe ser un número positivo');
      return;
    }
    try {
      await axios.post('http://localhost:8000/peliculas', { titulo, anio: parseInt(anio) });
      setTitulo('');
      setAnio('');
      fetchPeliculas();
      mostrarMensaje('Película agregada exitosamente');
    } catch (error) {
      mostrarMensaje('Error al agregar película');
    }
  };

  const handleAddPersonaje = async (e) => {
    e.preventDefault();
    if (parseInt(peliculaId) <= 0) {
      mostrarMensaje('El ID de película debe ser un número positivo');
      return;
    }
    try {
      await axios.post('http://localhost:8000/personajes', { 
        nombre: nombrePersonaje, 
        pelicula_id: parseInt(peliculaId) 
      });
      setNombrePersonaje('');
      setPeliculaId('');
      fetchPersonajes();
      mostrarMensaje('Personaje agregado exitosamente');
    } catch (error) {
      mostrarMensaje('Error al agregar personaje');
    }
  };

  const mostrarMensaje = (mensaje) => {
    setSnackbarMessage(mensaje);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
        Gestión de Películas y Personajes
      </Typography>

      <Grid container spacing={4}>
        {/* Sección de Películas */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MovieIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h5" component="h2">
                  Películas
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleAddPelicula} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Título"
                  value={titulo}
                  onChange={e => setTitulo(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Año"
                  type="number"
                  value={anio}
                  onChange={e => setAnio(e.target.value)}
                  margin="normal"
                  required
                  inputProps={{ min: 1 }}
                  helperText="Ingrese un año válido (número positivo)"
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Agregar Película
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Título</TableCell>
                      <TableCell>Año</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {peliculas.map(p => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.titulo}</TableCell>
                        <TableCell>{p.anio}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sección de Personajes */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h5" component="h2">
                  Personajes
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleAddPersonaje} sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Nombre del Personaje"
                  value={nombrePersonaje}
                  onChange={e => setNombrePersonaje(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="ID de Película"
                  type="number"
                  value={peliculaId}
                  onChange={e => setPeliculaId(e.target.value)}
                  margin="normal"
                  required
                  inputProps={{ min: 1 }}
                  helperText="Ingrese un ID válido (número positivo)"
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Agregar Personaje
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Película ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {personajes.map(p => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.nombre}</TableCell>
                        <TableCell>{p.pelicula_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;