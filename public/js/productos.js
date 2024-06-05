document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');

    // Ahora puedes usar el UID como necesites
    console.log('UID del usuario:', uid);

    const container = document.querySelector('.container_productos');
    const searchBar = document.querySelector('.search-bar form');

    // Obtener referencia a la colección "Productos" en Firebase
    const productosRef = firebase.firestore().collection('Productos');
    const cartRef = firebase.firestore().collection('Carrito').doc('C0000000001');

    // Función para mostrar productos en la página
    function mostrarProductos(snapshot) {
        container.innerHTML = ''; // Limpiar productos anteriores
        snapshot.forEach(doc => {
            const producto = doc.data();
            // Crear elemento visual para el producto
            const productoHTML = `
                <div class="producto">
                    <img src="${producto.Img}" alt="${producto.Nombre}">
                    <h3>${producto.Nombre}</h3>
                    <p>Precio: S/ ${producto.Precio}</p>
                    <p>Categoría: ${producto.Categoria}</p>
                    <button class="agregar-carrito-btn" data-id="${doc.id}">Agregar al carrito</button>
                </div>
            `;
            container.innerHTML += productoHTML;
        });
    }

    // Realizar consulta a la colección "Productos" y mostrar todos los productos al inicio
    function mostrarTodosLosProductos() {
        productosRef.get().then(snapshot => {
            mostrarProductos(snapshot);
        }).catch(error => {
            console.error('Error al obtener productos:', error);
        });
    }

    mostrarTodosLosProductos(); // Mostrar todos los productos al cargar la página

    // Evento de escucha para el botón de búsqueda
    searchBar.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario
        const searchTerm = searchBar.querySelector('input[name="search"]').value.toLowerCase();
        
        // Realizar consulta a la colección "Productos" para buscar productos que contengan la cadena de búsqueda en el nombre
        productosRef.where('Nombre', '>=', searchTerm)
                    .where('Nombre', '<=', searchTerm + '\uf8ff')
                    .get()
                    .then(snapshot => {
                        mostrarProductos(snapshot);
                    })
                    .catch(error => {
                        console.error('Error al buscar productos:', error);
                    });
    });

    // Evento de escucha para el botón "Agregar al carrito"
    container.addEventListener('click', function(event) {
        if (event.target.classList.contains('agregar-carrito-btn')) {
            const productId = event.target.dataset.id;
            // Obtener el producto de la base de datos
            productosRef.doc(productId).get().then(doc => {
                if (doc.exists) {
                    const producto = doc.data();
                    // Añadir el producto al carrito
                    cartRef.get().then(cartDoc => {
                        if (cartDoc.exists) {
                            // Obtener el carrito actual
                            const cart = cartDoc.data();
                            // Añadir el nuevo artículo al array de "Articulos"
                            cart.Articulos.push({
                                Nombre: producto.Nombre,
                                Img: producto.Img,
                                Precio: producto.Precio,
                                Cantidad: 1 // Valor predeterminado
                            });
                            // Actualizar el documento del carrito en Firestore
                            cartRef.update({
                                Articulos: cart.Articulos
                            }).then(() => {
                                console.log('Producto agregado al carrito:', producto.Nombre);
                                // Puedes mostrar un mensaje de éxito aquí si lo deseas
                            }).catch(error => {
                                console.error('Error al actualizar el carrito:', error);
                            });
                        } else {
                            console.error('No se encontró el carrito');
                        }
                    }).catch(error => {
                        console.error('Error al obtener el carrito:', error);
                    });
                } else {
                    console.error('No se encontró el producto');
                }
            }).catch(error => {
                console.error('Error al obtener el producto:', error);
            });
        }
    });
});