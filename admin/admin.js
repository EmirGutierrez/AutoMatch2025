console.log("AutoMatch cargado correctamente.");

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname; // Obtiene la ruta del archivo actual

  // Función para establecer la pestaña activa
  function setActiveTab() {
    const currentHash = window.location.hash || ''; // Manteniendo la lógica del hash
    document.querySelectorAll('.wp-nav-links a').forEach(link => {
      // Comprueba si el href coincide con la ruta actual O con el hash
      const linkPath = new URL(link.href, window.location.origin).pathname;
      const isActivePage = linkPath === currentPage;
      const isActiveHash = link.getAttribute('href') === currentHash;

      link.classList.toggle('active-tab', isActivePage || isActiveHash);
    });
  }

  // Establecer pestaña activa al cargar la página
  setActiveTab();

  // Manejar clics en las pestañas (manteniendo tu lógica para el scroll suave y hash)
  document.querySelectorAll('.wp-nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, href);
          setActiveTab(); // Actualizar la pestaña activa después de navegar por hash
        }
      }
    });
  });

  // Manejar cambios en la URL (navegación atrás/adelante)
  window.addEventListener('popstate', setActiveTab);
});

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
// admin.js
const MODULES = {
  ventas: {
    url: 'http://localhost:8889/ventas',
    columns: ['idVenta','idCliente','idVehiculo','fechaVenta','vendedor','idUsuario'],
    listContainer: 'lista-ventas',
    formId: 'form-venta',
    fieldMap: {
      cliente_id: 'idCliente',
      vehiculo_id: 'idVehiculo',
      fecha_venta: 'fechaVenta',
      precio: 'montoTotal'
    }
  },
  vehiculos: {
    url: 'http://localhost:8889/vehiculo',
    columns: ['idVehiculo','marca','modelo','anio','precio','estado','imagenUrl'],
    listContainer: 'lista-vehiculos',
    formId: 'form-vehiculo',
    fieldMap: { marca: 'marca', modelo: 'modelo', anio: 'anio', precio: 'precio', estado: 'estado' }
  },
  pagos: {
    url: 'http://localhost:8889/pagos',
    columns: ['idPago','idVenta','monto','metodoPago','fechaPago'],
    listContainer: 'lista-pagos',
    formId: 'form-pago',
    fieldMap: { venta_id: 'idVenta', monto: 'monto', metodo_pago: 'metodoPago', fecha_pago: 'fechaPago' }
  },
  clientes: {
    url: 'http://localhost:8889/clientes',
    columns: ['idCliente','nombre','correo','telefono','direccion'],
    listContainer: 'lista-clientes',
    formId: 'form-cliente',
    fieldMap: { nombre_cliente: 'nombre', email_cliente: 'correo', telefono_cliente: 'telefono' }
  }
};

async function cargar(moduleKey) {
  const cfg = MODULES[moduleKey];
  const cont = document.getElementById(cfg.listContainer);
  cont.innerHTML = 'Cargando…';
  try {
    const resp = await fetch(cfg.url);
    const items = await resp.json();
    cont.innerHTML = items.map(item =>
      `<div>${cfg.columns.map(c=>`${c}: ${item[c]}`).join(' | ')}</div>`
    ).join('');
  } catch (e) {
    cont.innerHTML = 'Error al cargar';
    console.error(e);
  }
}

function bindForm(moduleKey) {
  const cfg = MODULES[moduleKey];
  document.getElementById(cfg.formId)
    .addEventListener('submit', async e => {
      e.preventDefault();
      const data = {};
      Object.entries(cfg.fieldMap).forEach(([inputName, prop]) => {
        data[prop] = e.target.elements[inputName].value;
      });
      try {
        const resp = await fetch(cfg.url, {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(data)
        });
        if (!resp.ok) throw new Error(resp.statusText);
        e.target.reset();
        cargar(moduleKey);
      } catch (err) {
        console.error(err);
        alert('Error al guardar');
      }
    });
}

// Al cargar la página, inicializa cada módulo
window.addEventListener('DOMContentLoaded', () => {
  Object.keys(MODULES).forEach(key => {
    cargar(key);
    bindForm(key);
  });
});

  // Agrega eventos similares para los demás formularios (ventas, vehículos, pagos)...
});
