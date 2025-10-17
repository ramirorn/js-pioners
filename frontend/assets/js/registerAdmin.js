// Registro de administrador
const form = document.getElementById("admin-register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dni = document.getElementById("dni").value;

  const data = { username, email, password, dni, role: "Admin" };
  // console.log(data);

  try {
    const req = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    if (req.ok) {
      window.location.replace(
        "http://127.0.0.1:5500/frontend/pages/login.html"
      );
    } else {
      alert(res.msg);
    }
  } catch (error) {
    alert("Error de conexión al registrar admin");
  }
});
