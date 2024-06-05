document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container_productos');
    const searchBar = document.querySelector('.search-bar form');

    // Obtener referencia a la colección "Productos" en Firebase
    const productosRef = firebase.firestore().collection('Productos');

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
});
