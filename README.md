# Evaluacion m2 t3

## 👁️ Acceso al proyecto
  Para visualizar el archivo HTML y poder modificar el archivo SASS

  Si tienes Git instalado en tu máquina, puedes clonar el repositorio usando el siguiente comando en tu terminal o línea de comandos:

  ```
  git clone https://github.com/bastianorte/Modulo3Laboratorio1.git
  ```

  #### Para poder ver la Web de forma correcta debes generar un servidor con "Live Server" de Visual Studio Code o similar
  
  Para modificar los archivos SASS, abre la carpeta descargada en Visual Studio Code

  Utiliza la extension "Live SASS Compiler" para modificar los archivos SCSS


## 📁 Proyecto 
```
├── assets      
│   ├── scss (Organización SASS 7-1.)
│   │     ├── abstracts
│   │     │     ├── _mixins.scss
│   │     │     └── _variables.scss
│   │     ├── component
│   │     │     ├── _buttons.scss
│   │     │     ├── _cart.scss
│   │     │     └── _slider.scss
│   │     ├── core
│   │     │     ├── _reset.scss
│   │     │     └── _typography.scss
│   │     ├── layout
│   │     │     ├── _banner.scss
│   │     │     ├── _footer.scss
│   │     │     └── _header.scss
│   │     ├── pages
│   │     │     ├── _contacto.scss
│   │     │     ├── _equipo.scss
│   │     │     └── _home.scss
│   │     ├── themes
│   │     │     └── _dark.scss
│   │     ├── vendors
│   │     │     └── carpeta bootstrap
│   │     └── styles.scss
│   ├── css
│   │     ├── styles.css
│   │     └── styles.css.map
│   ├── images
│   │     └── ..images.jpg
│   └──  js    
│         ├── agendar.js
│         ├── contacto.js
│         ├── equipo.js
│         └── main.js       
│
├── contacto.html  
├── agendar.html 
├── equipo.html 
├── index.html 
├── readme.md                  
```

##  Objetos JSON
En la Web de Hospital implemente dos arreglos de JSON, uno de doctores con objetos anidados y otro de servicios proporcionados por ciertos doctores.

En los objetos de los doctores, utilicé los siguientes valores: id, nombre, sexo, especialidad, imagen (en formato JPG), experiencia, disponibilidad y un objeto anidado de contacto que incluye teléfono y email.
```
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
    ...
```

En los objetos de servicios, utilicé un id (que posteriormente se usará para hacer el merge con el id del doctor) y el nombre del servicio.
```
const servicios = [
    { "id_medico": 1, "servicio": "Consulta Cardiológica" },
    ...
```

### Merge
Para realizar el merge, utilicé una función que emplea el método map(). Esta función genera un nuevo arreglo de médicos, en el que cada médico incluye un conjunto de servicios asociados, los cuales se asignan según su id.

```
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
```

### Clonación
Para la clonación, utilicé una clonación profunda, que permite duplicar objetos anidados. Realicé la clonación a partir del objeto resultante del merge.

```
    let clondoctors = JSON.parse(JSON.stringify(nuevosServicios)); // Clonamos el objeto con el objeto merge
```

### Recorrido
Para realizar el recorrido, utilicé el método map() junto con desestructuración de los campos id, nombre, especialidad, imagen, experiencia y sexo.
```
        clondoctors.map(({ id, nombre, especialidad, imagen, experiencia, sexo }) => {});
```

## Estructuras de datos

### Arreglos
Para agregar un nuevo doctor implemente un formulario con el metodo push()
```
clondoctors.push(nuevoDoctor);
```


Para eliminar un nuevo doctor hice una funcion para buscar el doctor por id y eliminarlo con el metodo splice()
```
    function eliminarDoctor(id) {
        // Filtrar el doctor con el ID correspondiente
        const indice = clondoctors.findIndex(doctor => doctor.id === id);
        if (indice !== -1) {
            clondoctors.splice(indice, 1);  // Eliminar el doctor del arreglo
            mostrarDoctores();  // Actualizar 
        }
    }
```


Para buscar un nuevo doctor use un filtro que buscaba por nombre y especialidad
```
  const doctoresFiltrados = clondoctors.filter(doctor => 
    doctor.nombre.toLowerCase().includes(input) || 
    doctor.especialidad.toLowerCase().includes(input)
  );
```


### Colas
Para gestionar las colas, utilicé una estructura que garantizara que los pacientes fueran atendidos en el mismo orden en que se registraron en la ventana de contacto.

Utilice el metodo push() para agregar pacientes al arreglo
```
        colaPacientes.push(paciente);  // Encolar paciente al final
```

y el metodo shift() para eliminar el primer paciente por orden de llegada
```
        const pacienteAtendido = colaPacientes.shift();  // Desencolar el primer paciente
```

### Pilas
Para gestionar las pilas, utilicé una estructura que permitiera eliminar la última cita registrada en la ventana de agendar hora.

Utilice el metodo push para agregar citas al arreglo
```
  citas.push(cita); // Agregar cita a la pila
```

Utilice el metodo pop eliminar la ultima cita registrada al arreglo 

```
  const citaCancelada = citas.pop(); // Eliminar la última cita
```


## 🔧 Tecnologías utilizadas
* Bootstrap
* BoxIcons
* GoogleFonts
* Sass


## :pencil2: Autor
Bastian Ortega Fuenzalida