// Script para guardar un emprendimiento desde el formulario

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // --- 1. Obtener valores y el archivo ---
    const name = document.getElementById("nombre").value;
    const description = document.getElementById("descripcion").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const aplicacion_web_url = document.getElementById("url").value;
    const imagenInput = document.getElementById("imagen"); // Input type="file"
    const imagenFile = imagenInput.files[0]; // CRÍTICO: Obtenemos el archivo binario

    // --- 2. Crear FormData ---
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('direccion', direccion);
    formData.append('aplicacion_web_url', aplicacion_web_url);


    // CRÍTICO: Adjuntar el archivo. 'imagen' DEBE COINCIDIR con el campo usado en Multer (upload.single('imagen')).
    if (imagenFile) {
      formData.append('imagen', imagenFile); 
    }

    try {
      const req = await fetch("http://localhost:4000/api/projects", {
        method: "POST",
        body: formData, 
        headers: {
          // CRÍTICO: NO incluir "Content-type": "application/json"
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // ... (Resto de la lógica de respuesta se mantiene) ...
      const res = await req.json();
      console.log(res);

      if (req.ok) {
        alert(res.msg || "Emprendimiento guardado con éxito");
        // window.location.replace("proyectos-emprendedor.html");
      } else {
        alert(res.msg || "Error al guardar el emprendimiento");
      }
    } catch (error) {
      alert("Error de conexión al guardar el emprendimiento");
    }
  });
});