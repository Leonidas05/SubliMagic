// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfINjqBM_lnsWRnzaNNYQgvtj3Pk9nML0",
    authDomain: "sublimagic-b1bc1.web.app",
    projectId: "sublimagic-b1bc1",
    storageBucket: "gs://sublimagic-b1bc1.appspot.com",
    messagingSenderId: "718965349114",
    appId: "1:718965349114:web:29469547e748e65048c743"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Obtener elementos del DOM
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  // Función para iniciar sesión
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login exitoso, redirigir a otra página
        window.location.href = "MP.html";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
  
  // Función para registrar
  registerBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registro exitoso
        console.log('Usuario registrado');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });
  