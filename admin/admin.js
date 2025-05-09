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

  // Agrega eventos similares para los demás formularios (ventas, vehículos, pagos)...
});
