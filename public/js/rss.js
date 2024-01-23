async function cargarNoticias() {
    try {
        // Realiza la petición HTTP para obtener el JSON de noticias.
        const response = await fetch('/rssMarca');
        const noticias = await response.json();

        // Selecciona el contenedor de noticias en el DOM.
        const contenedorNoticias = document.getElementById('noticias');

        // Recorre las noticias y las agrega al contenedor.
        noticias.rss.channel.item.forEach(item => {
            // Crea un contenedor para cada noticia utilizando clases de Bootstrap.
            const noticiaElemento = document.createElement('div');

            // Añade el título, descripción y enlace de la noticia.
            noticiaElemento.innerHTML = `
                <div class="elemento">
                    <h2 class="titutloElemento">${item.title}</h2>
                    <p class="descripcionElemento">${item['media:description']._}</p>
                    <a href="${item.link}" class="btn btn-primary" target="_blank">Leer más</a>
                    <img src="${item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url ? item['media:thumbnail'].$.url : ''}" 
                    alt="${item.title}" 
                    class="card-img-bottom" 
                    style="max-width: 85%; height: auto;">
                    <hr>
                    </div>                
            `;

            // Agrega la noticia al contenedor principal.
            contenedorNoticias.appendChild(noticiaElemento);
        });
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
    }
}

// Llama a la función para cargar las noticias cuando la página se carga.
window.onload = cargarNoticias;