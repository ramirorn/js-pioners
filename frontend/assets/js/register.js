const inicioDeSesionBtn = document.getElementById("inicio-de-sesion");
const register = document.getElementById("register");

//Para que se desplieguen los inputs segun el tipo de usuario
document.addEventListener("DOMContentLoaded", function () {
  const radioInversor = document.getElementById("inversorRadio");
  const radioEmprendedor = document.getElementById("emprendedorRadio");
  const inputsInversor = document.getElementById("inputs-inversor");

  function mostrarInputs() {
    if (radioInversor && radioInversor.checked) {
      inputsInversor.style.display = "block";
    } else if (radioEmprendedor && radioEmprendedor.checked) {
      inputsInversor.style.display = "none";
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

  const tipoUsuarioInput = document.querySelector('input[name="role"]:checked');
  if (!tipoUsuarioInput) {
    alert("Por favor selecciona un tipo de usuario.");
    return;
  }
  const role = tipoUsuarioInput.value;
  //inversor
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const empresa = document.getElementById("empresa").value;

  const data = { username, email, password, dni, role };

  // console.log(data);
  //Que guarde los datos segun el tipo de usuario
  if (role === "Inversor") {
    data.nombre = nombre;
    data.apellido = apellido;
    data.empresa = empresa;
  }

  console.log(data);
  // Enviar los datos al servidor
  const req = await fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();
  console.log(res);

  if (req.ok) {
    window.location.replace("http://127.0.0.1:5500/frontend/pages/login.html");
  } else {
    alert(res.msg);
  }
});
