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

// CALENDARIO

document.addEventListener('DOMContentLoaded', function() {
  const agendarCitaBtn = document.getElementById('agendar-cita-btn');
  const calendarioDiv = document.getElementById('calendario');
  const diasDiv = document.getElementById('dias');
  const currentMonthH2 = document.getElementById('current-month');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const modalAgendar = document.getElementById('modal-agendar');
  const cerrarModalSpan = modalAgendar.querySelector('.cerrar-modal');
  const fechaSeleccionadaP = document.getElementById('fecha-seleccionada');
  const guardarCitaBtn = document.getElementById('guardar-cita-btn');
  const horaCitaSelect = document.getElementById('hora-cita');
  const mensajeCitaDiv = document.getElementById('mensaje-cita');

  let currentDate = new Date();
  let selectedDate;
  let citasOcupadas = []; // Aquí se almacenarían las citas obtenidas de la base de datos

  // Simulación de citas ocupadas (reemplazar con datos de la base de datos)

  function mostrarCalendario(year, month) {
      currentDate = new Date(year, month);
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const dayOfWeekOfFirstDay = firstDayOfMonth.getDay(); // 0 (Domingo) - 6 (Sábado)

      currentMonthH2.textContent = new Intl.DateTimeFormat('es-GT', { month: 'long', year: 'numeric' }).format(currentDate);
      diasDiv.innerHTML = '';

      const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      diasSemana.forEach(dia => {
          const headerDia = document.createElement('div');
          headerDia.textContent = dia;
          headerDia.classList.add('header-dia');
          diasDiv.appendChild(headerDia);
      });

      for (let i = 0; i < dayOfWeekOfFirstDay; i++) {
          const emptyDiv = document.createElement('div');
          diasDiv.appendChild(emptyDiv);
      }

      for (let i = 1; i <= daysInMonth; i++) {
          const diaDiv = document.createElement('div');
          diaDiv.textContent = i;
          diaDiv.classList.add('dia');
          const fechaActual = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

          const citaOcupadaEnEsteDia = citasOcupadas.some(cita => cita.fecha === fechaActual);
          if (citaOcupadaEnEsteDia) {
              diaDiv.classList.add('ocupado');
          } else {
              diaDiv.addEventListener('click', () => {
                  if (modalAgendar.style.display === 'block') return; // No abrir modal si ya está abierto
                  selectedDate = new Date(year, month, i);
                  fechaSeleccionadaP.textContent = `Fecha Seleccionada: ${new Intl.DateTimeFormat('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }).format(selectedDate)}`;
                  modalAgendar.style.display = 'block';
              });
          }
          diasDiv.appendChild(diaDiv);
      }
  }

  function navegarMes(direccion) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const newMonth = currentMonth + direccion;
      mostrarCalendario(new Date(currentYear, newMonth).getFullYear(), new Date(currentYear, newMonth).getMonth());
  }

  prevMonthBtn.addEventListener('click', () => navegarMes(-1));
  nextMonthBtn.addEventListener('click', () => navegarMes(1));

  agendarCitaBtn.addEventListener('click', () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = new Date().getDate(); // Mostrar el día actual al abrir directamente
      selectedDate = new Date(year, month, day);
      fechaSeleccionadaP.textContent = `Fecha Seleccionada: ${new Intl.DateTimeFormat('es-GT', { day: 'numeric', month: 'long', year: 'numeric' }).format(selectedDate)}`;
      modalAgendar.style.display = 'block';
  });

  cerrarModalSpan.addEventListener('click', () => {
      modalAgendar.style.display = 'none';
      mensajeCitaDiv.textContent = '';
      mensajeCitaDiv.className = 'mensaje';
  });

  window.addEventListener('click', (event) => {
      if (event.target === modalAgendar) {
          modalAgendar.style.display = 'none';
          mensajeCitaDiv.textContent = '';
          mensajeCitaDiv.className = 'mensaje';
      }
  });

  guardarCitaBtn.addEventListener('click', () => {
      if (!selectedDate) {
          mensajeCitaDiv.textContent = 'Por favor, selecciona una fecha.';
          mensajeCitaDiv.classList.add('error');
          return;
      }
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const fechaCita = `${year}-${month}-${day}`;
      const horaCita = horaCitaSelect.value;

      // Simulación de envío a la base de datos (aquí iría tu fetch al backend)
      console.log('Guardando cita:', { fecha: fechaCita, hora: horaCita });
      mensajeCitaDiv.textContent = 'Cita agendada con éxito.';
      mensajeCitaDiv.classList.add('exito');

      // Simular que la cita ahora está ocupada y actualizar el calendario
      citasOcupadas.push({ fecha: fechaCita, hora: horaCita });
      mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth());

      // Ocultar el modal después de guardar (opcional)
      setTimeout(() => {
          modalAgendar.style.display = 'none';
          mensajeCitaDiv.textContent = '';
          mensajeCitaDiv.className = 'mensaje';
      }, 1500);
  });

  // Mostrar el calendario al cargar la página
  mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth());
});