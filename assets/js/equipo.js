// Variables del DOM
const medicosTableBody = document.getElementById('medicosTable')
const nombreInput = document.getElementById('nombre');
const especialidadInput = document.getElementById('especialidad');
const experienciaInput = document.getElementById("experiencia"); 
const generoInput = document.getElementById("genero");   
const guardarBtn = document.getElementById('guardarBtn');
const medicoIdInput = document.getElementById('medicoId');
const searchInput = document.getElementById('search');
const toggleSortBtn = document.getElementById('toggleSortBtn');
const iconoNombre = document.getElementById('iconoNombre');
const iconoExperiencia = document.getElementById('iconoExperiencia');
const sortByExperienceBtn = document.getElementById('sortByExperienceBtn');

// Variable global para los médicos
let medicos = [];
let sortAscendente = true; // Control de si el orden es ascendente (true) o descendente (false)
let ordenAscendenteExperiencia = true;

// Función para obtener los datos de los médicos de forma asíncrona (simula fetch desde un archivo JSON)
async function obtenerMedicos() {
  try {
    const medicosResponse = await fetch('assets/js/medicos.json');  // Obtiene el primer JSON (médicos iniciales)
    const updateResponse = await fetch('assets/js/medicos_update.json');  // Obtiene el segundo JSON (actualizaciones)

    if (!medicosResponse.ok || !updateResponse.ok) throw new Error('Error al obtener los datos.');

    const medicosData = await medicosResponse.json();  // Datos iniciales
    const updateData = await updateResponse.json();    // Datos de actualización

    // Fusionar los dos JSON
    medicos = mergeMedicos(medicosData, updateData);

    // Medicos Stringify
    console.log("Medicos Stringify")
    console.log(medicosStringify = JSON.stringify(medicos))
    console.log("Medicos")
    console.log(medicos)
    console.log("Clon de medicos")
    // Clonación profunda ( con esto podemos clonar los objetos anidados )
    let clonMedicos = JSON.parse(JSON.stringify(medicos)); // Clonamos el objeto con merge

    console.log(clonMedicos)

    // Renderizar los médicos
    renderizarMedicos();
  } catch (error) {
    console.error('Error al obtener los médicos:', error);
  }
}



// Función merge
function mergeMedicos(original, update) {
  const medicosMap = new Map(original.map(medico => [medico.id, medico]));

  update.forEach(medico => {
    if (medicosMap.has(medico.id)) {
      medicosMap.set(medico.id, { ...medicosMap.get(medico.id), ...medico });
    } else {
      medicosMap.set(medico.id, medico);
    }
  });

  return Array.from(medicosMap.values());
}





// Función para filtrar los médicos por nombre
function filtrarMedicos() {
  const query = searchInput.value.toLowerCase();  // Convertir a minúsculas para hacer la búsqueda insensible a mayúsculas
  const medicosFiltrados = medicos.filter(medico => 
    medico.nombre.toLowerCase().includes(query) || 
    medico.especialidad.toLowerCase().includes(query)
  );

  renderizarMedicos(medicosFiltrados);  // Renderizar los médicos filtrados
}

// Función para ordenar los médicos por nombre (ascendente o descendente)
function ordenarPorNombre() {


  if (sortAscendente) {
    medicos.sort((a, b) => a.nombre.localeCompare(b.nombre));  // Orden ascendente
    iconoNombre.className = "bx bx-down-arrow-alt";  // Mostrar icono ascendente
  } else {
    medicos.sort((a, b) => b.nombre.localeCompare(a.nombre));  // Orden descendente
    iconoNombre.className = "bx bx-up-arrow-alt";  // Mostrar icono ascendente
  }

  // Alternar el estado de orden
  sortAscendente = !sortAscendente;

  renderizarMedicos();
}

// Función para ordenar los médicos por experiencia (ascendente o descendente)
function ordenarPorExperiencia() {
  if (sortAscendente) {
    medicos.sort((a, b) => a.experiencia - b.experiencia);  // Orden ascendente por experiencia
    iconoExperiencia.className = "bx bx-down-arrow-alt";  // Mostrar icono ascendente
  } else {
    medicos.sort((a, b) => b.experiencia - a.experiencia);  // Orden descendente por experiencia
    iconoExperiencia.className = "bx bx-up-arrow-alt";  // Mostrar icono ascendente
  }

  // Alternar el estado de orden
  sortAscendente = !sortAscendente;

  renderizarMedicos();
}


// Función para renderizar la lista de médicos
function renderizarMedicos() {
  const medicosParaRenderizar = arguments.length > 0 ? arguments[0] : medicos;

  medicosTableBody.innerHTML = '';  // Limpiar tabla

  medicosParaRenderizar.map(({ id, nombre, especialidad, imagen, experiencia, genero }) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'my-2');

                // Condicional segun genero para llamar dr o dra
                if (genero === "m") {
                  genero = "Dr."
              } else {
                  genero = "Dra."
              }

    card.innerHTML = `
                    <div class="card">
                        <div class="card-head mt-2">
                            <button class="button" onclick="eliminarMedico(${id})" class="btn btn-danger btn-sm rounded-0">X</button>
                        </div>
                        <div class="card-body text-center">
                            <img src="${imagen}" width="100" height="100" class="rounded-circle">
                            <h5 class="card-title">${genero} ${nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${especialidad}</h6>
                            <p class="card-text">Experiencia: ${experiencia} años </p>
                        </div>
                    </div>  
    `;
    medicosTableBody.appendChild(card);
  });
}

// Función para agregar 
async function guardarMedico() {
  const nombre = nombreInput.value;
  const especialidad = especialidadInput.value;
  const experiencia = experienciaInput.value;
  const genero = generoInput.value;
  

  if (!nombre || !especialidad) {
    alert("Debe completar todos los campos.");
    return;
  }

  const id = medicoIdInput.value;

  if (id) {
    const medico = medicos.find(m => m.id == id);
    medico.nombre = nombre;
    medico.especialidad = especialidad;
    medico.experiencia = experiencia;
    medico.genero = genero;
  } else {
    const nuevoMedico = {
      id: medicos.length + 1,  
      nombre: nombre,
      especialidad: especialidad,
      experiencia: experiencia,
      imagen: "assets/images/profile01.jpg",
      genero: genero
    };
    medicos.push(nuevoMedico);
  }

  nombreInput.value = '';
  especialidadInput.value = '';
  medicoIdInput.value = '';
  experienciaInput.value = '';
  generoInput.value = '';
  renderizarMedicos();
}



function eliminarMedico(id) {
  // Filtrar el doctor con el ID correspondiente
  const indice = medicos.findIndex(medico => medico.id === id);
  console.log(id)
  if (indice !== -1) {
      medicos.splice(indice, 1);  // Eliminar el doctor del arreglo
      renderizarMedicos();
  }
}

// Evento para guardar médico (agregar o actualizar)
guardarBtn.addEventListener('click', guardarMedico);

// Evento para buscar médicos en tiempo real
searchInput.addEventListener('input', filtrarMedicos);

// Evento para alternar el orden de los médicos por nombre
toggleSortBtn.addEventListener('click', ordenarPorNombre);

// Evento para alternar el orden de los médicos por experiencia
sortByExperienceBtn.addEventListener('click', ordenarPorExperiencia);

// Inicializar la tabla con los médicos cuando se carga la página
obtenerMedicos();

// Función para validar que la experiencia solo sea un numero
function validarNumero(input) {
  // Elimina cualquier carácter que no sea un número
  input.value = input.value.replace(/[^0-9]/g, '');
}