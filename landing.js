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

// Función para actualizar el total de la compra
function actualizarTotal() {
    const precios = document.querySelectorAll('.precio');
    const cantidades = document.querySelectorAll('.cantidad .valor');
    let total = 0;

    precios.forEach((precioElem, index) => {
        const precio = parseFloat(precioElem.textContent.replace('$', '').replace('.', ''));
        const cantidad = parseInt(cantidades[index].textContent);
        total += precio * cantidad;
    });

    // Guardar el total en el LocalStorage
    localStorage.setItem('totalCompra', total);
}

// Función para mostrar el resumen en el modal
function mostrarResumen() {
    // Actualizar el total
    actualizarTotal();

    // Recuperar la fecha de visita
    const fechaVisita = document.getElementById('fechaVisita').value;
    if (fechaVisita) {
        localStorage.setItem('fechaVisita', fechaVisita);  // Guardar la fecha en LocalStorage
        document.getElementById('resumenFecha').textContent = `Fecha reservada: ${fechaVisita}`;
    }

    // Recuperar el total de la compra
    const totalCompra = localStorage.getItem('totalCompra') || 0;
    document.getElementById('modalTotalCompra').textContent = `$${parseInt(totalCompra).toLocaleString('es-CL')}`;

    // Mostrar el modal de resumen
    const modal = new bootstrap.Modal(document.getElementById('resumenModal'));
    modal.show();
}

// Función para finalizar la compra
function finalizarCompra() {
    localStorage.removeItem('totalCompra');  // Eliminar el total del LocalStorage
    localStorage.removeItem('fechaVisita');  // Eliminar la fecha del LocalStorage
    alert('Compra finalizada. ¡Gracias por tu compra!');
    window.location.href = 'index.html';  // Redirigir a la página principal
}

function generarResumenPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    try {
        // Obtener la fecha y total del resumen
        const fecha = document.getElementById("fechaVisita").value || "No seleccionada";
        const totalCompra = document.getElementById("modalTotalCompra").textContent;

        // Verificar la fecha
        if (!fecha) {
            alert("Por favor, selecciona una fecha.");
            return;
        }

        let yPosition = 10;

        // Título del PDF
        doc.setFontSize(18);
        doc.text("Resumen de la Compra", 10, yPosition);
        yPosition += 10;

        // Fecha de visita
        doc.setFontSize(12);
        doc.text(`Fecha de Visita: ${fecha}`, 10, yPosition);
        yPosition += 10;

        // Detalle de entradas seleccionadas
        const entradas = Array.from(document.querySelectorAll("#listaEntradas .entrada-item"));
        doc.setFontSize(14);
        doc.text("Entradas:", 10, yPosition);
        yPosition += 10;

        entradas.forEach(item => {
            const nombre = item.querySelector("span").textContent;
            const cantidad = item.querySelector(".valor").textContent;
            const precio = item.querySelector(".precio").textContent;
            doc.text(`${nombre}: ${cantidad} x ${precio}`, 10, yPosition);
            yPosition += 8;
        });

        // Total de la compra
        doc.setFontSize(16);
        doc.text(`Total: ${totalCompra}`, 10, yPosition + 10);

        // Generar el QR ficticio
        const qr = new QRious({
            value: `Fecha: ${fecha}, Total: ${totalCompra}`, // Contenido del QR
            size: 100 // Tamaño del QR
        });

        // Dibujar el QR en el PDF
        const qrDataURL = qr.toDataURL(); // Convertimos el QR a Data URL
        doc.addImage(qrDataURL, 'PNG', 150, 20, 50, 50); // Agregamos el QR al PDF

        // Descargar el PDF
        doc.save("resumen_compra_con_qr.pdf");

    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Ocurrió un error al generar el PDF.");
    }
}


