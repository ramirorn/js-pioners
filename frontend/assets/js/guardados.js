// =============================
// Fetch y renderizar solo los emprendimientos guardados (like)
// =============================
window.addEventListener("DOMContentLoaded", async () => {
  const guardadosList = document.getElementById("guardados-list");
  if (!guardadosList) return;

  // Fetch de proyectos guardados (interesados)
  let guardados = [];
  try {
    const req = await fetch("http://localhost:4000/api/projects/interesados", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req.json();
    if (req.ok && res.data) {
      guardados = res.data;
    }
  } catch (error) {
    const msg = document.createElement("p");
    msg.textContent = "No se pudieron cargar los guardados.";
    msg.className = "text-center mt-4 text-danger";
    guardadosList.appendChild(msg);
    return;
  }

  // Por cada empresa guardada, crea una card visual dentro de #guardados-list
  guardados.forEach((empresa) => {
    // Card visual tipo lista horizontal con Bootstrap
    const card = document.createElement("div");
    card.className = "card mb-2 shadow-sm border-0";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <div class="card-body d-flex align-items-center gap-3">
        <img src="${
          empresa.imagen_path ||
          "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
        }" alt="${
      empresa.name
    }" class="rounded" style="width:70px; height:56px; object-fit:contain;">
        <div class="flex-grow-1">
          <h5 class="mb-1">${empresa.name}</h5>
          <p class="mb-0 text-muted">${empresa.description}</p>
        </div>
        <i class="bi bi-info-circle fs-4 text-primary ms-2"></i>
      </div>
    `;
    guardadosList.appendChild(card);

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
        <div class="d-flex gap-4 align-items-center">
          <img src="${
            empresa.imagen_path ||
            "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
          }" alt="${
        empresa.name
      }" class="rounded" style="width:120px; height:90px; object-fit:contain;">
          <div>
            <h4>${empresa.name}</h4>
            <p>${empresa.description}</p>
            <ul class="list-unstyled mb-0">
              <li><strong>Dueño:</strong> ${empresa.owner || "-"}</li>
              <li><strong>Dirección:</strong> ${empresa.direccion || "-"}</li>
              <li><strong>Email:</strong> ${empresa.email || "-"}</li>
            </ul>
          </div>
        </div>
      `;
      // Mostrar el modal Bootstrap
      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    });
  });

  // Si no hay guardados, muestra un mensaje amigable
  if (guardados.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No tienes emprendimientos guardados.";
    msg.className = "text-center mt-4 text-muted";
    guardadosList.appendChild(msg);
  }
});
