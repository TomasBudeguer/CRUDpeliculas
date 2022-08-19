import {
  validarCodigo,
  validarTitulo,
  validarDescripcion,
  validarURL,
  validarGenero,
} from "./helpers.js";

let formAdmin = document.querySelector("#formAdmin");
let codigo = document.querySelector("#codigo");
let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let url = document.querySelector("#url");
let genero = document.querySelector("#genero");

formAdmin.addEventListener("submit", crearSerie);
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
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

function crearSerie(e) {
  e.preventDefault();
  if (
    validarCodigo(codigo) &&
    validarTitulo(titulo) &&
    validarDescripcion(descripcion) &&
    validarURL(url) &&
    validarGenero(genero)
  ) {
    console.log("Serie creada");
    limpiarFormulario();
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
