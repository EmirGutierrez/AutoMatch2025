(() => {
  const ventasApi = "http://localhost:8889/ventas";
  const form = document.getElementById('form-venta');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      id_cliente: parseInt(fd.get('cliente_id'), 10),
      id_vehiculo: parseInt(fd.get('vehiculo_id'), 10),
      fecha_venta: fd.get('fecha_venta'),
      precio: parseFloat(fd.get('precio'))
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

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        console.log('Venta registrada:', data);
        alert(`Venta registrada con ID: ${data.id_venta}`);
      } else {
        const text = await res.text();
        console.log('Respuesta texto:', text);
        alert(text);
      }

      form.reset();
    } catch(err) {
      console.error('Error al registrar venta:', err);
      alert('Hubo un error al registrar la venta. Revisa la consola.');
    }
  });
})();
