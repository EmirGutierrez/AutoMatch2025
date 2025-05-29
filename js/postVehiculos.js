// postVehiculos.js
(() => {
  const vehiculoApi = "http://localhost:8889/vehiculo";
  const form = document.getElementById('vehiculo');  // o 'vehiculo' si así lo nombraste

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      marca:  fd.get('marca'),
      modelo: fd.get('modelo'),
      anio:   parseInt(fd.get('anio'), 10),
      precio: parseFloat(fd.get('precio')),
      estado: fd.get('estado')
    };

    console.log("🚀 Enviando payload:", payload);

    try {
      const res = await fetch(vehiculoApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        console.log('Vehículo creado:', data);
        alert(`Vehículo creado: ${data.marca} ${data.modelo}`);
      } else {
        const text = await res.text();
        console.log('Respuesta texto:', text);
        alert(text);
      }

      form.reset();
    } catch(err) {
      console.error('Error al crear vehículo:', err);
      alert('Hubo un error al agregar el vehículo. Revisa la consola.');
    }
  });
})();

