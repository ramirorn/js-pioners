// =============================
// Fetch y renderizar los proyectos pendientes en la vista admin
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
  contenedor.style.maxWidth = "700px";

  // Fetch de proyectos pendientes
  let proyectosPendientes = [];
  try {
    const req = await fetch("http://localhost:4000/api/projects/pendientes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const res = await req.json();
    if (req.ok && res.data) {
      proyectosPendientes = res.data;
    }
  } catch (error) {
    const msg = document.createElement("p");
    msg.textContent = "No se pudieron cargar los proyectos pendientes.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
    main.appendChild(contenedor);
    return;
  }

  proyectosPendientes.forEach((proyecto) => {
    if (proyecto.revisado) return;

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
    img.style.objectFit = "cover";
    img.style.borderRadius = "12px";

    // Info: nombre y descripción
    const info = document.createElement("div");
    info.style.flex = "1";
    info.innerHTML = `<h3 style=\"margin:0 0 8px 0;\">${proyecto.name}</h3><p style=\"margin:0;\">${proyecto.description}</p>`;

    // Botones de aprobar/rechazar
    const acciones = document.createElement("div");
    acciones.style.display = "flex";
    acciones.style.flexDirection = "column";
    acciones.style.gap = "12px";
    acciones.style.alignItems = "center";

    // Botón aprobar
    const btnAprobar = document.createElement("button");
    btnAprobar.innerHTML = "✔️";
    btnAprobar.title = "Aprobar";
    btnAprobar.style.background = "#4caf50";
    btnAprobar.style.color = "#fff";
    btnAprobar.style.border = "none";
    btnAprobar.style.borderRadius = "50%";
    btnAprobar.style.width = "38px";
    btnAprobar.style.height = "38px";
    btnAprobar.style.fontSize = "1.5rem";
    btnAprobar.style.cursor = "pointer";
    btnAprobar.addEventListener("click", async () => {
      // Marcar como revisado y aprobado en el backend
      try {
        const req = await fetch(
          `http://localhost:4000/api/projects/aprobar/${proyecto._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const res = await req.json();
        if (!req.ok) {
          alert(res.msg || "Error al aprobar proyecto");
          return;
        }
      } catch (error) {
        alert("Error de conexión al aprobar proyecto");
        return;
      }
      card.remove();
    });

    // Botón rechazar
    const btnRechazar = document.createElement("button");
    btnRechazar.innerHTML = "✖️";
    btnRechazar.title = "Rechazar";
    btnRechazar.style.background = "#e53935";
    btnRechazar.style.color = "#fff";
    btnRechazar.style.border = "none";
    btnRechazar.style.borderRadius = "50%";
    btnRechazar.style.width = "38px";
    btnRechazar.style.height = "38px";
    btnRechazar.style.fontSize = "1.5rem";
    btnRechazar.style.cursor = "pointer";
    btnRechazar.addEventListener("click", async () => {
      // Marcar como revisado y no aprobado en el backend
      try {
        const req = await fetch(
          `http://localhost:4000/api/projects/rechazar/${proyecto._id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const res = await req.json();
        if (!req.ok) {
          alert(res.msg || "Error al rechazar proyecto");
          return;
        }
      } catch (error) {
        alert("Error de conexión al rechazar proyecto");
        return;
      }
      card.remove();
    });

    acciones.appendChild(btnAprobar);
    acciones.appendChild(btnRechazar);

    // Agrega imagen, info y acciones a la card
    card.appendChild(img);
    card.appendChild(info);
    card.appendChild(acciones);
    contenedor.appendChild(card);

    // --- Modal de detalles ---
    card.addEventListener("click", (e) => {
      // Evitar que el click en los botones dispare el modal
      if (e.target === btnAprobar || e.target === btnRechazar) return;
      const modalBody = document.getElementById("modalDetalleBody");
      if (!modalBody) return;
      modalBody.innerHTML = `
        <div style='display:flex; gap:32px; align-items:center;'>
          <img src='${
            proyecto.imagen_path ||
            "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
          }' alt='${
        proyecto.name
      }' style='width:120px; height:90px; object-fit:cover; border-radius:14px;'>
          <div>
            <h3>${proyecto.name}</h3>
            <p>${proyecto.description}</p>
            <ul style='list-style:none; padding:0; margin:0;'>
              <li><strong>Dueño:</strong> ${proyecto.owner || "-"}</li>
              <li><strong>Dirección:</strong> ${proyecto.direccion || "-"}</li>
            </ul>
          </div>
        </div>
      `;
      // Mostrar el modal Bootstrap
      const modal = new bootstrap.Modal(
        document.getElementById("modalDetalle")
      );
      modal.show();
    });
  });

  // Si no hay proyectos pendientes, mostrar mensaje
  if (proyectosPendientes.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No hay emprendimientos pendientes de aprobación.";
    msg.style.textAlign = "center";
    msg.style.marginTop = "48px";
    contenedor.appendChild(msg);
  }

  // Agrega el contenedor al main
  main.appendChild(contenedor);
});
