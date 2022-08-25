import {
  validarCodigo,
  validarTitulo,
  validarDescripcion,
  validarURL,
  validarGenero,
} from "./helpers.js";
import Pelicula from "./classPelicula.js";

let formAdmin = document.querySelector("#formAdmin");
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let genero = document.querySelector("#genero");

formAdmin.addEventListener("submit", crearPelicula);
// codigo.addEventListener("blur", () => {
//   validarCodigo(codigo);
// });
titulo.addEventListener("blur", () => {
  validarTitulo(titulo);
});
descripcion.addEventListener("blur", () => {
  validarDescripcion(descripcion);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
genero.addEventListener("blur", () => {
  validarGenero(genero);
});

function crearPelicula(e) {
  e.preventDefault();
  if (
    // validarCodigo(codigo) &&
    validarTitulo(titulo) &&
    validarDescripcion(descripcion) &&
    validarURL(url) &&
    validarGenero(genero)
  ) {
    const nuevaPelicula = new Pelicula(
      codigo.value,
      titulo.value,
      descripcion.value,
      url.value,
      genero.value
    );
    console.log(nuevaPelicula);
    listaPeliculas.push(nuevaPelicula);
    console.log(listaPeliculas);
    // guardar datos en el localstorage
    guardarDatosEnLS();
    // limpiar formulario
    limpiarFormulario();
    // dibujar peli en la tabla
    crearFila(nuevaPelicula)
    // cerrar ventana modal
    modalFormPelicula.hide();
  }
}

function limpiarFormulario() {
  formAdmin.reset(); //limpia los value de todo lo que hay en el fomr
  // hacer un bucle, tomar cada input y cambiar el className='form-control'
  let arrayInput = document.getElementsByTagName("input");
  let selectGenero = document.querySelector("#genero");
  selectGenero.className = "form-control";
  for (let i = 0; i < arrayInput.length; i++) {
    arrayInput[i].className = "form-control";
  }
}

//declarar variabes

let listaPeliculas =
  JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

const modalFormPelicula = new bootstrap.Modal(
  document.querySelector("#modalPelicula")
);
const btnCrearPelicula = document.querySelector("#btnCrearPelicula");

// agregar los eventos
btnCrearPelicula.addEventListener("click", mostrarFormulario);

cargaInicial()

function cargaInicial(){
  if(listaPeliculas.length > 0){
    // dibujar filas en la tabla
    listaPeliculas.map((pelicula)=>{crearFila(pelicula)})
  }
  // else mostrar un mensaje al usuario que no hay elementos para mostrar
}

function crearFila(pelicula){
  console.log(pelicula)
  let tablaPelicula = document.querySelector('#tablaPelicula')
  tablaPelicula.innerHTML += `<tr>
  <th scope="row">${pelicula.codigo}</th>
  <td>${pelicula.titulo}</td>
  <td>
    <p class="cortarText">
      ${pelicula.descripcion}
    </p>
  </td>
  <td>
    <p class="cortarText">
      ${pelicula.imagen}
    </p>
  </td>
  <td>${pelicula.genero}</td>
  <td>
    <button class="btn btn-warning mb-1">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger">
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`
}

function mostrarFormulario() {
  modalFormPelicula.show();
  codigo.value = uuidv4();
}

function guardarDatosEnLS() {
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}
