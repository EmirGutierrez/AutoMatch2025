(() => {
  const ventasApi = "http://localhost:8889/ventas";
  const form = document.getElementById('venta');

  if (form) {
    console.error('Formulario no encontrado con id: venta');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

   const payload = {
  id_cliente: parseInt(fd.get('cliente_id'), 10),
  id_vehiculo: parseInt(fd.get('vehiculo_id'), 10),
  fecha_venta: fd.get('fecha_venta'),
  precio: parseFloat(fd.get('precio')),
  vendedor: fd.get('vendedor'),
  id_usuario: parseInt(fd.get('id_usuario'), 10)
};


    console.log("Enviando payload:", payload);

    try {
      const res = await fetch(ventasApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log('Venta registrada:', data);
      alert(`Venta registrada con ID: ${data.id_venta}`);

      form.reset();
    } catch (err) {
      console.error('Error al registrar venta:', err);
      alert('Hubo un error al registrar la venta. Revisa la consola.');
    }
  });
})();
