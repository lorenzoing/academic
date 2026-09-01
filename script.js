document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       FECHAS DE EXÁMENES
       ========================================================= */

    const dateElements = document.querySelectorAll('.exam-date');

    dateElements.forEach(el => {

        const dateString = el.getAttribute('data-date');

        if (!dateString || dateString.trim() === "") {
            el.innerHTML = "⏳ Fecha pendiente";
            return;
        }

        const targetDate = new Date(dateString);

        targetDate.setHours(23, 59, 59, 999);

        const now = new Date();

        const diffTime = targetDate - now;

        if (diffTime < 0) {

            el.innerHTML =
                `📅 Realizado el: ${targetDate.toLocaleDateString()}`;

        } else {

            const diffDays =
                Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };

            const formattedDate =
                targetDate.toLocaleDateString('es-ES', options);

            el.innerHTML =
                `📅 ${formattedDate} <br> ⏳ Faltan <strong>${diffDays}</strong> días`;
        }
    });


    /* =========================================================
       VISOR DE IMÁGENES
       ========================================================= */

    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');


    /*
       Abrir imagen

       Se utiliza desde el HTML así:

       onclick="openImage(this)"
    */

    window.openImage = function(image) {

        if (!lightbox || !lightboxImage) {
            console.error("No se encontró el visor de imágenes.");
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "Imagen ampliada";

        lightbox.classList.add('active');

        lightbox.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add('lightbox-open');
    };


    /*
       Cerrar visor
    */

    function closeImage() {

        if (!lightbox || !lightboxImage) {
            return;
        }

        lightbox.classList.remove('active');

        lightbox.setAttribute(
            'aria-hidden',
            'true'
        );

        document.body.classList.remove('lightbox-open');

        lightboxImage.src = '';
    }


    /*
       Cerrar haciendo clic sobre el fondo oscuro
    */

    if (lightbox) {

        lightbox.addEventListener('click', function(event) {

            if (event.target === lightbox) {
                closeImage();
            }

        });
    }


    /*
       Botón X
    */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            'click',
            closeImage
        );

    }


    /*
       Cerrar haciendo clic sobre la imagen ampliada
    */

    if (lightboxImage) {

        lightboxImage.addEventListener(
            'click',
            closeImage
        );

    }


    /*
       Cerrar con la tecla ESC
    */

    document.addEventListener('keydown', function(event) {

        if (event.key === 'Escape') {
            closeImage();
        }

    });

});
