"use strict"

import {parseHTML} from "/js/utils/parseHTML.js";

import { galleryRenderer  } from "./gallery.js";

const artistsRenderer = {
    asCard: function(artist){
        //usamos las comillas invertidas `` para mezclar html con JS

        let html = /*html*/ ` 
            <div class="border border-dark rounded p-3 bg-white">  <!-- En la imagen se ve un recuadro con borde, entonces ponemos card -->
                <div class="row align-items-center"> <!-- Son filas, pues ponemos row -->

                    <div class="col-md-4">
                        <img src="${artist.imageUrl}" class="img-fluid rounded-start" alt="Imagen de ${artist.name}">
                    </div>  <!-- La foto tiene menos anchura, asi que le ponemos tamaño de 4 columnas solo -->
                    <div class="col-md-8">
                        <h5 class="card-title">${artist.name}</h5>
                        <p class="card-text">${artist.bio}</p>
                        <p class="card-text mt-4">
                            <img src="${artist.avatarUrl}" class="rounded-circle" style="width: 30px; height: 30px; object-fit: cover;">
                        </p>
                        <small class="text-dark ms-2">@${artist.username} - Edad: ${artist.age} años</small>


                    </div> <!-- Aqui le asignamos 8 columnas -->

                </div>
            </div>
            `
            return parseHTML(html);
    }
};

export {artistsRenderer};