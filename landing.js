// Redirige desde index.html hacia compra.html
document.getElementById("btnCompra")?.addEventListener("click", () => {
    window.location.href = "compra.html";
});


// Función para cambiar la cantidad de entradas
function cambiarCantidad(button, delta) {
    const cantidadElem = button.parentElement.querySelector('.valor');
    let cantidad = parseInt(cantidadElem.textContent);
    cantidad = Math.max(0, cantidad + delta);  // Evita números negativos
    cantidadElem.textContent = cantidad;
    actualizarTotal();
}

// Función para cambiar la cantidad de promociones
function cambiarCantidadPromo(button, delta) {
    const cantidadElem = button.parentElement.querySelector('.valor');
    let cantidad = parseInt(cantidadElem.textContent);
    cantidad = Math.max(0, cantidad + delta);
    cantidadElem.textContent = cantidad;
    actualizarTotal();
}

// Función para cambiar la cantidad de comidas
function cambiarCantidadComida(button, delta) {
    const cantidadElem = button.parentElement.querySelector('.valor');
    let cantidad = parseInt(cantidadElem.textContent);
    cantidad = Math.max(0, cantidad + delta);
    cantidadElem.textContent = cantidad;
    actualizarTotal();
}

let total = 0;

const calcularSubtotal = (selector, precioSelector = '[data-precio]', valorSelector = '.valor') => {
    const items = document.querySelectorAll(selector);
    items.forEach(item => {
        const precioElem = item.querySelector(precioSelector);
        const valorElem = item.querySelector(valorSelector);

        if (precioElem && valorElem) {
            const precio = parseFloat(precioElem.dataset.precio);
            const cantidad = parseInt(valorElem.textContent) || 0;

            // Solo agregar si la cantidad es mayor a 0
            if (cantidad > 0) {
                total += precio * cantidad;
            }
        }
    });
};

// Método para calcular el total de los artículos seleccionados
function calcularTotal() {
    let total = 0;

    // Calcular total de entradas y extras seleccionados
    document.querySelectorAll('.entrada-item').forEach(item => {
        const precio = parseInt(item.querySelector('.precio').textContent.replace(/\D/g, ''));
        const cantidad = parseInt(item.querySelector('.valor').textContent);
        total += precio * cantidad;
    });

    // Calcular total de promociones seleccionadas
    document.querySelectorAll('#promociones .card-text').forEach(promo => {
        const precio = parseInt(promo.dataset.precio);
        const cantidad = parseInt(promo.closest('.card-body').querySelector('.valor').textContent);
        total += precio * cantidad;
    });

    return total;
}

// Método para mostrar el resumen en el modal
function mostrarResumen() {
    const fechaVisita = document.getElementById('fechaVisita').value;
    const totalCompra = calcularTotal();

    // Verificar que haya una fecha seleccionada
    if (!fechaVisita) {
        alert('Por favor, selecciona una fecha de visita.');
        return;
    }

    // Actualizar el contenido del modal con los valores correspondientes
    document.getElementById('resumenFecha').textContent = `Fecha de Visita: ${fechaVisita}`;
    document.getElementById('modalTotalCompra').textContent = `$${totalCompra.toLocaleString()}`;

    // Abrir el modal de resumen utilizando Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('resumenModal'));
    modal.show();
}



// Función para finalizar la compra
function finalizarCompra() {
    localStorage.removeItem('totalCompra');
    localStorage.removeItem('fechaVisita');
    alert('Compra finalizada. ¡Gracias por tu compra!');
    window.location.href = 'index.html';
}

function generarResumenPDF() {
    const link = document.createElement('a');
    link.href = 'recursos/Comprobante de compra.pdf'; 
    link.download = 'comprobante.pdf';
    link.click();
}









