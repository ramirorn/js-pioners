const login = document.getElementById("login");
const registrate = document.getElementById("Registrate");

registrate.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/frontend/pages/register.html";
});

login.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);
  try {
    const req = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const res = await req.json();
    console.log(res.data);

    if (req.ok) {
      // guardar el token en el localStorage para su posterior uso
      if (res.data.role === "Inversor") {
        window.location.replace(
          "http://127.0.0.1:5500/frontend/pages/home-inversor.html"
        );
      } else if (res.data.role === "Emprendedor") {
        window.location.replace(
          "http://127.0.0.1:5500/frontend/pages/emprendedor.html"
        );
      } else if (res.data.role === "Admin") {
        window.location.replace(
          "http://127.0.0.1:5500/frontend/pages/admin.html"
        );
      }
      localStorage.setItem("token", res.token);
    }
    // window.location.replace("home.html");
  } catch (error) {
    console.log(error);
    alert("Ocurrio un error al iniciar sesion");
  }
});
