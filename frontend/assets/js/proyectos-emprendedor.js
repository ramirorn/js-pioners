// =============================
// Array de ejemplo de emprendimientos del emprendedor
// =============================
const proyectosEmprendedor = [
  {
    id: 1,
    nombre: "RocketJS",
    descripcion: "Plataforma de lanzamientos para proyectos JavaScript.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    direccion: "Calle Falsa 123",
    telefono: "555-1234",
    email: "juan.perez@example.com",
    aprobado: true, // Proyecto aprobado
  },
  {
    id: 2,
    nombre: "PixelCode",
    descripcion: "Desarrollo de videojuegos retro con JS.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    direccion: "Avenida Siempre Viva 456",
    telefono: "555-5678",
    email: "ana.gomez@example.com",
    aprobado: false, // Proyecto pendiente
  },
  {
    id: 3,
    nombre: "GreenTech",
    descripcion: "Soluciones ecológicas con tecnología web.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    direccion: "Boulevard Verde 789",
    telefono: "555-9012",
    email: "carlos.ruiz@example.com",
    aprobado: true,
  },
  {
    id: 4,
    nombre: "EduJS",
    descripcion: "Educación online para programadores JS.",
    imagen: "../assets/img/JS_PIONERS_LOGO-removebg-preview.png",
    direccion: "Calle del Saber 101",
    telefono: "555-3456",
    email: "laura.martinez@example.com",
    aprobado: false,
  },
];

// =============================
// Renderizar los proyectos en la vista
// =============================
window.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;

  // Contenedor de cards
  const contenedor = document.createElement("div");
  contenedor.style.display = "flex";
  contenedor.style.flexDirection = "column";
  contenedor.style.gap = "32px";
  contenedor.style.margin = "32px auto";
  contenedor.style.maxWidth = "600px";

  proyectosEmprendedor.forEach((proyecto) => {
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
    card.style.cursor = "pointer";

    // Imagen del emprendimiento
    const img = document.createElement("img");
    img.src = proyecto.imagen;
    img.alt = proyecto.nombre;
    img.style.width = "90px";
    img.style.height = "70px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "12px";

    // Nombre, descripción y estado de aprobación
    const info = document.createElement("div");
    info.style.flex = "1";
    info.innerHTML = `
      <h3 style="margin:0 0 8px 0;">${proyecto.nombre}</h3>
      <p style="margin:0;">${proyecto.descripcion}</p>
      <span style="display:inline-block; margin-top:8px; padding:4px 12px; border-radius:8px; font-size:0.95em; background:${
        proyecto.aprobado ? "#d1e7dd" : "#f8d7da"
      }; color:${proyecto.aprobado ? "#0f5132" : "#842029"};">
        ${proyecto.aprobado ? "Aprobado" : "Pendiente"}
      </span>
    `;

    // Agrega imagen y texto a la card
    card.appendChild(img);
    card.appendChild(info);
    contenedor.appendChild(card);

    // --- Modal de detalles ---
    card.addEventListener("click", () => {
      let modal = document.getElementById("modalDetalle");
      let modalBody = document.getElementById("modalDetalleBody");
      if (!modal) {
        // Si el modal no existe, crearlo dinámicamente
        modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "modalDetalle";
        modal.tabIndex = -1;
        modal.setAttribute("aria-labelledby", "modalDetalleLabel");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalDetalleLabel">Detalles del Emprendimiento</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body" id="modalDetalleBody"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modalBody = document.getElementById("modalDetalleBody");
      }
      if (!modalBody) return;
      modalBody.innerHTML = `
        <div style='display:flex; gap:32px; align-items:center;'>
          <img src='${proyecto.imagen}' alt='${
        proyecto.nombre
      }' style='width:120px; height:90px; object-fit:contain; border-radius:14px;'>
          <div>
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.descripcion}</p>
            <ul style='list-style:none; padding:0; margin:0;'>
              <li><strong>Dirección:</strong> ${proyecto.direccion}</li>
              <li><strong>Teléfono:</strong> ${proyecto.telefono}</li>
              <li><strong>Email:</strong> ${proyecto.email}</li>
              <li><strong>Estado:</strong> <span style='padding:2px 10px; border-radius:6px; background:${
                proyecto.aprobado ? "#d1e7dd" : "#f8d7da"
              }; color:${proyecto.aprobado ? "#0f5132" : "#842029"};'>${
        proyecto.aprobado ? "Aprobado" : "Pendiente"
      }</span></li>
            </ul>
          </div>
        </div>
      `;
      // Mostrar el modal Bootstrap
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    });
  });

  // Si no hay proyectos, muestra un mensaje amigable
  if (proyectosEmprendedor.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No tienes emprendimientos creados.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
  }

  main.appendChild(contenedor);
});
