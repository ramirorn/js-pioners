const login = document.getElementById("login");
const registrate = document.getElementById("Registrate");

registrate.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/frontend/pages/register.html";
});

login.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log(username, password);
  try {
    const req = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const res = await req.json();

    if (req.ok) {
      alert(res.message);
      // guardar el token en el localStorage para su posterior uso
      localStorage.setItem("token", res.token);
      window.location.replace("home.html");
    } else {
      alert(res.message);
    }
  } catch (error) {
    console.log(error);
    alert("Ocurrio un error al iniciar sesion");
  }
});
