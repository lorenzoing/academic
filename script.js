document.addEventListener("DOMContentLoaded", () => {
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
            el.innerHTML = `📅 Realizado el: ${targetDate.toLocaleDateString()}`;
        } else {
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = targetDate.toLocaleDateString('es-ES', options);
            el.innerHTML = `📅 ${formattedDate} <br> ⏳ Faltan <strong>${diffDays}</strong> días`;
        }
    });
});
