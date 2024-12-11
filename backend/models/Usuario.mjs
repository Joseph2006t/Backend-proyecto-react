
import { pool } from "../conexion.mjs";

// Crear un producto nuevo
export const createCliente = async (userData, callback) => {
    const { nombres, apellidos, nro_documento, telefono, email,password1 } = userData; // Destructuramos stock e img directamente

    if (!nombres || !apellidos || !nro_documento || !email || !password1 == null) {
        return callback({ message: 'Faltan datos requeridos' }, null);
    }

    // Consulta SQL para insertar un nuevo producto, incluyendo el campo stock y la URL de la imagen
    const query = `
        INSERT INTO usuarios (nombres, apellidos, nro_documento, telefono, email, password1)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;

    // Usamos directamente la URL que viene en el campo img
    const values = [nombres, apellidos, nro_documento,telefono,email, password1];

    try {
        const res = await pool.query(query, values); // Ejecutamos la consulta
        
        if (res.rowCount > 0) {
            callback(null, { message: 'Cliente creado exitosamente' });
        }
    } catch (err) {
        console.error('Error al crear el producto:', err);
        callback(err,null); // En caso de error, lo devolvemos al controlador
    }
};


export const login = async (loginData, callback)=>{

    const { nro_documento, password1 } = loginData;

    if (!nro_documento || !password1 == null) {
        return callback({ message: 'Faltan datos requeridos' }, null);
    }

    // Consulta SQL para insertar un nuevo producto, incluyendo el campo stock y la URL de la imagen
    const query = `
        SELECT * 
        FROM usuarios
        WHERE nro_documento = $1 AND password1 = $2;
    `;

    // Usamos directamente la URL que viene en el campo img
    const values = [nro_documento, password1];

    try {
        const res = await pool.query(query, values); // Ejecutamos la consulta
        if (res.rows.length > 0) {
            const user = res.rows[0]; // Obtenemos el primer usuario encontrado
            callback(null, { message: 'Login exitoso', user });
        } else {
            callback({ message: 'Credenciales incorrectas' }, null);
        }
    } catch (err) {
        console.error('Error en el login:', err);
        callback(err, null); // En caso de error, lo devolvemos al controlador
    }
}