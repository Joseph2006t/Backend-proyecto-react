import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import router from './routes.mjs';

const app = express(); // permite crear servidores con rutas
const httpServer = createServer(app); // aqui el cliente puede hacer primero una peticion

// Configura CORS para permitir solicitudes desde cualquier origen
// desde cualquier punto de coneccion permite hacer esas acciones
app.use(cors({
    origin: '*', // Permite todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// los archivos json puedan leer el servidor
app.use(express.json());

app.use((req, res, next) => {
    next();
});
//dependiendo que que url se ingrese hara una diferente acción
app.use('/api', router);

const port = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado por el entorno
httpServer.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});