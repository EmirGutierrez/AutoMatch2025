(() => {
    // Define the API endpoint for sales (ensure this matches your Spring Boot controller path)
    const ventasApi = "http://localhost:8889/ventas"; // Assuming your controller maps to /ventas

    // Get the form element by its ID
    const form = document.getElementById('ventasForm'); // Updated to 'ventasForm'

    // Basic error handling if the form isn't found
    if (!form) {
        console.error('Error: Formulario no encontrado con id "ventasForm". Asegúrate de que el ID es correcto y el script se carga después del HTML.');
        return;
    }

    // Add an event listener for the form's submit event
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission (page reload)

        const fd = new FormData(form); // Create FormData object from the form

        // Construct the payload object matching your Venta entity's field names
        // Use parseInt for numeric fields and get values directly for text/date
        const payload = {
            idCliente: parseInt(fd.get('idCliente'), 10),
            idVehiculo: parseInt(fd.get('idVehiculo'), 10),
            fechaVenta: fd.get('fechaVenta'),
            vendedor: fd.get('vendedor'),
            idUsuario: parseInt(fd.get('idUsuario'), 10)
        };

        console.log("Payload enviado:", payload); // Log the payload before sending

        try {
            // Send the POST request to the API
            const response = await fetch(ventasApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Tell the server we're sending JSON
                },
                body: JSON.stringify(payload) // Convert the JavaScript object to a JSON string
            });

            // Check if the response was successful (HTTP status 200-299)
            if (!response.ok) {
                // Get more details from the error response body
                const errorData = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData}`);
            }

            // Parse the JSON response from the server
            const result = await response.json();
            console.log('Venta registrada con éxito:', result);
            alert(`Venta registrada con éxito. ID de Venta: ${result.idVenta || 'N/A'}`); // Assuming your API returns idVenta

            form.reset(); // Clear the form fields after successful submission

        } catch (error) {
            // Catch and log any errors during the fetch operation
            console.error('Error al registrar la venta:', error);
            alert(`Hubo un error al registrar la venta. Detalles: ${error.message}`);
        }
    });
})();