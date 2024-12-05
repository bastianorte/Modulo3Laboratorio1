    // Pila 
    let citas = [];

    // Función para agendar una cita (push)
    function agendarCita() {
      const nombre = document.getElementById('nombre').value;
      const fecha = document.getElementById('fecha').value;
      const hora = document.getElementById('hora').value;

      if (nombre && fecha && hora) {
        const cita = {
          nombre: nombre,
          fecha: fecha,
          hora: hora
        };

        // Agregar cita
        citas.push(cita); 

        document.getElementById("nombre").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("hora").value = "";


        actualizarLista();
      } else {
        alert('Por favor, ingrese todos los datos (nombre, fecha y hora).');
      }
    }

    // Cancelar la última cita (pop)
    function cancelarCita() {
      if (citas.length > 0) {
        const citaCancelada = citas.pop(); // Eliminar la última cita
        actualizarLista();
        alert(`Cita de ${citaCancelada.nombre} el ${formatearFecha(citaCancelada.fecha)} a las ${citaCancelada.hora} ha sido cancelada.`);
      } else {
        alert('No hay citas agendadas para cancelar.');
      }
    }

    // Formatear fecha en español
    function formatearFecha(fecha) {
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaObj = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', opciones).format(fechaObj);
        }

    // Función para actualizar la lista de citas en la interfaz
    function actualizarLista() {
      const lista = document.getElementById('listaCitas');
      lista.innerHTML = ''; // Limpiar lista

      citas.forEach((cita, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'my-2');

        card.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <h5>Paciente: ${cita.nombre}</h5>
                <p>Fecha: ${formatearFecha(cita.fecha)}, </p>
                <p>Hora: ${cita.hora}</p>
            </div>
        </div>   
        `;

        lista.appendChild(card); 
      });
    }

