
/// Función que se ejecutará cuando haya cambios en el DOM
function actualizaConCambio() {
    console.log('El DOM ha cambiado');
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