document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       FECHAS DE EXÁMENES
       ========================================================= */

    const dateElements = document.querySelectorAll(".exam-date");

    dateElements.forEach(el => {

        const dateString = el.getAttribute("data-date");

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
                day: "numeric",
                month: "long",
                year: "numeric"
            };

            const formattedDate =
                targetDate.toLocaleDateString("es-ES", options);

            el.innerHTML =
                `📅 ${formattedDate} <br> ⏳ Faltan <strong>${diffDays}</strong> días`;
        }

    });


    /* =========================================================
       VISOR DE IMÁGENES
       ========================================================= */

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    /*
       Si esta página no tiene visor, no hacemos nada.
       Esto permite que el mismo script.js funcione
       también en index.html y otras páginas.
    */

    if (!lightbox || !lightboxImage) {
        return;
    }


    /* ---------------------------------------------------------
       ABRIR IMAGEN
       --------------------------------------------------------- */

    const studyImages = document.querySelectorAll(".study-image");

    studyImages.forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || "Imagen ampliada";

            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add("lightbox-open");

        });

    });


    /* ---------------------------------------------------------
       CERRAR IMAGEN
       --------------------------------------------------------- */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

    }


    /* Cerrar con botón X */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    /* Cerrar haciendo clic en el fondo */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /* Cerrar haciendo clic en la imagen ampliada */

    lightboxImage.addEventListener(
        "click",
        closeLightbox
    );


    /* Cerrar con ESC */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {
            closeLightbox();
        }

    });

});
