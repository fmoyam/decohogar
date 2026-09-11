const comunas = ['Maipú', 'Pudahuel Santiago', 'Estación Central', 'Providencia', 'Las Condes'];

const contenedor = document.getElementById('direcciones');
const btnAgregar = document.getElementById('btn-agregar');
let contador = 0;

function agregarDireccion() {
  contador++;
  const index = contador;

  // como css
  const bloque = document.createElement('div');
  bloque.className = 'border rounded p-3 mb-3';
  bloque.style.backgroundColor = '#f8f9fa';

  const opciones = ['<option value="">Seleccione comuna</option>']
    .concat(comunas.map((c) => `<option value="${c}">${c}</option>`))
    .join('');

  bloque.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h5 class="h6 mb-0 fw-semibold">Dirección ${index}</h5>
      <button type="button" class="btn-close btn-eliminar" aria-label="Eliminar"></button>
    </div>
    <div class="mb-2">
      <input type="text" class="form-control form-control-sm" name="alias_${index}" maxlength="20" placeholder="Alias (ej. Casa, Trabajo)" />
    </div>
    <div class="mb-2">
      <input type="text" class="form-control form-control-sm" name="direccion_${index}" minlength="10" required placeholder="Dirección (mínimo 10 caracteres)" />
    </div>
    <div class="mb-1">
      <select class="form-select form-select-sm" name="comuna_${index}" required>
        ${opciones}
      </select>
    </div>
  `;

  bloque.querySelector('.btn-eliminar').addEventListener('click', () => bloque.remove());
  contenedor.appendChild(bloque);
}

//Validaciones
function validarContra(password) {
  const errores = [];

  if (password.length < 8) {
    errores.push("Debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errores.push("Debes incluir al menos una letra mayúscula");
  }
  if (!/[a-z]/.test(password)) {
    errores.push("Debe incluir al menos una letra minúscula");
  }
  if (!/[0-9]/.test(password)) {
    errores.push("Debes incluir al menos un número");
  }
  if (!/[@#$!%*?&]/.test(password)) {
    errores.push("Debe incluir al menos un carácter especial (@#$!%*?&)");
  }

  return errores;
}

btnAgregar.addEventListener('click', agregarDireccion);
agregarDireccion();

const mapaRegistro = new Map();
let contadorRegistro = 1;
const formRegistro = document.querySelector('form');

formRegistro.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombre = document.getElementById('inputNombre').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const contra = document.getElementById('passwordInput').value;
  const confirmarContra = document.getElementById('confirmPasswordInput').value;
  const erroresContra = validarContra(contra);

  if (nombre === "") {
    alert("El nombre completo no puede estar vacío.");
    inputNombre.focus();
    return;
  }

  if (nombre.length > 100) {
    alert("El nombre completo no puede tener más de 100 caracteres.");
    inputNombre.focus();
    return;
  }

  if (!/^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]+$/.test(nombre)) {
    alert("El nombre completo solo puede contener caracteres alfabéticos y espacios.");
    inputNombre.focus();
    return;
  }

  if (!email.endsWith("@duoc.cl")) {
    alert("El correo electrónico debe terminar en @duoc.cl");
    inputEmail.focus();
    return;
  }

  if (erroresContra.length > 0) {
    alert("La contraseña no cumple los requisitos:\n\n• " + erroresContra.join("\n• "));
    inputContra.focus();
    return;
  }

  if (contra !== confirmarContra) {
    alert("Las contraseñas no coinciden. Intenta de nuevo.");
    confirm_password.focus();
    return;
  }

  const emailDuplicado = Array.from(mapaRegistro.values()).some(
    (datos) => datos[1].toLowerCase() === email.toLowerCase()
  );
  if (emailDuplicado) {
    alert('Este correo electrónico ya se encuentra registrado.');
    return;
  }

  const estilosSeleccionados = [...document.querySelectorAll('input[type=checkbox]:checked')]
    .map((cb) => cb.name);

  if (estilosSeleccionados.length === 0) {
    alert('Debe seleccionar al menos un estilo de decoración.');
    return;
  }

  const datosUsuario = [
    nombre,
    email,
    contra,
    estilosSeleccionados,
  ];

  const clave = `usuario_${contadorRegistro}`;
  mapaRegistro.set(clave, datosUsuario);

  alert("Registro exitoso");

  console.log('Clave:', clave);
  console.log('mapaRegistro.get(clave):', mapaRegistro.get(clave));
  console.log('mapaRegistro:', mapaRegistro);

  contadorRegistro++;
  formRegistro.reset();
  contenedor.innerHTML = '';
  contador = 0;
  agregarDireccion();
});