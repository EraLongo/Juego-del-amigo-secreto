let amigos = [];  // Array para almacenar los nombres de los jugadores

// Elementos del DOM
const inputAmigo = document.getElementById("amigo");
const listaAmigos = document.getElementById("listaAmigos");
const botonSortear = document.querySelector(".button-draw");
const resultadoList = document.getElementById("resultado");
const botonReset = document.querySelector(".button-reset"); // Botón de reiniciar

// Función para agregar un amigo a la lista
function agregarAmigo() {
    const nombreAmigo = inputAmigo.value.trim();  // Obtener el valor del input y eliminar espacios extra

    // Validar que el campo no esté vacío
    if (nombreAmigo === "") {
        alert("Por favor, ingrese un nombre para continuar con el sorteo.");
        return;
    }

    // Agregar el nombre al array de amigos y actualizar la lista visual
    amigos.push(nombreAmigo);
    inputAmigo.value = "";  // Limpiar el campo de texto
    actualizarListaAmigos();  // Actualizar la lista visual en el DOM

    // Habilitar el botón de sortear si hay al menos dos amigos
    if (amigos.length > 1) {
        botonSortear.disabled = false;
    }
}

// Función para actualizar la lista visual de amigos
function actualizarListaAmigos() {
    listaAmigos.innerHTML = "";  // Limpiar la lista actual

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    // Si no hay suficientes amigos no relizar sorteo
    if (amigos.length < 2) {
        alert("Necesitas al menos dos personas para hacer el sorteo.");
        return;
    }

    // precaucion para no ser tu propio amigo secreto
    let amigosSecretos = [...amigos];
    let resultados = {};

    // Asignar a cada uno un amigo secreto de manera aleatoria
    amigos.forEach(amigo => {
        let index = Math.floor(Math.random() * amigosSecretos.length);
        while (amigosSecretos[index] === amigo) {
            index = Math.floor(Math.random() * amigosSecretos.length);
        }

        // Asignar el amigo secreto y quitar a los seleccionados
        let amigoSecreto = amigosSecretos[index];
        resultados[amigo] = amigoSecreto;
        amigosSecretos.splice(index, 1);  // Esta linea eliminar el amigo secreto ya asignado
    });

    // Mostrar los resultados
    mostrarResultados(resultados);
}

// Función para mostrar los resultados del sorteo
function mostrarResultados(resultados) {
    resultadoList.innerHTML = "";  // Limpiar la lista de resultados

    for (const [amigo, amigoSecreto] of Object.entries(resultados)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} -> ${amigoSecreto}`;
        resultadoList.appendChild(li);
    }

    // Deshabilitar el botón de sorteo después de realizarlo
    botonSortear.disabled = true;

    // Mostrar el botón de reiniciar
    botonReset.style.display = "inline-block";
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Limpiar el array de amigos
    amigos = [];

    // Limpiar las listas en la interfaz de usuario
    listaAmigos.innerHTML = "";
    resultadoList.innerHTML = "";

    // Volver a habilitar el botón de sortear
    botonSortear.disabled = false;

    // Limpiar el campo de entrada
    inputAmigo.value = "";

    // Ocultar el botón de reiniciar
    botonReset.style.display = "none";
}
