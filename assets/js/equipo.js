    // Arreglo de doctores 
const doctores = [
    {
        "id": 1,
        "nombre": "Mauricio Palma",
        "sexo": "m",
        "especialidad": "Cardiología",
        "imagen": "assets/images/pr4.jpg",
        "experiencia": 5,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 2,
        "nombre": "Barbara Brito",
        "sexo": "f",
        "especialidad": "Cardiología",
        "imagen": "assets/images/pr8.jpg",
        "experiencia": 9,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 3,
        "nombre": "Ramiro Ramirez",
        "sexo": "m",
        "especialidad": "Dermatología",
        "imagen": "assets/images/pr5.jpg",
        "experiencia": 8,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 4,
        "nombre": "Johana Perez",
        "sexo": "f",
        "especialidad": "Dermatología",
        "imagen": "assets/images/pr9.jpg",
        "experiencia": 7,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 5,
        "nombre": "Luis Martínez",
        "sexo": "m",
        "especialidad": "Pediatría",
        "imagen": "assets/images/pr6.jpg",
        "experiencia": 6,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 6,
        "nombre": "Patricia Gómez",
        "sexo": "f",
        "especialidad": "Pediatría",
        "imagen": "assets/images/pr10.jpg",
        "experiencia": 5,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 7,
        "nombre": "Jorge Ruiz",
        "sexo": "m",
        "especialidad": "Neurología",
        "imagen": "assets/images/pr7.jpg",
        "experiencia": 4,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    },
    {
        "id": 8,
        "nombre": "Marta Torres",
        "sexo": "f",
        "especialidad": "Neurología",
        "imagen": "assets/images/pr11.jpg",
        "experiencia": 3,
        "disponibilidad": "Si",
        "contacto": {
        "telefono": 222,
        "email": "j@gmail.com"
      }
    }
  ]

// JSON de servicios brindados
const servicios = [
    { "id_medico": 1, "servicio": "Consulta Cardiológica" },
    { "id_medico": 1, "servicio": "Electrocardiograma" },
    { "id_medico": 2, "servicio": "Consulta Pediátrica" },
    { "id_medico": 3, "servicio": "Consulta Dermatológica" },
    { "id_medico": 3, "servicio": "Biopsia de piel" }
    ]
      

    // Función para fusionar los médicos con sus servicios
    function mergeMedicosConServicios() {
        // Usamos `map()` para recorrer los médicos
        const medicosConServicios = doctores.map(medico => {
          // Filtramos los servicios que pertenecen a este médico
          const serviciosMedico = servicios.filter(servicio => servicio.id_medico === medico.id)
                                           .map(servicio => servicio.servicio); // Obtenemos solo el nombre del servicio por id
  
          // Devolvemos el médico con una nueva propiedad 'servicios'
          return {
            ...medico, // Medico
            servicios: serviciosMedico // Servicios
          };
        });
  
        return medicosConServicios; // Devolvemos el array de médicos con sus servicios
      }
    
      // Creamos un nuevo arreglo con los doctores
      const nuevosServicios = mergeMedicosConServicios();


    // Clonación profunda ( con esto podemos clonar los objetos anidados )
    let clondoctors = JSON.parse(JSON.stringify(nuevosServicios)); // Clonamos el objeto con merge


  
