document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo: cargar lista de citas (reemplazar con fetch real)
  const listaCitas = document.getElementById('lista-citas');
  listaCitas.innerHTML = `
    <table>
      <thead><tr><th>Cliente</th><th>Fecha</th><th>Hora</th><th>Notas</th></tr></thead>
      <tbody><tr><td>Juan Pérez</td><td>2025-05-10</td><td>10:00</td><td>Revisión general</td></tr></tbody>
    </table>
  `;

  // Manejo del formulario de nueva cita
  document.getElementById('form-cita').addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log('Enviar cita al backend:', data);
    // Aquí puedes usar fetch() para enviar los datos a una API
    e.target.reset();
  });

  // Agrega eventos similares para los demás formularios (ventas, vehículos, pagos)...
});
