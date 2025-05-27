document.querySelectorAll('.container a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Fecha todos os formulários
    document.querySelectorAll('.container form').forEach(f => {
      f.classList.add('hidden');
      f.classList.remove('visible');
    });

    // Alterna o formulário clicado
    const form = this.querySelector('form');
    if (form) {
      form.classList.toggle('hidden');
      form.classList.toggle('visible');
    }
  });
});
