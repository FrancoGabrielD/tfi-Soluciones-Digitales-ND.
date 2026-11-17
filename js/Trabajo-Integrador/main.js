document.addEventListener('DOMContentLoaded', () => {
  // 1. Menú hamburguesa responsivo
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 2. Filtro de proyectos en trabajos.html
  const filterBtns = document.querySelectorAll('.filtro-btn');
  const projectCards = document.querySelectorAll('.proyecto-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (category === 'todos' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Validación y envío simulado en contacto.html
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      formFeedback.textContent = `¡Gracias ${nombre}! Tu mensaje fue recibido. Te responderemos en menos de 24 hs.`;
      formFeedback.style.color = '#38bdf8';
      formFeedback.style.marginTop = '1rem';
      contactForm.reset();
    });
  }

  // 4. Calculadora interactiva de presupuestos (presupuesto.html)
  const tipoProyecto = document.getElementById('tipo-proyecto');
  const extrasCheck = document.querySelectorAll('.extra-check');
  const urgenciaSelect = document.getElementById('urgencia');
  const precioTotalEl = document.getElementById('precio-total');
  const detallePlazoEl = document.getElementById('detalle-plazo');

  function calcularPresupuesto() {
    if (!tipoProyecto || !precioTotalEl) return;

    let total = parseFloat(tipoProyecto.value);

    extrasCheck.forEach(check => {
      if (check.checked) {
        total += parseFloat(check.value);
      }
    });

    const multiplicador = parseFloat(urgenciaSelect.value);
    total = Math.round(total * multiplicador);

    precioTotalEl.textContent = `$${total.toLocaleString('es-AR')} USD`;
    detallePlazoEl.textContent = multiplicador > 1 
      ? 'Tiempo estimado: 2 a 3 semanas (Entrega Prioritaria)' 
      : 'Tiempo estimado: 4 a 6 semanas (Entrega Estándar)';
  }

  if (tipoProyecto) {
    tipoProyecto.addEventListener('change', calcularPresupuesto);
    urgenciaSelect.addEventListener('change', calcularPresupuesto);
    extrasCheck.forEach(check => check.addEventListener('change', calcularPresupuesto));
  }
});
