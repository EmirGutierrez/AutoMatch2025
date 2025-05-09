const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'Emir',             // Tu usuario de PostgreSQL
    host: 'AutoMatch',        // El host definido en Docker
    database: 'automatch_db', // Nombre de tu base de datos en PostgreSQL
    password: 'cmo',         // Tu contraseña de PostgreSQL
    port: 5446                // Puerto expuesto por Docker (antes era 5432)
});

// Ruta para obtener datos de la tabla "usuarios"
app.get('/datos-completos', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                ve.id_vehiculo, ve.marca, ve.modelo, ve.anio, ve.precio,
                v.id_venta, v.fecha_venta, v.vendedor,
                c.id_cliente, c.nombre AS cliente, c.correo,
                u.id_usuario, u.nombre AS usuario, u.rol,
                co.id_cotizacion, co.fecha_cotizacion, co.monto_cotizacion,
                vi.id_visita, vi.fecha_visita, vi.observaciones,
                p.id_pago, p.monto, p.metodo_pago, p.fecha_pago
            FROM vehiculos ve
            LEFT JOIN ventas v ON ve.id_vehiculo = v.id_vehiculo
            LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
            LEFT JOIN usuarios u ON v.vendedor = u.id_usuario
            LEFT JOIN cotizaciones co ON c.id_cliente = co.id_cliente
            LEFT JOIN visitas vi ON c.id_cliente = vi.id_cliente
            LEFT JOIN pagos p ON v.id_venta = p.id_venta
        `);

        app.post('/clientes', async (req, res) => {
    const { nombre, correo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nombre, correo) VALUES ($1, $2) RETURNING *',
            [nombre, correo]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        res.status(500).json({ error: error.message });
    }
});
fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre: 'Juan', correo: 'juan@example.com' })
})
.then(response => response.json())
.then(data => console.log('Cliente guardado:', data))
.catch(error => console.error('Error:', error));

        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener datos completos:', error);
        res.status(500).json({ error: error.message });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
