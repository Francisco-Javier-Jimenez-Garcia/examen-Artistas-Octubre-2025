"use strict";

// Este archivo casi siempre es igual en todas las practicas. Casi que mejor copiar y pegar de otro proyecto, pero tener 
// cuidado con los parametros que si cambian

import { parseHTML } from "/js/utils/parseHTML.js";
import {artistsRenderer } from "/js/renderers/artists.js";

const galleryRenderer = {
    asGallery: function(artists) {
        let galleryContainer = parseHTML('<div class="gallery-container"></div>');
        for (let artist of artists){
            let card = artistsRenderer.asCard(artist);
            galleryContainer.appendChild(card);
        }
        return galleryContainer;

    }
};

export {galleryRenderer};


