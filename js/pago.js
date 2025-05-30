 document.getElementById('pagoForm').addEventListener('submit', async function(event) {
            event.preventDefault(); 

            const responseMessage = document.getElementById('responseMessage');
            responseMessage.style.display = 'none'; 
            responseMessage.textContent = ''; 

            const pago = {
                idVenta: parseInt(document.getElementById('idVenta').value),
                monto: parseFloat(document.getElementById('monto').value),
                metodoPago: document.getElementById('metodoPago').value,
                fechaPago: document.getElementById('fechaPago').value 
            };

            try {

                const response = await fetch('http://localhost:8889/pagos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pago)
                });

                const responseData = await response.json(); 

                if (response.ok) { 
                    responseMessage.textContent = `Pago saved successfully! ID: ${responseData.idPago}`;
                    responseMessage.className = 'success';
                } else {

                    const errorMessage = responseData.message || response.statusText || 'Unknown error';
                    responseMessage.textContent = `Error saving pago: ${errorMessage}`;
                    responseMessage.className = 'error';
                }
            } catch (error) {

                responseMessage.textContent = `Network error: Could not connect to the server. Please ensure the backend is running and accessible. (${error.message})`;
                responseMessage.className = 'error';
            } finally {
                responseMessage.style.display = 'block'; 
            }
        });