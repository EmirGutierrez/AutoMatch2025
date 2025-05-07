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

//CONTENIDO VEHICULOS 

document.addEventListener('DOMContentLoaded', function() {
  const tarjetasVehiculo = document.querySelectorAll('.tarjeta-vehiculo');
  const detallesVehiculoDiv = document.getElementById('detalles-vehiculo');

  tarjetasVehiculo.forEach(tarjeta => {
    const botonDetalles = tarjeta.querySelector('.ver-detalles');
    botonDetalles.addEventListener('click', function() {
      const vehiculoId = tarjeta.dataset.id;
      mostrarDetallesVehiculo(vehiculoId);
    });
  });

  function mostrarDetallesVehiculo(id) {
    // Aquí simularíamos la obtención de datos detallados del vehículo
    let detalles = {};
    if (id === 'vehiculo-1') {
      detalles = {
        nombre: 'Toyota Corolla (2022)',
        precio: 'Q125,000',
        kilometraje: '35,000 km',
        transmision: 'Automática',
        motor: '1.8L 4 cilindros',
        caracteristicas: ['Aire acondicionado', 'Sistema de navegación', 'Cámara de reversa', 'Bolsas de aire']
      };
    } else if (id === 'vehiculo-2') {
      detalles = {
        nombre: 'Honda Civic (2023)',
        precio: 'Q147,000',
        kilometraje: '20,000 km',
        transmision: 'Manual',
        motor: '2.0L 4 cilindros',
        caracteristicas: ['Techo solar', 'Asientos de cuero', 'Apple CarPlay/Android Auto', 'Control de crucero adaptativo']
      };
    } else if (id === 'vehiculo-3') {
      detalles = {
        nombre: 'Ford F-150 (2021)',
        precio: 'Q145,000',
        kilometraje: '50,000 km',
        transmision: 'Automática',
        motor: '3.5L V6 EcoBoost',
        caracteristicas: ['Tracción 4x4', 'Pantalla táctil grande', 'Sensores de estacionamiento', 'Estribos eléctricos']
      };
    }

    // Construir el HTML para mostrar los detalles
    let detallesHTML = `
      <div class="detalles-vehiculo">
        <h5>${detalles.nombre}</h5>
        <p><strong>Precio:</strong> ${detalles.precio}</p>
        <p><strong>Kilometraje:</strong> ${detalles.kilometraje}</p>
        <p><strong>Transmisión:</strong> ${detalles.transmision}</p>
        <p><strong>Motor:</strong> ${detalles.motor}</p>
        <p><strong>Características:</strong></p>
        <ul>
          ${detalles.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
        </ul>
        <button class="cerrar-detalles">Cerrar Detalles</button>
      </div>
    `;

    detallesVehiculoDiv.innerHTML = detallesHTML;
    detallesVehiculoDiv.classList.remove('detalles-ocultos');

    // Agregar evento para cerrar los detalles
    const botonCerrar = detallesVehiculoDiv.querySelector('.cerrar-detalles');
    botonCerrar.addEventListener('click', function() {
      detallesVehiculoDiv.innerHTML = '';
      detallesVehiculoDiv.classList.add('detalles-ocultos');
    });

    function mostrarDetallesVehiculo(id) {
      let detalles = {};
      if (id === 'vehiculo-1') {
          detalles = {
              nombre: 'Toyota Corolla (2022)',
              precio: 'Q125,000',
              kilometraje: '35,000 km',
              transmision: 'Automática',
              motor: '1.8L 4 cilindros',
              caracteristicas: ['Aire acondicionado', 'Sistema de navegación', 'Cámara de reversa', 'Bolsas de aire'],
              imagenSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigcME9F_l21P4wPvF6xYOGnT5zDxmrcMtMg&s'
          };
      } else if (id === 'vehiculo-2') {
          detalles = {
              nombre: 'Honda Civic (2023)',
              precio: 'Q147,000',
              kilometraje: '20,000 km',
              transmision: 'Manual',
              motor: '2.0L 4 cilindros',
              caracteristicas: ['Techo solar', 'Asientos de cuero', 'Apple CarPlay/Android Auto', 'Control de crucero adaptativo'],
              imagenSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN01sE-3z4Vcxo4UeXOIwbCpGwFQZ8wafJ2w&s'
          };
      } else if (id === 'vehiculo-3') {
          detalles = {
              nombre: 'Ford F-150 (2021)',
              precio: 'Q145,000',
              kilometraje: '50,000 km',
              transmision: 'Automática',
              motor: '3.5L V6 EcoBoost',
              caracteristicas: ['Tracción 4x4', 'Pantalla táctil grande', 'Sensores de estacionamiento', 'Estribos eléctricos'],
              imagenSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5z4aRYyln7SYWgje-mW3N5lQUKOggucPQrw&s'
          };
      }
  
      // Construir el HTML para mostrar los detalles con la imagen
      let detallesHTML = `
          <div class="detalles-vehiculo">
              <div class="detalles-header">
                  <h5>${detalles.nombre}</h5>
                  <img src="${detalles.imagenSrc}" alt="${detalles.nombre}" class="imagen-detalle-vehiculo">
              </div>
              <p><strong>Precio:</strong> ${detalles.precio}</p>
              <p><strong>Kilometraje:</strong> ${detalles.kilometraje}</p>
              <p><strong>Transmisión:</strong> ${detalles.transmision}</p>
              <p><strong>Motor:</strong> ${detalles.motor}</p>
              <p><strong>Características:</strong></p>
              <ul>
                  ${detalles.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
              </ul>
              <button class="cerrar-detalles">Cerrar Detalles</button>
          </div>
      `;
  
      detallesVehiculoDiv.innerHTML = detallesHTML;
      detallesVehiculoDiv.classList.remove('detalles-ocultos');
  
      const botonCerrar = detallesVehiculoDiv.querySelector('.cerrar-detalles');
      botonCerrar.addEventListener('click', function() {
          detallesVehiculoDiv.innerHTML = '';
          detallesVehiculoDiv.classList.add('detalles-ocultos');
      });
  }

  }
});