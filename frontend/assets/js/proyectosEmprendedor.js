// Script para guardar un emprendimiento desde el formulario

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const aplicacion_web_url = document.getElementById("url").value;
    const imagenInput = document.getElementById("imagen");
    let imagen_path = "";

    // Si hay imagen, tomar el nombre del archivo (para demo)
    if (imagenInput && imagenInput.files.length > 0) {
      imagen_path = imagenInput.files[0].name;
    }

    // Construir el objeto para el modelo Project
    const data = {
      name,
      description,
      direccion,
      aplicacion_web_url,
      imagen_path,
      telefono, // Si tu modelo lo necesita, agrégalo
      // owner: ... // Aquí deberías poner el id del usuario loggeado
    };

    try {
      const req = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const res = await req.json();
      console.log(res);

      if (req.ok) {
        alert(res.message || "Emprendimiento guardado con éxito");
        // window.location.replace("proyectos-emprendedor.html");
      } else {
        alert(res.message || "Error al guardar el emprendimiento");
      }
    } catch (error) {
      alert("Error de conexión al guardar el emprendimiento");
    }
  });
});
