document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Simulando la carga de elementos del carrito desde Firebase
    const cartItems = [
        { nombre: 'Producto 1', imagen: 'img/producto1.jpg', precio: 100, cantidad: 1 },
        { nombre: 'Producto 2', imagen: 'img/producto2.jpg', precio: 150, cantidad: 2 },
        { nombre: 'Producto 3', imagen: 'img/producto3.jpg', precio: 200, cantidad: 1 },
        // Agregar más elementos del carrito según sea necesario
    ];

    let total = 0;

    // Generar el HTML para cada elemento del carrito
    cartItems.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <span>${item.nombre}</span>
                <span>Cantidad: ${item.cantidad}</span>
                <span>Precio: S/ ${item.precio}</span>
                <span>Subtotal: S/ ${subtotal}</span>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    // Mostrar el total en el carrito
    cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
});
