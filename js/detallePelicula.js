// obtener el parametro de la url
console.log(window.location.search)

const parametroCodigo = new URLSearchParams(window.location.search);
console.log(parametroCodigo.get('codigo'))
// buscar en el arreglo de peliculas cual tiene el mismo codigo de mi parametro
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || []
let peliBuscada = listaPeliculas.find((pelicula)=> pelicula.codigo === parametroCodigo.get('codigo'))

console.log(peliBuscada)
// dibujar la card
let detalle = document.querySelector('#seccionDetalle')
detalle.innerHTML = `<div class="card mb-3">
<div class="row g-0">
  <div class="col-md-4">
    <img
      src="${peliBuscada.imagen}"
      class="img-fluid rounded-start"
      alt="${peliBuscada.titulo}"
    />
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${peliBuscada.titulo}</h5>
      <p class="card-text">
        ${peliBuscada.descripcion}
      </p>
      <p class="card-text">
        Genero:
        <span class="badge rounded-pill bg-info text-white"
          >${peliBuscada.genero}</span
        >
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>
</div>
</div>`