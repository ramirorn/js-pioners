// Reemplazo: Traer proyectos reales del backend para el inversor
async function fetchEmpresas() {
  try {
    const req = await fetch("http://localhost:4000/api/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    const res = await req.json();
    if (!req.ok) {
      alert(res.msg || "Error al obtener proyectos");
      return [];
    }
    // Adaptar los datos si es necesario para el render
    return res.data || [];
  } catch (error) {
    alert("Error de conexión al cargar proyectos");
    return [];
  }
}

function renderCards(empresas) {
  // Limpia el stack y agrega una tarjeta por cada empresa
  cardStack.innerHTML = "";
  // Filtra solo empresas con _id válido
  const empresasValidas = empresas.filter((e) => e._id);
  if (empresasValidas.length === 0) {
    mostrarCardFinal();
    return;
  }
  likeBtn.disabled = false;
  dislikeBtn.disabled = false;
  empresasValidas.forEach((empresa, idx) => {
    // Crea el elemento de la tarjeta
    const card = document.createElement("div");
    card.className = "swipe-card";
    card.dataset.id = empresa._id;
    // Inserta imagen, nombre y descripción
    card.innerHTML = `
      <img src="${
        empresa.imagen_path ||
        "../assets/img/JS_PIONERS_LOGO-removebg-preview.png"
      }" alt="logo" style="width:90px; margin-bottom:12px;">
      <h4>${empresa.name}</h4>
      <p>${empresa.description}</p>
    `;
    cardStack.appendChild(card);
  });
}

// Inicializa la app: obtiene empresas y las muestra en tarjetas
fetchEmpresas().then(renderCards);

// Elementos principales del DOM
const cardStack = document.getElementById("card-stack"); // Contenedor de tarjetas
const likeBtn = document.getElementById("like-btn"); // Botón de like
const dislikeBtn = document.getElementById("dislike-btn"); // Botón de dislike

// Variables para el drag/swipe
let startX = 0; // Posición inicial del drag
let currentCard = null; // Tarjeta que se está moviendo
let isDragging = false; // Estado de arrastre

function getTopCard() {
  // Devuelve la tarjeta que está arriba del stack
  return cardStack.querySelector(".swipe-card:last-child");
}

function removeCard(card, action) {
  // Aplica animación de swipe y elimina la tarjeta
  card.classList.add(action);
  setTimeout(() => {
    card.remove();
    // Si ya no quedan tarjetas, muestra la card final
    if (!getTopCard()) {
      mostrarCardFinal();
    }
  }, 400);
}

function mostrarCardFinal() {
  // Crea y muestra la tarjeta final cuando no quedan empresas
  const card = document.createElement("div");
  card.className = "swipe-card";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.innerHTML = `
    <h4>¡Ya no hay más empresas!</h4>
    <p>Vuelve más tarde para ver nuevos proyectos.</p>
  `;
  cardStack.appendChild(card);
  // Deshabilita los botones de like/dislike
  likeBtn.disabled = true;
  dislikeBtn.disabled = true;
}

function handleDragStart(e) {
  // Inicia el arrastre de la tarjeta superior
  currentCard = getTopCard();
  if (!currentCard) return;
  isDragging = true;
  startX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
  currentCard.classList.add("swiping");
}

function handleDragMove(e) {
  // Mueve la tarjeta mientras se arrastra
  if (!isDragging || !currentCard) return;
  const x = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
  const deltaX = x - startX;
  currentCard.style.transform = `translateX(${deltaX}px) rotate(${
    deltaX / 15
  }deg)`;
}

function handleDragEnd(e) {
  // Finaliza el arrastre y decide si es like/dislike
  if (!isDragging || !currentCard) return;
  const x = e.type.startsWith("touch")
    ? e.changedTouches[0].clientX
    : e.clientX;
  const deltaX = x - startX;
  currentCard.classList.remove("swiping");
  currentCard.style.transform = "";
  isDragging = false;
  if (deltaX > 120) {
    // Swipe a la derecha: like
    removeCard(currentCard, "liked");
  } else if (deltaX < -120) {
    // Swipe a la izquierda: dislike
    removeCard(currentCard, "disliked");
  }
}

// Eventos para arrastrar y soltar tarjetas (mouse y touch)
cardStack.addEventListener("mousedown", handleDragStart);
cardStack.addEventListener("touchstart", handleDragStart);
cardStack.addEventListener("mousemove", handleDragMove);
cardStack.addEventListener("touchmove", handleDragMove);
cardStack.addEventListener("mouseup", handleDragEnd);
cardStack.addEventListener("touchend", handleDragEnd);

// Eventos para los botones de like/dislike
likeBtn.addEventListener("click", async () => {
  const card = getTopCard();
  if (card) {
    const projectId = card.dataset.id;
    // Fetch para registrar interés (like)
    try {
      const req = await fetch(
        `http://localhost:4000/api/projects/interesado/${projectId}`,
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
        alert(res.msg || "Error al registrar interés");
      }
    } catch (error) {
      alert("Error de conexión al registrar interés");
    }
    removeCard(card, "liked");
  }
});
dislikeBtn.addEventListener("click", async () => {
  const card = getTopCard();
  if (card) {
    const projectId = card.dataset.id;
    // Fetch para registrar no interés (dislike)
    try {
      const req = await fetch(
        `http://localhost:4000/api/projects/no_interesado/${projectId}`,
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
        alert(res.msg || "Error al registrar no interés");
      }
    } catch (error) {
      alert("Error de conexión al registrar no interés");
    }
    removeCard(card, "disliked");
  }
});
