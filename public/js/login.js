document.addEventListener('DOMContentLoaded', function() {
  // Obtener elementos del DOM
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const adminText = document.querySelector('.admin-text');

  // Agregar un evento de clic al botón "Admin"
  document.getElementById('BComenzar').addEventListener('click', redirectToAdminPage);

  // Función para redirigir a la página de administrador
  function redirectToAdminPage() {
      // Redirigir a otra página HTML
      window.location.href = "MP.html";
  }

  // Función para iniciar sesión
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    firebase.default.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login exitoso, obtener el UID del usuario
            const user = userCredential.user;
            const uid = user.uid;

            // Redirigir a MP.html con el UID como parámetro de consulta
            window.location.href = `MP.html?uid=${uid}`;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.error(errorMessage);
        });
});

  // Función para registrar
  registerBtn.addEventListener('click', () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      firebase.default.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Registro exitoso
              console.log('Usuario registrado');
          })
          .catch((error) => {
              // Handle Errors here.
              const errorMessage = error.message;
              console.error(errorMessage);
          });
  });
});
