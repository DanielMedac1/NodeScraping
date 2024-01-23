var productosURL = "productos.json";

// Función para generar los divs de Bootstrap
function generarProductos(data) {
    var container = $('#productos-container');

    data.forEach(function (producto) {
        // Crea un nuevo div de Bootstrap para cada producto
        var nuevoProducto = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${producto['imagen-src']}" class="card-img-top" alt="Imagen del producto">
          <div class="card-body">
            <h5 class="card-title">${producto.titulo}</h5>
            <p class="card-text">Precio: ${producto.precio}</p>
          </div>
        </div>
      </div>`;

        // Agrega el nuevo producto al contenedor
        container.append(nuevoProducto);
    });
}

// Realizar la solicitud AJAX al servidor
$.ajax({
    url: '/productos',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        // Llamar a la función para generar productos después de la carga
        generarProductos(data);
    },
    error: function (error) {
        console.error('Error al obtener los productos:', error);
        // Manejar el error en consecuencia
    }
});