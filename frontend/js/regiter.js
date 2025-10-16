const inicioDeSesionBtn = document.getElementById("inicio-de-sesion");
const register = document.getElementById("register");

//Para que se desplieguen los inputs segun el tipo de usuario
document.addEventListener("DOMContentLoaded", function () {
  const radioInversor = document.getElementById("inversorRadio");
  const radioEmprendedor = document.getElementById("emprendedorRadio");
  const inputsInversor = document.getElementById("inputs-inversor");
  const inputsEmprendedor = document.getElementById("inputs-emprendedor");

  function mostrarInputs() {
    if (radioInversor && radioInversor.checked) {
      inputsInversor.style.display = "block";
      inputsEmprendedor.style.display = "none";
    } else if (radioEmprendedor && radioEmprendedor.checked) {
      inputsInversor.style.display = "none";
      inputsEmprendedor.style.display = "block";
    }
  }

  if (radioInversor) radioInversor.addEventListener("change", mostrarInputs);
  if (radioEmprendedor)
    radioEmprendedor.addEventListener("change", mostrarInputs);
  mostrarInputs();
});

// Redirigir a la página de inicio de sesión al hacer clic en el botón
inicioDeSesionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/frontend/pages/login.html";
});

register.addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const tipoUsuarioInput = document.querySelector(
    'input[name="tipoUsuario"]:checked'
  );
  if (!tipoUsuarioInput) {
    alert("Por favor selecciona un tipo de usuario.");
    return;
  }
  const tipoUsuario = tipoUsuarioInput.value;
  //inversor
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const empresa = document.getElementById("empresa").value;

  //emprendedor
  const dniEmprendedor = document.getElementById("dni-emprendedor").value;
  const emprendimiento = document.getElementById("emprendimiento").value;
  const imagen = document.getElementById("imagen-emprendimiento").value;
  const aplicacionWeb = document.getElementById("aplicacion-web").value;
  const direccion = document.getElementById("direccion-emprendimiento").value;

  const data = { username, email, password, tipoUsuario };

  //Que guarde los datos segun el tipo de usuario
  if (tipoUsuario === "inversor") {
    data.dni = dni;
    data.nombre = nombre;
    data.apellido = apellido;
    data.empresa = empresa;
  } else if (tipoUsuario === "emprendedor") {
    data.dni = dniEmprendedor;
    data.emprendimiento = emprendimiento;
    data.imagen = imagen;
    data.aplicacionWeb = aplicacionWeb;
    data.direccion = direccion;
  }

  // Enviar los datos al servidor
  const req = await fetch("http://localhost:3000/api/usuarios/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });

  const res = await req.json();

  if (req.ok) {
    alert(res.message);
    window.location.replace("index.html");
  } else {
    alert(res.message);
  }
});