// Función para mostrar los doctores en la tabla
      function mostrarDoctores() {
        const doctorCards = document.getElementById('doctorCards');
        doctorCards.innerHTML = '';  

        // Usamos el método map para recorrer el arreglo y mostrar los datos con destructuring
        clondoctors.map(({ id, nombre, especialidad, imagen, experiencia, sexo }) => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'my-2');

            // Condicional segun genero para llamar dr o dra
            if (sexo === "m") {
                sexo = "Dr."
            } else {
                sexo = "Dra."
            }

            // Agregar datos a la tarjeta
            card.innerHTML = `
                    <div class="card">
                        <div class="card-head mt-2">
                            <button class="button" onclick="eliminarDoctor(${id})" class="btn btn-danger btn-sm rounded-0">X</button>
                        </div>
                        <div class="card-body text-center">
                            <img src="${imagen}" width="100" height="100" class="rounded-circle">
                            <h5 class="card-title">${sexo} ${nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${especialidad}</h6>
                            <p class="card-text">Experiencia: ${experiencia} años </p>
                        </div>
                    </div>   
            `;

            doctorCards.appendChild(card); 
        });
        
      }


      // Función para agregar un nuevo doctor
    document.getElementById("addDoctorForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

        const nombre = document.getElementById("nombre").value;
        const especialidad = document.getElementById("especialidad").value;
        const experiencia = document.getElementById("experiencia").value;  
        const sexo = document.getElementById("genero").value;   

        // Crear un nuevo objeto doctor
        const nuevoDoctor = {
            id: clondoctors.length + 1,  // Asignamos un ID único
            nombre: nombre,
            especialidad: especialidad,
            experiencia: experiencia,
            imagen: "assets/images/profile01.jpg",
            sexo: sexo
        };

        // Agregar el nuevo doctor al array de doctores   
        clondoctors.push(nuevoDoctor);

        // Limpiar los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("especialidad").value = "";
        document.getElementById("experiencia").value = "";

        // Volver a mostrar la lista de doctores
        mostrarDoctores(clondoctors);
    });
  

      // Función para buscar doctores por nombre o especialidad
      function buscarDoctor() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        
        // Filtrar doctores que coincidan con el texto ingresado (nombre o especialidad)
        const doctoresFiltrados = clondoctors.filter(doctor => 
          doctor.nombre.toLowerCase().includes(input) || 
          doctor.especialidad.toLowerCase().includes(input)
        );
        
        mostrarDoctoresConFiltro(doctoresFiltrados);
      }
  
    // Función para mostrar los doctores con el filtro aplicado
    function mostrarDoctoresConFiltro(doctoresFiltrados) {
        const doctorCards = document.getElementById('doctorCards');
        doctorCards.innerHTML = '';  // Limpiar las cards actuales
  
        doctoresFiltrados.map(({ id, nombre, especialidad, imagen, experiencia }) => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'my-2');

            card.innerHTML = `
                    <div class="card">
                        <div class="card-head mt-2">
                            <button class="button" onclick="eliminarDoctor(${id})" class="btn btn-danger btn-sm rounded-0">X</button>
                        </div>
                        <div class="card-body text-center">
                            <img src="${imagen}" width="100" height="100" class="rounded-circle">
                            <h5 class="card-title">${nombre}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${especialidad}</h6>
                            <p class="card-text">Experiencia: ${experiencia} años </p>
                        </div>
                    </div>   
            `;

            doctorCards.appendChild(card); 
        });
      }
  
    // Función para eliminar un doctor por ID
    function eliminarDoctor(id) {
        // Filtrar el doctor con el ID correspondiente
        const indice = clondoctors.findIndex(doctor => doctor.id === id);
        if (indice !== -1) {
            clondoctors.splice(indice, 1);  // Eliminar el doctor del arreglo
            mostrarDoctores();  // Actualizar 
        }
    }
  

    // Estado para saber si el orden es ascendente o descendente
    let ordenAscendenteNombre = true;  // Para el nombre
    let ordenAscendenteExperiencia = true;  // Para la experiencia      
  
    // Función para alternar el orden de los doctores por nombre
    function alternarOrdenarPorNombre() {
        ordenAscendenteNombre = !ordenAscendenteNombre;  // Cambiar el estado
        const iconoNombre = document.getElementById('iconoNombre');
        
        clondoctors.sort((a, b) => {
          if (ordenAscendenteNombre) {
            iconoNombre.className = "bx bx-up-arrow-alt";  // Mostrar icono ascendente
            return a.nombre.localeCompare(b.nombre);  // Orden ascendente
          } else {
            iconoNombre.className = "bx bx-down-arrow-alt";  // Mostrar icono descendente
            return b.nombre.localeCompare(a.nombre);  // Orden descendente
          }
        });
        mostrarDoctores();  // Actualizar la tabla
      }
  
      // Función para alternar el orden de los doctores por experiencia
      function alternarOrdenarPorExperiencia() {
        ordenAscendenteExperiencia = !ordenAscendenteExperiencia;  // Cambiar el estado
        const iconoExperiencia = document.getElementById('iconoExperiencia');
        
        clondoctors.sort((a, b) => {
          if (ordenAscendenteExperiencia) {
            iconoExperiencia.className = "bx bx-up-arrow-alt";  // Mostrar icono ascendente
            return a.experiencia - b.experiencia;  // Orden ascendente
          } else {
            iconoExperiencia.className = "bx bx-down-arrow-alt";  // Mostrar icono descendente
            return b.experiencia - a.experiencia;  // Orden descendente
          }
        });
        mostrarDoctores();  // Actualizar la tabla
      }
  
      // Mostrar los doctores al cargar la página
      window.onload = mostrarDoctores;


/// Función que se ejecutará cuando haya cambios en el DOM
function actualizaConCambio() {
    console.clear();   
    console.log("arreglo original:"); 
    console.log(doctores);
    console.log("clon:"); 
    console.log(clondoctors);

    // Aquí puedes poner la lógica que necesites para actualizar la función
  }
  
  // Configuración de la observación
  const observer = new MutationObserver((mutationsList, observer) => {
    // Iterar sobre los cambios detectados
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        actualizaConCambio();
      }
    }
  });
  
  // Opciones del observer (puedes ajustarlas según lo que necesites)
  const config = { 
    childList: true, // Detecta cambios en la estructura del DOM (añadir/eliminar nodos)
    subtree: true,   // Observa todo el árbol de nodos, no solo los nodos inmediatos
    attributes: true // Detecta cambios en los atributos de los elementos
  };
  
  // Selecciona el nodo que deseas observar (por ejemplo, el body)
  const targetNode = document.body;
  
  // Inicia la observación
  observer.observe(targetNode, config);
