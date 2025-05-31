document.getElementById('invoice-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const cliente = document.getElementById('cliente').value;
  const modelo = document.getElementById('modelo').value;
  const marca = document.getElementById('marca').value;
  const anio = document.getElementById('anio').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const impuestoPorcentaje = parseFloat(document.getElementById('impuesto').value);

  const impuesto = (precio * impuestoPorcentaje) / 100;
  const total = precio + impuesto;

  document.getElementById('f-cliente').textContent = cliente;
  document.getElementById('f-vehiculo').textContent = `${marca} ${modelo} (${anio})`;
  document.getElementById('f-precio').textContent = precio.toFixed(2);
  document.getElementById('f-impuesto').textContent = impuesto.toFixed(2);
  document.getElementById('f-total').textContent = total.toFixed(2);

  document.getElementById('factura').classList.remove('oculto');
});
