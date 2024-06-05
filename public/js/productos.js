document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container_productos');

    // Obtener referencia a la colección "Productos" en Firebase
    const productosRef = firebase.firestore().collection('Productos');

    // Realizar consulta a la colección "Productos"
    productosRef.get().then(snapshot => {
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
    }).catch(error => {
        console.error('Error al obtener productos:', error);
    });

    // Ahora agregamos el evento de clic a cada producto
    const productosHTML = document.querySelectorAll('.producto');
    productosHTML.forEach(producto => {
        producto.addEventListener('click', function() {
            // Obtener los detalles del producto
            const nombre = producto.dataset.nombre;
            const descripcion = producto.dataset.descripcion;
            const precio = producto.dataset.precio;
            const imagen = producto.dataset.imagen;

            // Redirigir a la página del producto con los detalles del producto
            window.location.href = `producto.html?nombre=${nombre}&descripcion=${descripcion}&precio=${precio}&imagen=${imagen}`;
        });
    });
});
