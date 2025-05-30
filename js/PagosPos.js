(() => {
  const pagosApi = "http://localhost:8889/pagos";
  const form = document.getElementById('pago');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      id_venta: parseInt(fd.get('venta_id'), 10),
      monto: parseFloat(fd.get('monto')),
      metodo_pago: fd.get('metodo_pago'),
      fecha_pago: fd.get('fecha_pago')
    };

    console.log("Enviando payload:", payload);

    try {
      const res = await fetch(pagosApi, {
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
        console.log('Pago registrado:', data);
        alert(`Pago registrado con ID: ${data.id_pago}`);
      } else {
        const text = await res.text();
        console.log('Respuesta texto:', text);
        alert(text);
      }

      form.reset();
    } catch(err) {
      console.error('Error al registrar pago:', err);
      alert('Hubo un error al registrar el pago. Revisa la consola.');
    }
  });
})();
