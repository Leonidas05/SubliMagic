document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn');

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

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.Img}" alt="${item.Nombre}">
                    <span>${item.Nombre}</span>
                    <span>Cantidad: 
                        <button class="decrement-btn" data-id="${item.Nombre}">-</button>
                        <span class="cantidad">${item.Cantidad}</span>
                        <button class="increment-btn" data-id="${item.Nombre}">+</button>
                    </span>
                    <span>Precio: S/ ${item.Precio}</span>
                    <span>Subtotal: S/ ${subtotal}</span>
                    <button class="eliminar-btn" data-id="${item.Nombre}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Mostrar el total en el carrito
            cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;

            // Agregar eventos de clic a los botones de incremento, decremento y eliminar
            cartItemsContainer.querySelectorAll('.increment-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemName = btn.dataset.id;
                    actualizarCantidad(itemName, 1);
                });
            });

            cartItemsContainer.querySelectorAll('.decrement-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemName = btn.dataset.id;
                    actualizarCantidad(itemName, -1);
                });
            });

            cartItemsContainer.querySelectorAll('.eliminar-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemName = btn.dataset.id;
                    eliminarArticulo(itemName);
                });
            });
        } else {
            console.log('No se encontraron elementos en el carrito');
        }
    }).catch((error) => {
        console.error('Error al obtener elementos del carrito:', error);
    });

    // Función para actualizar la cantidad de un artículo en el carrito
    function actualizarCantidad(itemName, incremento) {
        cartRef.doc('C0000000001').get().then((doc) => {
            if (doc.exists) {
                const cartItems = doc.data().Articulos;
                const updatedCartItems = cartItems.map(item => {
                    if (item.Nombre === itemName) {
                        const newCantidad = item.Cantidad + incremento;
                        return { ...item, Cantidad: Math.max(1, Math.min(5, newCantidad)) };
                    } else {
                        return item;
                    }
                });
                cartRef.doc('C0000000001').update({ Articulos: updatedCartItems }).then(() => {
                    location.reload(); // Refrescar la página para ver los cambios
                }).catch((error) => {
                    console.error('Error al actualizar la cantidad:', error);
                });
            } else {
                console.log('No se encontraron elementos en el carrito');
            }
        }).catch((error) => {
            console.error('Error al obtener elementos del carrito:', error);
        });
    }

    // Función para eliminar un artículo del carrito
    function eliminarArticulo(itemName) {
        cartRef.doc('C0000000001').get().then((doc) => {
            if (doc.exists) {
                const cartItems = doc.data().Articulos;
                const updatedCartItems = cartItems.filter(item => item.Nombre !== itemName);
                cartRef.doc('C0000000001').update({ Articulos: updatedCartItems }).then(() => {
                    location.reload(); // Refrescar la página para ver los cambios
                }).catch((error) => {
                    console.error('Error al eliminar el artículo:', error);
                });
            } else {
                console.log('No se encontraron elementos en el carrito');
            }
        }).catch((error) => {
            console.error('Error al obtener elementos del carrito:', error);
        });
    }

    // Función para iniciar el proceso de pago con Mercado Pago
    function iniciarPago() {
        const total = parseFloat(cartTotalElement.textContent.replace('S/ ', ''));
        
        // Crear la preferencia de pago en el servidor
        fetch('/crear-preferencia-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                total: total
            })
        })
        .then(response => response.json())
        .then(data => {
            // Verificar si se creó la preferencia de pago correctamente
            if (data.success) {
                // Redirigir al usuario a la página de pago de Mercado Pago
                window.location.href = data.urlPago;
            } else {
                console.error('Error al crear la preferencia de pago');
                // Manejar el error apropiadamente
            }
        })
        .catch(error => {
            console.error('Error al iniciar el pago:', error);
            // Manejar el error apropiadamente
        });
    }

    // Agregar evento de clic al botón de pago
    checkoutButton.addEventListener('click', iniciarPago);
});

