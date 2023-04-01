const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#formulario");

// Cargar los datos del LocalStorage
window.addEventListener("load", () => {
  const nombre = localStorage.getItem("nombre");
  const apellido = localStorage.getItem("apellido");
  const nivel = localStorage.getItem("nivel");
  const fechaInicio = localStorage.getItem("fechaInicio");

  if (nombre && apellido && nivel && fechaInicio) {
    const edad = localStorage.getItem("edad");
    const data = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      nivel: nivel,
      fechaInicio: fechaInicio,
    };

    const resultado = inscribirseEnTenis(nombre, apellido, nivel, fechaInicio, edad);
    mensaje.textContent = resultado;
  }
});

// Formulario
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const { value: nombre } = document.querySelector("#nombre");
  const { value: apellido } = document.querySelector("#apellido");
  const { value: edad } = document.querySelector("#edad");
  const { value: nivel } = document.querySelector("#nivel");
  const { value: fechaInicio } = document.querySelector("#fechaInicio");

  const data = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    nivel: nivel,
    fechaInicio: fechaInicio,
  };

  //Nivel Tenístico
  const jsonString = JSON.stringify(data);
  console.log(data);
  if (!nivel) {
    mensaje.textContent = "Seleccione un nivel.";
    return;
  }

  //Inicio de la actividad
  if (!fechaInicio) {
    mensaje.textContent = "Seleccione una fecha de inicio.";
    return;
  }

  localStorage.setItem("nombre", nombre);
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("edad", edad);
  localStorage.setItem("nivel", nivel);
  localStorage.setItem("fechaInicio", fechaInicio);

  const resultado = inscribirseEnTenis(nombre, apellido, nivel, fechaInicio, edad);
  mensaje.textContent = resultado;
});

//Precio segun los dias
function calcularPrecioTotal(diasReserva, nivel, edad) {
  const precios = {
    1: 100,
    2: 175,
    3: 270,
    4: 380,
    5: 490,
  };
  let errorMensaje = "";

  if (nivel === "escuelita") {
    if (edad < 5 || edad > 11) {
      errorMensaje = "Lo sentimos, la Escuelita de Tenis es para niños entre 5 y 11 años.";
      return errorMensaje;
    }
  } else {
    if (isNaN(diasReserva)) {
      errorMensaje = "Ingrese un número válido de días de reserva.";
      return errorMensaje;
    }
    diasReserva = parseInt(diasReserva);
  }

  const precioTotal = precios[diasReserva];
  return precioTotal;
}

function inscribirseEnTenis(nombre, apellido, nivel, fechaInicio, edad) {
  let mensaje = "";

  const hoy = new Date();

  const diasReserva = (nivel === "escuelita") ? 2 : document.querySelector("#diasReserva").value;
  const precioTotal = calcularPrecioTotal(diasReserva, nivel, edad);

  if (typeof precioTotal === "string") {
    mensaje = precioTotal;
  } else {
    mensaje = `¡Felicidades ${nombre} ${apellido}! Te has inscripto en las clases de tenis. El precio total de tu reserva por ${diasReserva} día(s) es de ${precioTotal} dólares.`;
  }

  return mensaje;
}

//Inscripcion
function inscribirseEnTenis(nombre, apellido, nivel, fechaInicio, edad) {
  let mensaje = "";

  const hoy = new Date();

  if (nivel === "escuelita" && (edad < 5 || edad > 11)) {
    mensaje = "Lo sentimos, la Escuelita de Tenis es para niños entre 5 y 11 años.";
  } else {
    let diasReserva = 1;

    if (nivel === "escuelita") {
      diasReserva = 2;
    } else {
      const diasInput = document.querySelector("#diasReserva").value;
      diasReserva = parseInt(diasInput);
    }

    const precioTotal = calcularPrecioTotal(diasReserva, nivel);
    mensaje = `¡Felicidades ${nombre} ${apellido}! Te has inscripto en las clases de tenis. El precio total de tu reserva por ${diasReserva} día(s) es de ${precioTotal} dólares.`;
  }
  return mensaje;
}