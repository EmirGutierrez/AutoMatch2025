(() => {
  const vehiculoApi = "http://localhost:8889/vehiculo";

  const form           = document.getElementById('vehiculo');
  const fileInput      = document.getElementById('imagenFile');
  const uploadButton   = document.getElementById('uploadImageButton');
  const uploadStatus   = document.getElementById('uploadStatus');
  const hiddenImgField = form.querySelector('input[name="imagen_local_path"]');


  // 2) Lógica para enviar todo el formulario de vehículo
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const fd = new FormData(form);
    const payload = {
      marca:             fd.get('marca'),
      modelo:            fd.get('modelo'),
      anio:              parseInt(fd.get('anio'), 10),
      precio:            parseFloat(fd.get('precio')),
      estado:            fd.get('estado'),
      imagen_local_path: fd.get('imagen_local_path'),  // ruta devuelta por /upload
      imagen_url:        fd.get('imagen_url')          // URL remota
    };

    try {
      const res = await fetch(vehiculoApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        alert(`Vehículo creado con ID: ${data.id}`);
      } else {
        const text = await res.text();
        alert(text);
      }
      form.reset();
      uploadStatus.textContent = '';
    } catch (err) {
      console.error(err);
      alert('Error al agregar el vehículo. Revisa la consola.');
    }
  });
})();
