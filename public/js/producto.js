// Lógica para cargar y mostrar los detalles del producto
// Aquí deberías agregar la lógica necesaria para cargar los detalles del producto desde Firebase o cualquier otra fuente de datos
document.addEventListener('DOMContentLoaded', function() {
    // Simulación de carga de detalles del producto
    const producto = {
        nombre: 'Nombre del Producto',
        descripcion: 'Descripción del Producto',
        precio: 'Precio del Producto',
        imagen: 'URL de la Imagen del Producto'
    };

    // Mostrar los detalles del producto en la página
    const productoContainer = document.querySelector('.producto-container');
    const productoHTML = `
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.descripcion}</p>
        <p>Precio: ${producto.precio}</p>
    `;
    productoContainer.innerHTML = productoHTML;
});
