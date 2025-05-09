const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const citasRoutes = require('./routes/citas');
const ventasRoutes = require('./routes/ventas');
const vehiculosRoutes = require('./routes/vehiculos');
const pagosRoutes = require('./routes/pagos');

app.use(cors());
app.use(express.json());

app.use('/api/citas', citasRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/pagos', pagosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
