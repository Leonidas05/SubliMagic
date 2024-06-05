document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const cartRef = firebase.firestore().collection('Carrito');

    // Obtener los elementos del carrito desde Firebase
    cartRef.doc('C0000000001').get().then((doc) => {
        if (doc.exists) {
            const cartItems = doc.data().Articulos;
            let total = 0;

            // Generar el HTML para cada elemento del carrito
            cartItems.forEach(item => {
                const subtotal = item.Precio * item.Cantidad;
                total += subtotal;

                const cartItemHTML = `
                    <div class="cart-item">
                        <img src="${item.Img}" alt="${item.Nombre}">
                        <span>${item.Nombre}</span>
                        <span>Cantidad: ${item.Cantidad}</span>
                        <span>Precio: S/ ${item.Precio}</span>
                        <span>Subtotal: S/ ${subtotal}</span>
                    </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            });

            // Mostrar el total en el carrito
            cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;
        } else {
            console.log('No se encontraron elementos en el carrito');
        }
    }).catch((error) => {
        console.error('Error al obtener elementos del carrito:', error);
    });
});
