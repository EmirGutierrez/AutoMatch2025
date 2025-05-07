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