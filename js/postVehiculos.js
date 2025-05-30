// postVehiculos.js
console.log("postVehiculos.js cargado");

window.addEventListener('DOMContentLoaded', () => {
  const vehiculoApi = 'http://localhost:8889/vehiculo';
  const form        = document.getElementById('vehiculo');
  const listaDiv    = document.getElementById('lista-vehiculos');

  if (!form) {
    console.error("No encontré <form id='vehiculo'>");
    return;
  }
  console.log("Formulario 'vehiculo' encontrado");

  async function cargarVehiculos() {
    console.log("🔄 Cargando lista de vehículos…");
    try {
      const res = await fetch(vehiculoApi);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const vehiculos = await res.json();
      console.log("Vehículos recibidos:", vehiculos);

      // Render tabla…
      listaDiv.innerHTML = '';
      /* … resto del render … */
    } catch (err) {
      console.error("Error al cargar vehículos:", err);
    }
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    console.log("Formulario enviado");

    const fd = new FormData(form);
    const payload = {
      marca:  fd.get('marca'),
      modelo: fd.get('modelo'),
      anio:   parseInt(fd.get('anio'), 10),
      precio: parseFloat(fd.get('precio')),
      estado: fd.get('estado')
    };
    console.log("Payload a enviar:", payload);

    try {
      const res = await fetch(vehiculoApi, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
      });
      console.log("Respuesta del POST:", res.status);
      // … resto del manejo …
      await cargarVehiculos();
    } catch (err) {
      console.error("Error al crear vehículo:", err);
    }
  });

  cargarVehiculos();
});
