<?php
// Simulación de la conexión a la base de datos
$servername = "localhost"; // Cambiar si tu servidor es diferente
$username = "tu_usuario_db"; // Reemplazar con tu nombre de usuario de la base de datos
$password = "tu_contraseña_db"; // Reemplazar con tu contraseña de la base de datos
$dbname = "tu_nombre_db"; // Reemplazar con el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recoger los datos de los filtros
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : '';
$marca = isset($_GET['marca']) ? $_GET['marca'] : '';
$modelo = isset($_GET['modelo']) ? $_GET['modelo'] : '';
$min_precio = isset($_GET['min_precio']) && is_numeric($_GET['min_precio']) ? $_GET['min_precio'] : '';
$max_precio = isset($_GET['max_precio']) && is_numeric($_GET['max_precio']) ? $_GET['max_precio'] : '';
$color = isset($_GET['color']) ? $_GET['color'] : '';
$busqueda_palabra_clave = isset($_GET['busqueda_palabra_clave']) ? $_GET['busqueda_palabra_clave'] : '';

// Construir la consulta SQL base
$sql = "SELECT * FROM vehiculos WHERE 1=1";

// Añadir condiciones a la consulta según los filtros
if (!empty($categoria)) {
    $sql .= " AND categoria = '$categoria'";
}
if (!empty($marca)) {
    $sql .= " AND marca LIKE '%$marca%'";
}
if (!empty($modelo)) {
    $sql .= " AND modelo LIKE '%$modelo%'";
}
if (!empty($min_precio)) {
    $sql .= " AND precio >= $min_precio";
}
if (!empty($max_precio)) {
    $sql .= " AND precio <= $max_precio";
}
if (!empty($color)) {
    $sql .= " AND color = '$color'";
}
if (!empty($busqueda_palabra_clave)) {
    $sql .= " AND (marca LIKE '%$busqueda_palabra_clave%' OR modelo LIKE '%$busqueda_palabra_clave%')";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<div class='vehiculos-grid'>";
    while($row = $result->fetch_assoc()) {
        echo "<div class='tarjeta-vehiculo' data-id='vehiculo-" . $row["id"] . "'>";
        echo "<img src='" . $row["imagen_url"] . "' alt='" . $row["marca"] . " " . $row["modelo"] . "'>";
        echo "<h4>" . $row["marca"] . " " . $row["modelo"] . " (" . $row["anio"] . ")</h4>";
        echo "<p>Precio: Q" . number_format($row["precio"], 2) . "</p>";
        echo "<button class='ver-detalles' data-vehiculo='" . json_encode($row) . "'>Ver Detalles</button>";
        echo "</div>";
    }
    echo "</div>";
} else {
    echo "<p>No se encontraron vehículos con los criterios de búsqueda.</p>";
}

$conn->close();
?>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const detallesVehiculoDiv = document.getElementById('detalles-vehiculo');
        const botonesDetalles = document.querySelectorAll('.ver-detalles');

        botonesDetalles.forEach(boton => {
            boton.addEventListener('click', function() {
                const vehiculo = JSON.parse(this.dataset.vehiculo);
                mostrarDetalles(vehiculo);
            });
        });

        function mostrarDetalles(vehiculo) {
            let detallesHTML = `
                <div class="detalles-vehiculo">
                    <div class="detalles-header">
                        <h5>${vehiculo.marca} ${vehiculo.modelo} (${vehiculo.anio})</h5>
                        <img src="${vehiculo.imagen_url}" alt="${vehiculo.marca} ${vehiculo.modelo}" class="imagen-detalle-vehiculo">
                    </div>
                    <p><strong>Precio:</strong> Q${Number(vehiculo.precio).toLocaleString('es-GT')}</p>
                    <p><strong>Kilometraje:</strong> ${vehiculo.kilometraje}</p>
                    <p><strong>Transmisión:</strong> ${vehiculo.transmision}</p>
                    <p><strong>Motor:</strong> ${vehiculo.motor}</p>
                    <p><strong>Color:</strong> ${vehiculo.color}</p>
                    <p><strong>Características:</strong></p>
                    <ul>
                        ${JSON.parse(vehiculo.caracteristicas).map(caracteristica => `<li>${caracteristica}</li>`).join('')}
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
    });

    document.getElementById('limpiar-filtros').addEventListener('click', function() {
        document.getElementById('filtros-form').reset();
        // Opcionalmente, puedes recargar la página o realizar otra acción
        window.location.href = 'vehiculos.html'; // Recarga la página para mostrar todos los vehículos
    });
</script>