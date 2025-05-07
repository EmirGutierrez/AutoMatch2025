document.getElementById('loginTab').addEventListener('click', function () {
  document.getElementById('loginTab').classList.add('active');
  document.getElementById('registerTab').classList.remove('active');
  document.getElementById('loginForm').classList.add('active-form');
  document.getElementById('registerForm').classList.remove('active-form');
});

document.getElementById('registerTab').addEventListener('click', function () {
  document.getElementById('registerTab').classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
  document.getElementById('registerForm').classList.add('active-form');
  document.getElementById('loginForm').classList.remove('active-form');

// Obtener el formulario de login
const loginForm = document.getElementById('loginForm');

// Agregar un evento para el envío del formulario
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado de envío del formulario

  // Obtener los valores de los campos de login
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Validación de ejemplo (deberías conectar a tu base de datos aquí)
  if (email === "usuario@example.com" && password === "contraseña123") { // Ejemplo de validación
    window.location.href = "menu.html"; // Redirige a menu.html si la validación es exitosa
  } else {
    alert("Correo o contraseña incorrectos."); // Muestra una alerta si la validación falla
  }
});

  
});
