document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container_productos'); // Corregir la clase seleccionada

    // Simulando la carga de productos desde Firebase
    const productos = [
        { nombre: 'Producto 1', imagen: 'img/producto1.jpg', precio: '100', descripcion: 'Descripción del Producto 1' },
        { nombre: 'Producto 2', imagen: 'img/producto2.jpg', precio: '150', descripcion: 'Descripción del Producto 2' },
        { nombre: 'Producto 3', imagen: 'img/producto3.jpg', precio: '200', descripcion: 'Descripción del Producto 3' },
        { nombre: 'Producto 4', imagen: 'img/producto4.jpg', precio: '120', descripcion: 'Descripción del Producto 4' },
        { nombre: 'Producto 5', imagen: 'img/producto5.jpg', precio: '180', descripcion: 'Descripción del Producto 5' },
        // Agregar más productos según sea necesario
    ];

    productos.forEach(producto => {
        const productoHTML = `
            <div class="producto" 
                data-nombre="${producto.nombre}" 
                data-descripcion="${producto.descripcion}"
                data-precio="${producto.precio}" 
                data-imagen="${producto.imagen}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: S/ ${producto.precio}</p>
            </div>
        `;
        container.innerHTML += productoHTML;
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
