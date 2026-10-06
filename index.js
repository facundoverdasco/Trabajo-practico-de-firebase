import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js"
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyCuW9QlcZ6X5GdK40Q2L1u8cRVTsUg44Q",
    authDomain: "tp2fr-789a3.firebaseapp.com",
    projectId: "tp2fr-789a3",
    storageBucket: "tp2fr-789a3.firebasestorage.app",
    messagingSenderId: "291959575946",
    appId: "1:291959575946:web:48f3f01d338aafddbf2473"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

let nombre = document.getElementById("name")
let hotel = document.getElementById("hotel")
let precio = document.getElementById("precio")
let destino = document.getElementById("destino")
let boton = document.getElementById("Guardar")


boton.onclick = function () {
    let agencia = ref(database, "agenciadeviaje/" + nombre.value)
    set(agencia, {
        hotel: hotel.value,
        destino: destino.value,
        precio: precio.value
    })
    .then(() => {
        console.log("Datos guardados correctamente")
    })
    .catch((error) => {
        console.error("Error al guardar:", error)
    })
}

let consulta = ref(database, "agenciadeviaje")
let tabla = document.getElementById("tabla")
onValue(consulta, (datos) => {
    let registros = datos.val()
    tabla.innerHTML = ""
    for (let nombreAgencia in registros) {
        let agencia = registros[nombreAgencia]
        tabla.innerHTML += `
            <tr>
                <td>${nombreAgencia}</td>
                <td>${agencia.hotel}</td>
                <td>${agencia.destino}</td>
                <td>${agencia.precio}</td>
            </tr>
        `
    }
})



