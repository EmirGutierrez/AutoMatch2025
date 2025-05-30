// js/vehiculos.js
console.log("vehiculos.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  const API            = "http://localhost:8889/vehiculo";
  const grid           = document.querySelector(".vehiculos-grid");
  const detallesDiv    = document.getElementById("detalles-vehiculo");
  const filterForm     = document.getElementById("filtros-form");
  const btnLimpiar     = document.getElementById("limpiar-filtros");
  let allVehiculos = [];

  // 1) Obtener vehículos desde la API
  fetch(API)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      allVehiculos = data;
      renderGrid(allVehiculos);
    })
    .catch(err => {
      console.error("Error al cargar vehículos:", err);
      grid.innerHTML = `<p class="error">No se pudieron cargar los vehículos.</p>`;
    });

  // 2) Renderizar la cuadrícula de tarjetas
  function renderGrid(list) {
    // vaciamos detalles
    detallesDiv.innerHTML = "";
    detallesDiv.classList.add("detalles-ocultos");

    grid.innerHTML = list
      .map(v => {
        const dv = JSON.stringify({
          id:           v.idVehiculo,
          marca:        v.marca,
          modelo:       v.modelo,
          anio:         v.anio,
          precio:       v.precio,
          imagen_url:   v.imagenUrl,
          kilometraje:  v.kilometraje || "",
          transmision:  v.transmision || "",
          motor:        v.motor || "",
          caracteristicas: v.caracteristicas || []
        }).replace(/"/g, "&quot;");

        return `
          <div class="tarjeta-vehiculo">
            <img src="${v.imagenUrl}" alt="${v.marca} ${v.modelo}">
            <h4>${v.marca} ${v.modelo} (${v.anio})</h4>
            <p>Precio: Q${v.precio.toLocaleString()}</p>
            <button class="ver-detalles" data-vehiculo="${dv}">
              Ver Detalles
            </button>
          </div>
        `;
      })
      .join("");

    // volver a enganchar listeners de “Ver Detalles”
    grid.querySelectorAll(".ver-detalles").forEach(btn => {
      btn.addEventListener("click", () => {
        const v = JSON.parse(btn.getAttribute("data-vehiculo"));
        mostrarDetalles(v);
      });
    });
  }

  // 3) Mostrar detalles de un solo vehículo
  function mostrarDetalles(v) {
    const caracteristicasHTML = v.caracteristicas
      .map(c => `<li>${c}</li>`)
      .join("");

    detallesDiv.innerHTML = `
      <div class="detalles-vehiculo">
        <div class="detalles-header">
          <h5>${v.marca} ${v.modelo} (${v.anio})</h5>
          <img src="${v.imagen_url}" alt="${v.marca} ${v.modelo}">
        </div>
        <p><strong>Precio:</strong> Q${v.precio.toLocaleString()}</p>
        ${v.kilometraje ? `<p><strong>Kilometraje:</strong> ${v.kilometraje}</p>` : ""}
        ${v.transmision ? `<p><strong>Transmisión:</strong> ${v.transmision}</p>` : ""}
        ${v.motor       ? `<p><strong>Motor:</strong> ${v.motor}</p>` : ""}
        ${caracteristicasHTML
          ? `<p><strong>Características:</strong></p><ul>${caracteristicasHTML}</ul>`
          : ""
        }
        <button class="cerrar-detalles">Cerrar Detalles</button>
      </div>
    `;
    detallesDiv.classList.remove("detalles-ocultos");

    detallesDiv
      .querySelector(".cerrar-detalles")
      .addEventListener("click", () => {
        detallesDiv.innerHTML = "";
        detallesDiv.classList.add("detalles-ocultos");
      });
  }

  // 4) Filtrar al enviar el formulario
  filterForm.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(filterForm);

    const categoria   = f.get("categoria");
    const marcaF      = (f.get("marca") || "").toLowerCase();
    const modeloF     = (f.get("modelo")||"").toLowerCase();
    const minPrecio   = parseFloat(f.get("min_precio")) || 0;
    const maxPrecio   = parseFloat(f.get("max_precio")) || Infinity;
    const colorF      = f.get("color");
    const palabra     = (f.get("busqueda_palabra_clave")||"").toLowerCase();

    const filtrados = allVehiculos.filter(v => {
      return (
        (!categoria   || v.categoria   === categoria) &&
        (!marcaF      || v.marca.toLowerCase().includes(marcaF)) &&
        (!modeloF     || v.modelo.toLowerCase().includes(modeloF)) &&
        (v.precio >= minPrecio && v.precio <= maxPrecio) &&
        (!colorF      || v.color       === colorF) &&
        (!palabra     || 
          v.marca.toLowerCase().includes(palabra) ||
          v.modelo.toLowerCase().includes(palabra)
        )
      );
    });

    renderGrid(filtrados);
  });

  // 5) Limpiar filtros
  btnLimpiar.addEventListener("click", () => {
    filterForm.reset();
    renderGrid(allVehiculos);
  });
});
