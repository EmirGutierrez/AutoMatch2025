console.log("vehiculos.js cargado");

document.addEventListener("DOMContentLoaded", () => {
  // Ya no apuntamos a ninguna API remota:
  // const API = "http://localhost:8889/vehiculo";
  const grid        = document.querySelector(".vehiculos-grid");
  const detallesDiv = document.getElementById("detalles-vehiculo");
  const filterForm  = document.getElementById("filtros-form");
  const btnLimpiar  = document.getElementById("limpiar-filtros");

  // Inicializa allVehiculos como un arreglo vacío o con datos estáticos:
  // Ejemplo de datos estáticos (puedes borrar o modificar según convenga):
  let allVehiculos = [
    {
      idVehiculo: 1,
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2020,
      precio: 120000,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZFycYDF7Mgf3RAc8NDYzvPKKaDXXz9zKdg&s",
      kilometraje: 35000,
      transmision: "Automática",
      motor: "1.8L",
      caracteristicas: ["Aire acondicionado", "Bluetooth", "Airbags"]
      // color, categoria, etc., si los usas en filtros
    },
    {
      idVehiculo: 2,
      marca: "Honda",
      modelo: "Civic",
      anio: 2019,
      precio: 135000,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN01sE-3z4Vcxo4UeXOIwbCpGwFQZ8wafJ2w&s",
      kilometraje: 42000,
      transmision: "Manual",
      motor: "2.0L",
      caracteristicas: ["Sensores de reversa", "Pantalla táctil"]
    }
    // …agrega aquí más objetos si lo deseas
  ];

  // 2) Renderizar la cuadrícula de tarjetas (se invoca inmediatamente con allVehiculos)
  renderGrid(allVehiculos);

  // 2.1) Función para renderizar la grilla
  function renderGrid(list) {
    // Limpiar sección de detalles
    detallesDiv.innerHTML = "";
    detallesDiv.classList.add("detalles-ocultos");

    // Si no hay elementos, mostramos mensaje
    if (!list.length) {
      grid.innerHTML = `<p class="info">No hay vehículos disponibles.</p>`;
      return;
    }

    grid.innerHTML = list
      .map(v => {
        // Serializamos la información necesaria y escapamos comillas
        const dv = JSON.stringify({
          id:             v.idVehiculo,
          marca:          v.marca,
          modelo:         v.modelo,
          anio:           v.anio,
          precio:         v.precio,
          imagen_url:     v.imagenUrl,
          kilometraje:    v.kilometraje || "",
          transmision:    v.transmision || "",
          motor:          v.motor || "",
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

    // Volver a enganchar listeners de “Ver Detalles”
    grid.querySelectorAll(".ver-detalles").forEach(btn => {
      btn.addEventListener("click", () => {
        const v = JSON.parse(btn.getAttribute("data-vehiculo"));
        mostrarDetalles(v);
      });
    });
  }

  // 3) Mostrar detalles de un solo vehículo
  function mostrarDetalles(v) {
    // Construimos la lista de características (si las hubiera)
    const caracteristicasHTML = Array.isArray(v.caracteristicas) && v.caracteristicas.length
      ? v.caracteristicas.map(c => `<li>${c}</li>`).join("")
      : "";

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
          : ""}
        <button class="cerrar-detalles">Cerrar Detalles</button>
      </div>
    `;
    detallesDiv.classList.remove("detalles-ocultos");

    // Listener para cerrar la sección de detalles
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

    const categoria = f.get("categoria");
    const marcaF    = (f.get("marca") || "").toLowerCase();
    const modeloF   = (f.get("modelo") || "").toLowerCase();
    const minPrecio = parseFloat(f.get("min_precio")) || 0;
    const maxPrecio = parseFloat(f.get("max_precio")) || Infinity;
    const colorF    = f.get("color");
    const palabra   = (f.get("busqueda_palabra_clave") || "").toLowerCase();

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
