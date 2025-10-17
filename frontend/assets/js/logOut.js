const logOut = () => {
  localStorage.removeItem("token");
  window.location.replace("http://127.0.0.1:5500/frontend/index.html");
};

document.getElementById("logout").addEventListener("click", logOut);
