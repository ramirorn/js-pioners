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
    // Card visual Bootstrap
    const card = document.createElement("div");
    card.className = "card mb-3 shadow-sm border-0";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-auto">
          <img src="${
            proyecto.imagen_path ||
            "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
          }" alt="${
      proyecto.name
    }" class="img-fluid rounded-start" style="width:90px; height:70px; object-fit:contain; border-radius:12px;">
        </div>
        <div class="col">
          <div class="card-body">
            <h5 class="card-title mb-1 fw-bold" style="color:#1976d2;">${
              proyecto.name
            }</h5>
            <p class="card-text mb-2">${proyecto.description}</p>
            <span class="badge px-3 py-2" style="background:${
              proyecto.estado === "Aprobado" ? "#d1e7dd" : "#f8d7da"
            }; color:${
      proyecto.estado === "Aprobado" ? "#0f5132" : "#842029"
    }; font-size:1em;">${proyecto.estado}</span>
          </div>
        </div>
      </div>
    `;
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
              <div class="modal-header bg-primary text-white">
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
        <div class='row align-items-center'>
          <div class='col-auto'>
            <img src='${
              proyecto.imagen_path ||
              "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
            }' alt='${
        proyecto.name
      }' class='img-fluid rounded' style='width:120px; height:90px; object-fit:contain; border-radius:14px;'>
          </div>
          <div class='col'>
            <h3 class='fw-bold' style='color:#1976d2;'>${proyecto.name}</h3>
            <p>${proyecto.description}</p>
            <ul class='list-unstyled mb-0'>
              <li><strong>Dirección:</strong> ${proyecto.direccion}</li>
              <li><strong>Estado:</strong> <span class='badge px-3 py-2' style='background:${
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
