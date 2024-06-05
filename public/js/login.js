import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDfINjqBM_lnsWRnzaNNYQgvtj3Pk9nML0",
  authDomain: "sublimagic-b1bc1.firebaseapp.com",
  projectId: "sublimagic-b1bc1",
  storageBucket: "sublimagic-b1bc1.appspot.com",
  messagingSenderId: "718965349114",
  appId: "1:718965349114:web:29469547e748e65048c743",
  measurementId: "G-N5VWLQRR80"
};
  
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Obtener elementos del DOM
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const adminText = document.querySelector('.admin-text');

// Agregar un evento de clic al elemento de texto "Admin"
adminText.addEventListener('click', redirectToAdminPage);

// Función para redirigir a la página de administrador
function redirectToAdminPage() {
  // Redirigir a otra página HTML
  window.location.href = "MP.html";
}

// Función para iniciar sesión
loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login exitoso, redirigir a otra página
      window.location.href = "MP.html";
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

  createUserWithEmailAndPassword(auth, email, password)
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
