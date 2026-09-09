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

btnAgregar.addEventListener('click', agregarDireccion);
agregarDireccion();
