// VentasPost.js
window.addEventListener('DOMContentLoaded', () => {
  // 1) Obtenemos el form con id="ventas"
  const form = document.getElementById('ventas');
  if (!form) {
    console.error('No encontré <form id="ventas">');
    return;
  }

  const responseMessage = document.getElementById('responseMessage2');
  responseMessage.style.display = 'none';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // 2) Leemos los valores de tus inputs
    const venta = {
      idCliente:  parseInt(document.getElementById('idCliente').value, 10),
      idVehiculo: parseInt(document.getElementById('idVehiculo').value, 10),
      fechaVenta: document.getElementById('fechaVenta').value,
      vendedor:   document.getElementById('vendedor').value,
      idUsuario:  parseInt(document.getElementById('idUsuario').value, 10)
    };

    try {
      // 3) Hacemos el POST a /ventas
      const res = await fetch('http://localhost:8889/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venta)
      });
      const data = await res.json();

      if (res.ok) {
        responseMessage.textContent = `Venta registrada con ID: ${data.idVenta || data.id_venta}`;
        responseMessage.className = 'success';
      } else {
        responseMessage.textContent = `Error al guardar: ${data.message || res.statusText}`;
        responseMessage.className = 'error';
      }
    } catch (err) {
      responseMessage.textContent = `Error de red: ${err.message}`;
      responseMessage.className = 'error';
    } finally {
      responseMessage.style.display = 'block';
    }
  });
});
