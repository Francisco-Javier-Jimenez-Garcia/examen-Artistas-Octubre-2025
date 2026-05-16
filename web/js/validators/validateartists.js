"use strict"

import { sessionManager } from "/js/utils/session.js";

const artistValidator = {
    validateArtist: function(formData){
        let errors = [];

        //Traemos los valores que tenemos que validar del formData: name, numAlbums

        let name = formData.get("name");
        let numAlbums = formData.get("numAlbums");

        // Regla 1: validar que el usuario esta logueado

        if (!sessionManager.isLogged()){
            errors.push("Debes loguearte para crear un artista.");
        }

        // Regla 2: longitud de name>=3 y multiplo de 5

        if (name.length < 3 || name.length % 5 !== 0){
            errors.push("El nombre debe tener mínimo 3 caracteres y ser multiplo de 5.");
        }

        if (numAlbums <= 0 || numAlbums >= 20){
            errors.push("El numero de albumes debe ser entre 0 y 20.");
        }

        return errors;

    }
};

export {artistValidator};
