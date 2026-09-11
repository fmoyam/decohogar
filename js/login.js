const usuariosRegistrados = new Map();
usuariosRegistrados.set("felip.fernandezc@duoc.cl", "ColoColo");
usuariosRegistrados.set("felip.moya@duocuc.cl", "fmoyam");
usuariosRegistrados.set("javiera.banares@duocuc.cl", "jbanares");

const formLogin = document.getElementById("login");
const contenedorError = document.getElementById("mensaje-error");

const Login = document.querySelector("#form-login");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = formLogin.email.value.trim();
  const contra = formLogin.password.value;

  if (!usuariosRegistrados.has(email)) {
    alert("El correo ingresado no se encuentra registrado.");
    return;
  }
  const passwordGuardada = usuariosRegistrados.get(email);

  if (passwordGuardada !== contra) {
    alert("Contraseña incorrecta. Revisa tus credenciales.");
    return;
  }

  alert("Ha iniciado sesión. Bienvenido/a!");
  window.location.href = "index.html";
});