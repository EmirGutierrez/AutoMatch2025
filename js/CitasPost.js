console.log("AutoMatch cargado correctamente.");

document.addEventListener('DOMContentLoaded', () => {
  // — navegación de pestañas (igual que antes) —
  /* … código de setActiveTab … */

  // — obtención de nodos —
  const diasDiv            = document.getElementById('dias');
  const currentMonthH2     = document.getElementById('current-month');
  const prevMonthBtn       = document.getElementById('prev-month');
  const nextMonthBtn       = document.getElementById('next-month');
  const agendarCitaBtn     = document.getElementById('agendar-cita-btn');
  const modalAgendar       = document.getElementById('modal-agendar');
  const cerrarModalSpan    = modalAgendar.querySelector('.cerrar-modal');
  const fechaSeleccionadaP = document.getElementById('fecha-seleccionada');
  const selectHora         = document.getElementById('hora-cita');
  const selectMotivo       = document.getElementById('motivo-cita');
  const textareaNotas      = document.getElementById('notas-cita');
  const responseMsg        = document.getElementById('responseMessageCitas');
  const formCitas          = document.getElementById('citas');

  let currentDate   = new Date();
  let selectedDate;
  let citasOcupadas = [];

  // 1) Traer todas las citas del backend
  fetch('http://localhost:8889/cita')
    .then(res => res.json())
    .then(data => {
      // data es un array de objetos Cita { id_visita, id_cliente, fecha, hora, motivo, notas }
      citasOcupadas = data.map(c => ({
        fecha: c.fecha,   // e.g. "2024-01-15"
        hora:  c.hora     // e.g. "10:00:00"
      }));
      mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth());
    })
    .catch(err => {
      console.warn('No se pudo cargar las citas existentes:', err);
      mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth());
    });

  // Helper para crear rango de horas según día
  function populateHoras(date) {
    selectHora.innerHTML = '';
    const dow = date.getDay();
    let inicio = 8, fin = 18;
    if (dow === 6) fin = 12;      // sábado hasta 12
    if (dow === 0) {             // domingo cerrado
      selectHora.innerHTML = '<option value="">Cerrado</option>';
      selectHora.disabled = true;
      return;
    }
    selectHora.disabled = false;
    for (let h = inicio; h < fin; h++) {
      const hh = `${String(h).padStart(2,'0')}:00`;
      const o  = document.createElement('option');
      o.value = hh;
      o.textContent = hh;
      selectHora.appendChild(o);
    }
  }

  function mostrarCalendario(year, month) {
    currentDate = new Date(year, month);
    const primerDia = new Date(year, month, 1).getDay();
    const diasMes   = new Date(year, month+1, 0).getDate();

    currentMonthH2.textContent =
      new Intl.DateTimeFormat('es-GT',{ month:'long', year:'numeric' })
        .format(currentDate);
    diasDiv.innerHTML = '';

    ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
      .forEach(d => {
        const hd = document.createElement('div');
        hd.textContent = d;
        hd.classList.add('header-dia');
        diasDiv.appendChild(hd);
      });

    for (let i=0; i<primerDia; i++) diasDiv.appendChild(document.createElement('div'));

    for (let d=1; d<=diasMes; d++) {
      const diaDiv = document.createElement('div');
      diaDiv.textContent = d;
      diaDiv.classList.add('dia');

      const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dow = new Date(year, month, d).getDay();
      const ocupado = citasOcupadas.some(c => c.fecha === iso);

      if (dow === 0) {
        diaDiv.classList.add('cerrado');
      } else if (ocupado) {
        diaDiv.classList.add('ocupado');
      } else {
        diaDiv.addEventListener('click', () => {
          selectedDate = new Date(year, month, d);

          // — set fecha en hidden para POST —
          const yyyy = selectedDate.getFullYear();
          const mm   = String(selectedDate.getMonth()+1).padStart(2,'0');
          const dd   = String(selectedDate.getDate()).padStart(2,'0');
          document.getElementById('fechaCita').value = `${yyyy}-${mm}-${dd}`;

          populateHoras(selectedDate);
          fechaSeleccionadaP.textContent =
            `Fecha Seleccionada: ${new Intl.DateTimeFormat('es-GT',{
              day:'numeric',month:'long',year:'numeric'
            }).format(selectedDate)}`;

          selectMotivo.selectedIndex = 0;
          textareaNotas.value = '';
          responseMsg.style.display = 'none';
          modalAgendar.style.display = 'block';
        });
      }

      diasDiv.appendChild(diaDiv);
    }
  }

  function navegarMes(offset) {
    mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth()+offset);
  }

  prevMonthBtn.addEventListener('click', () => navegarMes(-1));
  nextMonthBtn.addEventListener('click', () => navegarMes( 1));

  agendarCitaBtn.addEventListener('click', () => {
    const hoy = new Date();
    selectedDate = hoy;
    const yyyy = hoy.getFullYear();
    const mm   = String(hoy.getMonth()+1).padStart(2,'0');
    const dd   = String(hoy.getDate()).padStart(2,'0');
    document.getElementById('fechaCita').value = `${yyyy}-${mm}-${dd}`;

    populateHoras(hoy);
    fechaSeleccionadaP.textContent =
      `Fecha Seleccionada: ${new Intl.DateTimeFormat('es-GT',{
        day:'numeric',month:'long',year:'numeric'
      }).format(hoy)}`;

    selectMotivo.selectedIndex = 0;
    textareaNotas.value = '';
    responseMsg.style.display = 'none';
    modalAgendar.style.display = 'block';
  });

  cerrarModalSpan.addEventListener('click', () => modalAgendar.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modalAgendar) modalAgendar.style.display = 'none';
  });

  // — POST a /cita —
  formCitas.addEventListener('submit', async e => {
    e.preventDefault();
    const cita = {
      id_cliente: parseInt(document.getElementById('idCliente').value, 10),
      fecha:      document.getElementById('fechaCita').value,
      hora:       selectHora.value,
      motivo:     selectMotivo.value,
      notas:      textareaNotas.value.trim()
    };

    try {
      const res  = await fetch('http://localhost:8889/cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita)
      });
      const data = await res.json();

      if (res.ok) {
        responseMsg.textContent = `✅ Cita agendada con ID: ${data.id_visita}`;
        responseMsg.className   = 'success';
        citasOcupadas.push({ fecha: cita.fecha, hora: cita.hora });
        mostrarCalendario(currentDate.getFullYear(), currentDate.getMonth());
        setTimeout(() => modalAgendar.style.display = 'none', 1500);
      } else {
        responseMsg.textContent = `❌ ${data.message || res.statusText}`;
        responseMsg.className   = 'error';
      }
    } catch (err) {
      responseMsg.textContent = `⚠️ Error de red: ${err.message}`;
      responseMsg.className   = 'error';
    } finally {
      responseMsg.style.display = 'block';
    }
  });
});
    