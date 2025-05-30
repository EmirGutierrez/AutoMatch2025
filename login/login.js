loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = loginForm.querySelector('input[name="correo"]').value;
  const password = loginForm.querySelector('input[name="contrasena"]').value;

  fetch('http://localhost:8889/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo: email, contrasena: password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        mensaje.textContent = '¡Inicio de sesión exitoso!';
      } else {
        mensaje.textContent = '❌ Usuario o contraseña incorrectos.';
      }
      mostrarMensaje();
    })
    .catch(err => {
      console.error(err);
      mensaje.textContent = '⚠️ Error al conectar con el servidor.';
      mostrarMensaje();
    });
});
