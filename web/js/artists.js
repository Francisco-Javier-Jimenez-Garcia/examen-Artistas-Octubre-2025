"use strict"

import { galleryRenderer } from '/js/renderers/gallery.js';
// 1.) IMPORTACIONES

// Importamos la API de la vista artistwithusers

import { artistswithusersAPI_auto } from '/js/api/_artistswithusers.js';

// 2.) LA FUNCION PRINCIPAL

async function main() {
    try{
        //Pedimos los datos a la BD y esperamos (await) a que lleguen
        let artists = await artistswithusersAPI_auto.getAll();
        /*
        // de momento solo los imprimimos por consola para comprobar que funciona 
        console.log("Datos recibidos de la BD");
        console.log(artists);
        */

        //Metemos ahora el renderizado bueno

        let gallery = galleryRenderer.asGallery(artists);
        let contentDiv = document.getElementById("content");
        contentDiv.innerHTML = ""; //esto limpia el texto que habia de "Sustituir por este contenido..."
        contentDiv.appendChild(gallery);

    }

    catch (error) { 
        console.error("Error al obtener los artistas:", error);
    }
}

// 3.) EVENT LISTENER

// Ejecuta la funcion main() solo cuando la pagina HTML este totalmente cargada

document.addEventListener("DOMContentLoaded", main);
