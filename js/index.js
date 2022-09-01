let listaPeliculas =
  JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

// dibujar columnas
listaPeliculas.map((pelicula) => {
  crearColumna(pelicula);
});

function crearColumna(pelicula) {
  let grilla = document.querySelector("#grilla");
  grilla.innerHTML += `
    <article class="col-sm-12 col-md-6 col-lg-3 mb-5">
                <div class="card">
                    <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                      <h5 class="card-title mb-3">${pelicula.titulo}</h5>
                      <button class="btn btn-primary" onclick="detallePelicula('${pelicula.codigo}')">ver detalle</button>
                    </div>
                  </div>
    </article>
    `;
}

function detallePelicula(codigo){
    console.log(codigo)
    console.log(window.location.origin + '/pages/detalle.html?codigo='+codigo);
    window.location.href = window.location.origin + '/pages/detalle.html?codigo='+codigo;
}
