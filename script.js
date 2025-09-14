window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const items = document.querySelectorAll('#itemList li');
  const detalle = document.getElementById('detalle');

  let activeIndex = null;
  let currentBg = null;

  function updateActiveItem() {
    let closest = null;
    let minDistance = Infinity;

    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });

    if (closest !== activeIndex) {
      if (activeIndex !== null) {
        items[activeIndex].classList.remove('activo');
      }

      activeIndex = closest;
      items[activeIndex].classList.add('activo');

      const bg = items[activeIndex].getAttribute('data-bg');
      if (bg !== currentBg) {
        document.body.style.backgroundImage = `url(${bg})`;
        currentBg = bg;
      }

      detalle.style.opacity = 0;
    }
  }

  container.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveItem);
    detalle.style.opacity = 0;
  });

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (index === activeIndex) {
        const rect = item.getBoundingClientRect();
        const detalleText = item.getAttribute('data-detalle').replace(/\\n/g, '\n');
        detalle.textContent = detalleText;
        detalle.style.top = `${rect.bottom + 3}px`;
        detalle.style.opacity = 1;
      }
    });
  });

  updateActiveItem();
});

window.addEventListener('load', () => {
  const imagenes = Array.from(document.querySelectorAll('li')).map(item =>
    item.getAttribute('data-bg')
  );

  let cargadas = 0;
  const total = imagenes.length;

  imagenes.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      cargadas++;
      if (cargadas === total) {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
        }, 600);
      }
    };
  });
});
