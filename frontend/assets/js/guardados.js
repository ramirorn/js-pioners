// Array de ejemplo con empresas y si fueron guardadas (like)
const empresasEjemplo = [
  {
    id: 1,
    nombre: "RocketJS",
    descripcion: "Plataforma de lanzamientos para proyectos JavaScript.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    interado: false, // No guardado
  },
  {
    id: 2,
    nombre: "PixelCode",
    descripcion: "Desarrollo de videojuegos retro con JS.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    interado: false,
  },
  {
    id: 3,
    nombre: "GreenTech",
    descripcion: "Soluciones ecológicas con tecnología web.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    interado: true, // Guardado
  },
  {
    id: 4,
    nombre: "EduJS",
    descripcion: "Educación online para programadores JS.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    interado: false,
  },
  {
    id: 5,
    nombre: "FinanCode",
    descripcion: "Fintech para gestión financiera en startups.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    interado: true,
  },
];

// Filtrar solo los emprendimientos guardados (like)
const guardados = empresasEjemplo.filter((e) => e.interado);

// Renderizar los guardados en la vista
window.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;
  // Crear contenedor visual
  const contenedor = document.createElement("div");
  contenedor.style.display = "flex";
  contenedor.style.flexDirection = "column";
  contenedor.style.gap = "32px";
  contenedor.style.margin = "32px auto";
  contenedor.style.maxWidth = "600px";

  guardados.forEach((empresa) => {
    // Card visual tipo lista horizontal
    const card = document.createElement("div");
    card.style.display = "flex";
    card.style.alignItems = "center";
    card.style.background = "#fff";
    card.style.borderRadius = "18px";
    card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
    card.style.padding = "12px 24px";
    card.style.gap = "24px";
    card.style.minHeight = "90px";

    // Imagen
    const img = document.createElement("img");
    img.src = empresa.imagen;
    img.alt = empresa.nombre;
    img.style.width = "90px";
    img.style.height = "70px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "12px";

    // Nombre y descripción
    const info = document.createElement("div");
    info.style.flex = "1";
    info.innerHTML = `<h3 style="margin:0 0 8px 0;">${empresa.nombre}</h3><p style="margin:0;">${empresa.descripcion}</p>`;

    card.appendChild(img);
    card.appendChild(info);
    contenedor.appendChild(card);
  });

  // Si no hay guardados, mostrar mensaje
  if (guardados.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No tienes emprendimientos guardados.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
  }

  main.appendChild(contenedor);
});
