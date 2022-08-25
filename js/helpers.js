export function validarCodigo(input) {
  let expReg = /^[\w]{1,30}$/;
  if (expReg.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarTitulo(input) {
  if (input.value.trim().length >= 2 && input.value.trim().length <= 30) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarDescripcion(input) {
  if (input.value.trim().length >= 30 && input.value.trim().length <= 350) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarURL(input) {
  let expReg = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (expReg.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

export function validarGenero(input) {
  let genero = document.querySelector("#genero");
  let valorGenero = genero.value;
  if (valorGenero) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}
