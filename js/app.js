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
    limpiarFormulario();
    modalFormPelicula.hide();
  } else {
    alert("Corregir datos");
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

function mostrarFormulario() {
  modalFormPelicula.show();
  codigo.value = uuidv4();
}

function guardarDatosEnLS() {
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}
