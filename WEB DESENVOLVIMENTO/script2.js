// Ativando comportamento de accordion
document.querySelectorAll(".accordion-header").forEach(button => {
    button.addEventListener("click", () => {
        const accordion = button.parentElement;
        accordion.classList.toggle("active");
    });
});


