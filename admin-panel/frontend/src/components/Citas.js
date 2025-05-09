import React, { useEffect, useState } from 'react';

function Citas() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/citas')
      .then(res => res.json())
      .then(data => setCitas(data));
  }, []);

  return (
    <div>
      <h2>Citas Programadas</h2>
      <ul>
        {citas.map(cita => (
          <li key={cita.id_visita}>
            Cliente: {cita.id_cliente} - Fecha: {cita.fecha} Hora: {cita.hora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;
