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
let peliculaNueva = true; // si pelicula nueva es true, entonces crear peli, caso contrario actualizar una peli

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
    peliculaNueva &&
    // validarCodigo(codigo) &&
    validarTitulo(titulo) &&
    validarDescripcion(descripcion) &&
    validarURL(url) &&
    validarGenero(genero)
  ) {
    generarPelicula();
  } else {
    actualizarPelicula();
  }
}

function generarPelicula() {
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
  crearFila(nuevaPelicula);
  // mostrar mensaje al usuario
  Swal.fire(
    "Pelicula creada!",
    "La pelicula fue creada correctamente!",
    "success"
  );
  // cerrar ventana modal
  modalFormPelicula.hide();
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

cargaInicial();

function cargaInicial() {
  if (listaPeliculas.length > 0) {
    // dibujar filas en la tabla
    listaPeliculas.map((pelicula) => {
      crearFila(pelicula);
    });
  }
  // else mostrar un mensaje al usuario que no hay elementos para mostrar
}

function crearFila(pelicula) {
  // console.log(pelicula)
  let tablaPelicula = document.querySelector("#tablaPelicula");
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
    <button class="btn btn-warning mb-1" onclick="editarPelicula('${pelicula.codigo}')">
      <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger" onclick="borrarPelicula('${pelicula.codigo}')">
      <i class="bi bi-x-square"></i>
    </button>
  </td>
</tr>`;
}

function mostrarFormulario() {
  peliculaNueva = true;
  // limpiar el formulario
  limpiarFormulario()
  modalFormPelicula.show();
  codigo.value = uuidv4();
}

function guardarDatosEnLS() {
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}

window.borrarPelicula = function (codigo) {
  Swal.fire({
    title: "Eliminar pelicula",
    text: "Esta por eliminar la pelicula señeccionada, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      // aqui agregar la logica para borrar

      // buscar en listaPeliculas el codigo de la peli qeu quiero borrar
      // Opcion 1: findIndex, splice(posicion, cantidad de elementos a borrar)
      // Opcion 2: filter

      //Opcion mia
      // console.log(listaPeliculas.findIndex((cod)=>cod.codigo === codigo))
      // let itemCod = listaPeliculas.findIndex((cod)=>cod.codigo === codigo)
      // listaPeliculas.splice(itemCod, 1)

      //Opcion en clase
      // let copiaListaPeliculas = listaPeliculas.filter((pelicula)=>{return pelicula.codigo != codigo})
      let copiaListaPeliculas = listaPeliculas.filter(
        (pelicula) => pelicula.codigo != codigo
      ); //return implicito

      // tarea borrar del arreglo listaPeliculas el elemento del codigo recbidio por parametro
      listaPeliculas = copiaListaPeliculas;

      // actualizar el localStorage
      guardarDatosEnLS();

      // actualizar la tabla
      actualizarTabla();
      Swal.fire(
        "Pelicula eliminada!",
        "La pelicula fue borrada exitosamente",
        "success"
      );
    }
  });
};

function actualizarTabla() {
  let tablaPelicula = document.querySelector("#tablaPelicula");
  tablaPelicula.innerHTML = "";
  cargaInicial();
}

window.editarPelicula = function (codigoBuscado) {
  peliculaNueva = false;
  // mostrar ventana modal
  modalFormPelicula.show();
  // buscar la pelicula que quiero mostrar en el formulario
  let peliBuscada = listaPeliculas.find(
    (pelicula) => pelicula.codigo === codigoBuscado
  );
  // cargar el formulario con los datos
  codigo.value = peliBuscada.codigo;
  titulo.value = peliBuscada.titulo;
  descripcion.value = peliBuscada.descripcion;
  url.value = peliBuscada.imagen;
  genero.value = peliBuscada.genero;
};

function actualizarPelicula() {
  console.log("actualizando datos de la peli...");
  // buscar la posicion pelicula que estoy editando en el arreglo de peliculas (codigo)
  // console.log(codigo.value)

  // console.log(listaPeliculas.findIndex((pelicula)=>pelicula.codigo === codigo.value))
  let posicionPelicula = listaPeliculas.findIndex((pelicula)=>pelicula.codigo === codigo.value)
  console.log(posicionPelicula)

  // actualizar todos los datos del objeto (listaPeliculas[0(posicion que tengo que encontrar)].titulo = titulo.value;)
  listaPeliculas[posicionPelicula].titulo = titulo.value
  listaPeliculas[posicionPelicula].descripcion = descripcion.value
  listaPeliculas[posicionPelicula].imagen = url.value
  listaPeliculas[posicionPelicula].genero = genero.value

  // actualizar el localStorage
  guardarDatosEnLS()

  // actualizar la tabla
  actualizarTabla()

  // cerrar ventana modal
  modalFormPelicula.hide()

  // limpiar el formulario
  limpiarFormulario()
}
