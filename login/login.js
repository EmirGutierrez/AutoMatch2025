document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box');
  const loginForm = document.getElementById('loginForm');
  const crearCuentaForm = document.getElementById('crearCuentaForm');
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  const mensaje = document.getElementById('mensajeExito');

  // Cambiar a formulario de login (animado con CSS)
  btnLogin.addEventListener('click', () => {
    box.classList.remove('show-register');
    btnLogin.classList.add('active');
    btnRegister.classList.remove('active');
  });

  // Cambiar a formulario de registro (animado con CSS)
  btnRegister.addEventListener('click', () => {
    box.classList.add('show-register');
    btnRegister.classList.add('active');
    btnLogin.classList.remove('active');
  });

  // Enlaces dentro del formulario
  document.getElementById('goRegister').addEventListener('click', (e) => {
    e.preventDefault();
    btnRegister.click();
  });

  document.getElementById('goLogin').addEventListener('click', (e) => {
    e.preventDefault();
    btnLogin.click();
  });

  // Envío del formulario de login
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    mensaje.textContent = '¡Inicio de sesión exitoso!';
    mostrarMensaje();
  });

  // Envío del formulario de crear cuenta
  crearCuentaForm.addEventListener('submit', function (e) {
    e.preventDefault();
    mensaje.textContent = '¡Cuenta creada exitosamente!';
    mostrarMensaje();
  });

  // Función para mostrar mensaje
  function mostrarMensaje() {
    mensaje.style.display = 'block';
    mensaje.style.opacity = '1';

    setTimeout(() => {
      mensaje.style.opacity = '0';
      setTimeout(() => {
        mensaje.style.display = 'none';
      }, 500);
    }, 3000);
  }
});
