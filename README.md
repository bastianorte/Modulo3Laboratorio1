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
│         ├── medicos.json
│         ├── medicos_update.json
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

En los objetos de los médicos, utilicé los siguientes valores: id, nombre, sexo, especialidad, imagen (en formato JPG), experiencia, disponibilidad y un objeto anidado de contacto que incluye teléfono y email.
```
medicos.json
 [
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
    ...]
```

Para el merge, utilicé un arreglo de médicos que se combinan con el arreglo original.
```
medicos_update.json
[
    { "id": 2, "nombre": "Ana García", "especialidad": "Pediatra", "telefono": "123-456-7890" },
    { "id": 4, "nombre": "Pedro Gómez", "especialidad": "Neurología" }
  ]
  
```

### Merge
Para el merge, utilicé un arreglo de médicos que se combinan con el arreglo original.

```
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

El método .map() en JavaScript tiene una complejidad temporal de O(n), donde n es el numero de medicos
El método .set() en JavaScript tiene una complejidad temporal de O(1)
```

### Clonación
Para la clonación, utilicé una clonación profunda, que permite duplicar objetos anidados. Realicé la clonación a partir del objeto resultante del merge.

```
let clondoctors = JSON.parse(JSON.stringify(nuevosServicios)); // Clonamos el objeto con el objeto merge

La clonación profunda tiene una complejidad de O(n) donde n es el numero de arreglos del objeto
```

### Recorrido
Para realizar el recorrido, utilicé el método map() junto con desestructuración de los campos id, nombre, especialidad, imagen, experiencia y sexo.
```
medicos.map(({ id, nombre, especialidad, imagen, experiencia, sexo }) => {});

El método .map() en JavaScript tiene una complejidad temporal de O(n), donde n es el numero de medicos
```

## Estructuras de datos

### Arreglos
Para agregar un nuevo doctor implemente un formulario con el metodo push()
```
medicos.push(nuevoMedico);

.push tiene una complejidad de O(1), solo se agrega el ultimo médico
```


Para eliminar un nuevo doctor hice una funcion para buscar el doctor por id y eliminarlo con el metodo splice()
```
function eliminarMedico(id) {
  // Filtrar el doctor con el ID correspondiente
  const indice = medicos.findIndex(medico => medico.id === id);
  console.log(id)
  if (indice !== -1) {
      medicos.splice(indice, 1);  // Eliminar el doctor del arreglo
      renderizarMedicos();
  }
}

  .findIndex() en JavaScript tiene una complejidad de O(n), donde n es el número de elementos en el array.
  El método .splice() en JavaScript tiene una complejidad de O(n)
```


Para buscar un nuevo doctor use un filtro que buscaba por nombre y especialidad
```
const doctoresFiltrados = clondoctors.filter(doctor => 
  doctor.nombre.toLowerCase().includes(input) || 
  doctor.especialidad.toLowerCase().includes(input)
);

El método .filter() en JavaScript tiene una complejidad de O(n), donde n es el número de elementos en el array.
```

Para ordenar los arrays por orden de nombre use el metodo .sort
```
function ordenarPorExperiencia() {
  if (sortAscendente) {
    medicos.sort((a, b) => a.experiencia - b.experiencia);  
    iconoExperiencia.className = "bx bx-down-arrow-alt";  
  } else {
    medicos.sort((a, b) => b.experiencia - a.experiencia);  
    iconoExperiencia.className = "bx bx-up-arrow-alt";  
  }

  el metodo .sort tiene complejidad de O(n log n), donde n es el número de elementos en el array.
```


### Colas
Para gestionar las colas, utilicé una estructura que garantizara que los pacientes fueran atendidos en el mismo orden en que se registraron en la ventana de contacto.

Utilice el metodo push() para agregar pacientes al arreglo

```
colaPacientes.push(paciente);  // Encolar paciente al final


.push tiene una complejidad de O(1), solo de agrega el ultimo paciente
```

y el metodo shift() para eliminar el primer paciente por orden de llegada

```
const pacienteAtendido = colaPacientes.shift();  // Desencolar el primer paciente

.shift tiene una complejidad de O(1), solo se elimina el primer paciente
```

### Pilas
Para gestionar las pilas, utilicé una estructura que permitiera eliminar la última cita registrada en la ventana de agendar hora.

Utilice el metodo push para agregar citas al arreglo
```
citas.push(cita); // Agregar cita a la pila

.push tiene una complejidad de O(1), solo se agrega la ultima cita
```

Utilice el metodo pop eliminar la ultima cita registrada al arreglo 

```
const citaCancelada = citas.pop(); // Eliminar la última cita

.pop tiene una complejidad de O(1), se elimina la ultima cita

```


## 🔧 Tecnologías utilizadas
* Bootstrap
* BoxIcons
* GoogleFonts
* Sass


## :pencil2: Autor
Bastian Ortega Fuenzalida