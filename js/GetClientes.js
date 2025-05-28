// js/admin.js (o tu fichero principal de scripts)

async function fetchData(endpoint, renderCallback) {
  try {
    const resp = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    const data = await resp.json();
    renderCallback(data);
  } catch (err) {
    console.error('Error al obtener datos:', err);
    alert('No se pudo cargar la información.');
  }
}