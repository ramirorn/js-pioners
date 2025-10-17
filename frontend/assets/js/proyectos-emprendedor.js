// =============================
// Fetch y renderizado de proyectos del emprendedor
// =============================
window.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");
  if (!main) return;

  // Contenedor de cards
  const contenedor = document.createElement("div");
  contenedor.style.display = "flex";
  contenedor.style.flexDirection = "column";
  contenedor.style.gap = "32px";
  contenedor.style.margin = "32px auto";
  contenedor.style.maxWidth = "600px";

  // Fetch de proyectos
  let proyectos = [];
  try {
    const req = await fetch("http://localhost:4000/api/projects/my", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req.json();
    if (req.ok && res.data) {
      proyectos = res.data;
    }
  } catch (error) {
    // Si falla el fetch, muestra mensaje
    const msg = document.createElement("p");
    msg.textContent = "No se pudieron cargar los proyectos.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
    main.appendChild(contenedor);
    return;
  }

  proyectos.forEach((proyecto) => {
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
    img.src =
      proyecto.imagen_path ||
      "../assets/img/JS_PIONERS_LOGO-removebg-preview.png";
    img.alt = proyecto.name;
    img.style.width = "90px";
    img.style.height = "70px";
    img.style.objectFit = "contain";
    img.style.borderRadius = "12px";

    // Nombre, descripción y estado de aprobación
    const info = document.createElement("div");
    info.style.flex = "1";
    info.innerHTML = `
      <h3 style="margin:0 0 8px 0;">${proyecto.name}</h3>
      <p style="margin:0;">${proyecto.description}</p>
      <span style="display:inline-block; margin-top:8px; padding:4px 12px; border-radius:8px; font-size:0.95em; background:${
        proyecto.estado === "Aprobado" ? "#d1e7dd" : "#f8d7da"
      }; color:${proyecto.estado === "Aprobado" ? "#0f5132" : "#842029"};">
        ${proyecto.estado === "Aprobado" ? "Aprobado" : "Pendiente"}
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
          <img src='${
            proyecto.imagen_path ||
            "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
          }' alt='${
        proyecto.name
      }' style='width:120px; height:90px; object-fit:contain; border-radius:14px;'>
          <div>
            <h3>${proyecto.name}</h3>
            <p>${proyecto.description}</p>
            <ul style='list-style:none; padding:0; margin:0;'>
              <li><strong>Dirección:</strong> ${proyecto.direccion}</li>
              <li><strong>Estado:</strong> <span style='padding:2px 10px; border-radius:6px; background:${
                proyecto.estado === "Aprobado" ? "#d1e7dd" : "#f8d7da"
              }; color:${
        proyecto.estado === "Aprobado" ? "#0f5132" : "#842029"
      };'>${
        proyecto.estado === "Aprobado" ? "Aprobado" : "Pendiente"
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
  if (proyectos.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No tienes emprendimientos creados.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
  }

  main.appendChild(contenedor);
});
