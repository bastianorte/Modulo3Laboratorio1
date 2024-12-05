// Una cola

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

        colaPacientes.push(paciente);  // Agregar paciente
        actualizarLista();
        document.getElementById('nombre').value = ''; 
      } else {
        alert('Por favor, ingrese un nombre.');
      }
    }

    // Hora en español
    function obtenerFechaHoraActual() {
      const ahora = new Date();
      const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Intl.DateTimeFormat('es-ES', opciones).format(ahora);
    }

    // Eliminar primer paciente
    function atenderPaciente() {
      if (colaPacientes.length > 0) {
        const pacienteAtendido = colaPacientes.shift();  // Desencolar el primer paciente
        actualizarLista();
        alert(`Paciente ${pacienteAtendido.nombre} ha sido atendido.`);
      } else {
        alert('No hay pacientes en espera.');
      }
    }

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