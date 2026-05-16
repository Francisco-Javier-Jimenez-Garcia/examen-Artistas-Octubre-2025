"use strict"

// Importamos la API para enviar los datos del formulario a la BD

import { artistsAPI_auto } from "/js/api/_artists.js";

// Importamos el validador del formulario

import { artistValidator } from "/js/validators/validateartists.js";

// Importamos el renderizador de mensajes para renderizar los mensajes de error 

import { messageRenderer } from "/js/renderers/messages.js";

// Importamos el gestor de sesion para conseguir el usuario logueado

import { sessionManager } from "/js/utils/session.js";






async function main() {
    //Buscamos el formulario por su ID en create_artists.html

    let registerForm = document.getElementById("artist-form");

    // cuando se envie (onsubmit) ejecuta la funcion handleSubmit

    registerForm.onsubmit = handleSubmit;

}

async function handleSubmit(event){
    //hacemos que la pagina no se recargue al estado por defecto al pulsar enviar
    event.preventDefault();

    //Recogemos los datos de los inputs con formData

    let form = event.target;
    let formData = new FormData(form);

    // LLamamos al validador
    // pasamos el formData a la funcion validateArtist y guardamos la lista de erores

    let errors = artistValidator.validateArtist(formData);

    // limpiamos los mensajes de errores antiguos

    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    if (errors.length > 0){
        // si hay errores los mostramos por pantalla
        for (let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    }

    else{
        // Si no hay errores, añadimos a la BD
        try{

            //el usuario al que se le asocia el artista creado, es el mismo usuario que esta logueado
            // asi que tenemos que extraer el usuario logueado

            let userLogueado = sessionManager.getLoggedUser();
            formData.append("userId", userLogueado.userId);
            
            //Ahora llamamos a la API pasandole el formulario

            await artistsAPI_auto.create(formData);

            //Si ha habido exito enviamos al usuario a la vista de artistas (esto se podria eliminar o comentar)

            window.location.href = "artists.html";
        }
        catch (err) {
            // si la BD nos da algun error lo mostramos
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }


}

document.addEventListener("DOMContentLoaded", main);