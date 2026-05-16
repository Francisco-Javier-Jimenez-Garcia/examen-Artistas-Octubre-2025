"use strict"

// Importamos la API para enviar los datos del formulario a la BD

import { artistsAPI_auto } from "/js/api/_artists.js";

// Importamos el validador del formulario

import { artistValidator } from "/js/validators/validateartists.js";

// Importamos el renderizador de mensajes para renderizar los mensajes de error 

import { messageRenderer } from "/js/renderers/messages.js";

// Importamos el gestor de sesion para conseguir el usuario logueado

import { sessionManager } from "/js/utils/session.js";




// Para editar en el formulario y que aparezcan los datos de ese artistId, leemos la URL:

const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get("artistId"); // valdrá 1 si hay un artistId en la URL o null si no lo hay



async function main() {
    //Buscamos el formulario por su ID en create_artists.html

    let registerForm = document.getElementById("artist-form");

    // del ejercicio 3: si ha ID en la URL cargamos los datos

    if (artistId !== null){
        loadartist();
    }

    // cuando se envie (onsubmit) ejecuta la funcion handleSubmit

    registerForm.onsubmit = handleSubmit;

}

async function loadartist(){  // Funcion para editar datos y que los cargue segun el artistId
    
    try{
        let artist = await artistsAPI_auto.getById(artistId);

        // Buscamos los inputs reales

        let inputName = document.getElementById("name-input");
        let inputBio = document.getElementById("bio-input");
        let inputStartDate = document.getElementById("startDate-input");
        let inputImageUrl = document.getElementById("imageUrl-input");
        let inputNumAlbums = document.getElementById("numAlbums-input");
        
        // Rellenamos con los datos del artista
        inputName.value = artist.name;
        inputBio.value = artist.bio;
        inputStartDate.value = artist.startDate;
        inputImageUrl.value  = artist.imageUrl;
        inputNumAlbums.value = artist.numAlbums;

        // cambiamos el texto del boton Submit de "Create" a "Update"
        let btn = document.getElementById("btn");
        btn.innerHTML = "Update Artist";
    }
    catch{
        messageRenderer.showErrorMessage("Error al cargar el artista");

    }
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

            // aqui se decide si crear o actualizar

            if (artistId !== null){
                await artistsAPI_auto.update(formData, artistId);  //Si en la URL hay un artistId actualizamos
            }
            else{
                //Ahora llamamos a la API pasandole el formulario
                await artistsAPI_auto.create(formData);   //Aqui simplemente creamos el nuevo artista si la condicion de antes no se cumplia
            }
            

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