// js/calendario.js

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Referencias a elementos del DOM
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const currentMonthEl = document.getElementById('current-month');
  const diasContainer = document.getElementById('dias');
  const agendarCitaBtn = document.getElementById('agendar-cita-btn');
  const modalAgendar = document.getElementById('modal-agendar');
  const cerrarModalSpan = document.querySelector('.cerrar-modal');
  const formCitas = document.getElementById('citas');
  const fechaSeleccionadaP = document.getElementById('fecha-seleccionada');
  const inputFechaHidden = document.getElementById('fechaCita');
  const selectHora = document.getElementById('hora-cita');
  const responseMessage = document.getElementById('responseMessageCitas');

  // Fecha actual para construir el calendario
  let fechaActual = new Date();

  // ---------------- Función para renderizar el calendario ----------------
  function renderizarCalendario() {
    // Primer día del mes
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const primerDiaMes = new Date(año, mes, 1).getDay(); // 0 (domingo) a 6 (sábado)
    const diasEnMes = new Date(año, mes + 1, 0).getDate(); // número de días en este mes

    // Mostrar nombre de mes y año (en español)
    const mesesNombre = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    currentMonthEl.textContent = `${mesesNombre[mes]} ${año}`;

    // Limpiar días anteriores
    diasContainer.innerHTML = '';


    for (let i = 0; i < primerDiaMes; i++) {
      const celdaVacia = document.createElement('div');
      celdaVacia.classList.add('dia', 'dia-vacio');
      diasContainer.appendChild(celdaVacia);
    }

    for (let diaNum = 1; diaNum <= diasEnMes; diaNum++) {
      const celdaDia = document.createElement('div');
      celdaDia.classList.add('dia');
      celdaDia.textContent = diaNum;


      const fechaStr = formatearFechaYYYYMMDD(año, mes + 1, diaNum);
      if (tieneCitaEnFecha(fechaStr)) {
        celdaDia.classList.add('dia-con-cita');
      }


      celdaDia.addEventListener('click', () => {
        abrirModalParaFecha(año, mes, diaNum);
      });

      diasContainer.appendChild(celdaDia);
    }
  }

  function formatearFechaYYYYMMDD(año, mes, dia) {
    const mm = String(mes).padStart(2, '0');
    const dd = String(dia).padStart(2, '0');
    return `${año}-${mm}-${dd}`;
  }

  // ---------------- Manejo de Modal ----------------
  function abrirModalParaFecha(año, mesIndex, diaNum) {
    // mesIndex es 0-based; para formatear usamos mesIndex+1
    const fechaStr = formatearFechaYYYYMMDD(año, mesIndex + 1, diaNum);
    inputFechaHidden.value = fechaStr;
    fechaSeleccionadaP.textContent = `Fecha seleccionada: ${diaNum} de ${fechaActual.toLocaleString('es-ES', { month: 'long' })} ${año}`;
    // Resetear campos del formulario
    responseMessage.textContent = '';
    formCitas.reset();
    llenarHoras();
    modalAgendar.style.display = 'block';
  }

  function cerrarModal() {
    modalAgendar.style.display = 'none';
  }

  // Cerrar modal al hacer click en la "X"
  cerrarModalSpan.addEventListener('click', cerrarModal);

  // Cerrar modal si se hace click fuera del contenido del modal
  window.addEventListener('click', (e) => {
    if (e.target === modalAgendar) {
      cerrarModal();
    }
  });

  // ---------------- Generar opciones de hora para el select ----------------
  function llenarHoras() {
    selectHora.innerHTML = ''; // Limpiar opciones previas

    // Por ejemplo, de 09:00 a 17:00 cada 30 minutos
    const horaInicio = 9;
    const horaFin = 17;
    const intervalMinutos = 30;

    for (let h = horaInicio; h <= horaFin; h++) {
      for (let m = 0; m < 60; m += intervalMinutos) {
        const opcion = document.createElement('option');
        const horaStr = String(h).padStart(2, '0');
        const minStr = String(m).padStart(2, '0');
        opcion.value = `${horaStr}:${minStr}`;
        opcion.textContent = `${horaStr}:${minStr}`;
        selectHora.appendChild(opcion);
      }
    }
  }

  // ---------------- Guardar cita en localStorage ----------------
  function guardarCitaEnLocalStorage(cita) {
    // Obtener array actual o crear uno nuevo
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    citasGuardadas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));
  }

  // ---------------- Verificar si ya existe cita en la fecha dada ----------------
  function tieneCitaEnFecha(fechaYYYYMMDD) {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    return citasGuardadas.some(cita => cita.fecha === fechaYYYYMMDD);
  }

  // ---------------- Manejador de envío del formulario ----------------
  formCitas.addEventListener('submit', (e) => {
    e.preventDefault();
    const fecha = inputFechaHidden.value;
    const hora = selectHora.value;
    const motivo = document.getElementById('motivo-cita').value;
    const notas = document.getElementById('notas-cita').value.trim();

    // Validación mínima
    if (!fecha || !hora) {
      responseMessage.textContent = 'Debes seleccionar una fecha y hora válidas.';
      responseMessage.style.color = 'red';
      return;
    }

    // Construir objeto cita
    const nuevaCita = {
      fecha,   // "YYYY-MM-DD"
      hora,    // "HH:MM"
      motivo,  // texto
      notas    // texto
      // puedes agregar más campos si lo deseas
    };

    // Guardar en localStorage
    guardarCitaEnLocalStorage(nuevaCita);

    // Mostrar mensaje de éxito
    responseMessage.textContent = '¡Cita guardada correctamente!';
    responseMessage.style.color = 'green';

    // Actualizar estilo del día en el calendario (para resaltar que ya hay cita)
    renderizarCalendario();

    // Cerrar modal después de 1.5 segundos
    setTimeout(() => {
      cerrarModal();
    }, 1500);
  });

  // ---------------- Navegación entre meses ----------------
  prevMonthBtn.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderizarCalendario();
  });
  nextMonthBtn.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderizarCalendario();
  });

  // ---------------- Botón "Agendar Cita" abre el modal sin fecha fija ----------------
  agendarCitaBtn.addEventListener('click', () => {
    // Si el usuario hace click aquí, se abre el modal para la fecha de hoy
    const hoy = new Date();
    abrirModalParaFecha(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  });

  // ---------------- Inicialización ----------------
  renderizarCalendario();
});
