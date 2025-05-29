const clientApi = "http://localhost:8889/clientes";


const form = document.getElementById('form-cliente');

  // 2. Listen for the submit event
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent the normal form submission

    // 3. Collect form data into an object
    const formData = new FormData(form);
    const payload = {
      nombre: formData.get('nombre_cliente'),
      correo: formData.get('correo_cliente'),
      telefono: formData.get('telefono_cliente'),
      direccion: formData.get('direccion_cliente')
    };

    console.log("client: ", payload);

    try {
      // 4. Send POST request
      const response = await fetch(clientApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Cliente agregado:', result);
      // Optionally, reset the form or update the UI
      form.reset();
      alert('Cliente agregado con éxito!');
    } catch (err) {
      console.error('Error al agregar cliente:', err);
      alert('Hubo un error al agregar el cliente. Por favor inténtalo de nuevo.');
    }
  });


  