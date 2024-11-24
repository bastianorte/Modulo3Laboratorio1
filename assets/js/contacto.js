// Una cola: El cliente que toma el primer boleto debe ser atendido primero. 

    // Cola para manejar a los pacientes
    let colaPacientes = [];

    // Función para registrar un paciente (enqueue)
    function registrarPaciente() {
      const nombre = document.getElementById('nombre').value;

      if (nombre) {
        const fechaHoraRegistro = obtenerFechaHoraActual();
        const paciente = {
          nombre: nombre,
          fechaHora: fechaHoraRegistro
        };

        colaPacientes.push(paciente);  // Encolar paciente al final
        actualizarLista();
        document.getElementById('nombre').value = '';  // Limpiar el campo de texto
      } else {
        alert('Por favor, ingrese un nombre.');
      }
    }

    // Función para ordenar la hora obtenida en español
    // la hora actual solo se pondra para confirmar el funcionamiento como cola y de forma estetica
    function obtenerFechaHoraActual() {
      const ahora = new Date();
      const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Intl.DateTimeFormat('es-ES', opciones).format(ahora);
    }

    // Función para atender un paciente (dequeue)
    function atenderPaciente() {
      if (colaPacientes.length > 0) {
        const pacienteAtendido = colaPacientes.shift();  // Desencolar el primer paciente
        actualizarLista();
        alert(`Paciente ${pacienteAtendido.nombre} ha sido atendido.`);
      } else {
        alert('No hay pacientes en espera.');
      }
    }

    // Función para actualizar la lista de pacientes en la interfaz
    function actualizarLista() {
      const lista = document.getElementById('listaPacientes');
      lista.innerHTML = '';  // Limpiar lista

      if (colaPacientes.length === 0) {
        lista.innerHTML = '<div class="col-md-12 text-center">No hay pacientes en espera.</div>';
        return;
      }

      // Mostrar pacientes en espera
      colaPacientes.forEach((paciente, index) => {
        const div = document.createElement('div');
        div.classList.add('col-md-6', 'col-sm-12', 'text-center');

        div.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <h5>Paciente: ${paciente.nombre}</h5>
                <p>Hora de llegada: ${paciente.fechaHora}</p>
            </div>
        </div>   
        `;

        lista.appendChild(div);
      });
    }