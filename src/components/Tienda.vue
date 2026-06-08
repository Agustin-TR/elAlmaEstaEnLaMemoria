<template>
  <!-- PRE-COMPRA -->
  <section class="pantalla" id="info">
    <div class="libros m-5">

      <div class="version">
        <h3>Versión impresa</h3>

        <!-- Foto con botón 3D superpuesto -->
        <div class="foto-libro">
          <img src="/img/portada.webp" alt="libro" />

          <!-- Botón overlay -->
          <button class="btn-3d" @click="open3D" title="Ver modelo 3D">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8
                a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Ver en 3D
          </button>
        </div>

        <p>
          Poemario. 40 poemas / 40 fotos. <br>
          Cada imagen fue elegida con precisión para complementar a un poema. <br>
          La experiencia invita a descubrir un misterio: ¿por qué cada foto acompaña a ese poema? La respuesta no está dada, se revela en la lectura y en la interpretación personal. <br> 
          Edición en papel 90g, con cubierta ilustrada.
          Envío gratis dentro de CABA.
        </p>

        <button class="btn-compra" @click="comprar">
          Quiero el mío
        </button>
      </div>

    </div>
  </section>

  <!-- ── MODAL 3D ─────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show3D" class="modal-overlay" @click.self="close3D">
        <div class="modal-3d">

          <!-- Header -->
          <div class="modal-header">
            <span class="modal-title">El alma está en la memoria — Modelo 3D</span>
            <button class="modal-close" @click="close3D" aria-label="Cerrar">✕</button>
          </div>

          <!-- Hint -->
          <p class="modal-hint">Arrastrá para rotar · Scroll para zoom · Click derecho para desplazar</p>

          <!-- Viewer -->
          <div class="modal-canvas-wrap">
            <BookViewer
              v-if="show3D"
              model-path="/elalmaestaenlamemoria/assets/libro3d.glb"
              :auto-rotate="false"
            />
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>

  <!-- IG -->
<div class="ig-link">
  <a href="https://instagram.com/agustinrojas_7" target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37a4 4 0 1 1-2.63-2.63 4 4 0 0 1 2.63 2.63z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
    <span>@agustinrojas_7</span>
  </a>
  
</div>

  <!-- CONTRATAPA -->
  <section class="pantalla section-contratapa" id="contratapa">
    <h3 class="info-titulo">Contratapa</h3>
    <div>
      <p>
        <br><strong>— ¿Cuántos sueños caben en 21 gramos? ¿Cuánto dolor, cuánto amor?<br>
        — Todo el que nos permitamos sentir.</strong><br><br>
        Hay quienes creen que, en el instante posterior a la muerte, pesamos 21 gramos menos: es el peso del alma que abandona nuestro cuerpo.<br><br>
        Pero ¿dónde reside esa esencia mientras habitamos el mundo?<br><br>
        <strong><em>El alma está en la memoria</em></strong> propone un recorrido sensible por aquello que nos constituye y nos deja huella.<br><br>
        Inspirado en la revelación íntima del autor ante el avance del Alzheimer en su abuela Haydeé, este poemario comprende que la memoria no solo conserva lo vivido, sino que también resguarda la esencia misma de nuestra identidad. Al deshilacharse el recuerdo, el alma no se pierde: simplemente se olvida el sendero para acceder a ella. Así, la obra traza una <strong>geografía emocional</strong> donde el amor, la ausencia y la fragilidad humana se entrelazan con una sensibilidad contemporánea.
        Lejos de ofrecer respuestas, estas páginas invitan a contemplar la subjetividad del otro para descubrir con asombro que, incluso en nuestra individualidad más profunda, existe una experiencia colectiva que nos une: <strong>vivir el arte.</strong>
      </p>
    </div>
  </section>

  <!-- COMENTARIOS -->
  <section class="pantalla section-comentarios" id="comentarios">
    <h2 class="info-titulo">Lo que dicen los lectores</h2>

    <div class="center-button-container m-5">
      <button class="btn-compra btn-comentar" @click="toggleForm">
        {{ showForm ? 'Ocultar Formulario' : 'Dejá tu comentario' }}
      </button>
    </div>

    <div v-if="showForm" class="contact-form-container mb-5">
      <form class="contact-form" @submit.prevent="submitForm">
        <h4 class="form-title">Sé parte del poemario</h4>
        <h6 class="form-title2">Contanos qué sentiste</h6>

        <div class="form-group">
          <label for="name">Nombre</label>
          <input id="name" type="text" v-model="formName" required />
        </div>

        <div class="form-group">
          <label for="email">Email (Opcional, para respuesta)</label>
          <input id="email" type="email" v-model="formEmail" placeholder="ejemplo@correo.com" />
        </div>

        <div class="form-group">
          <label for="comment">Comentario</label>
          <textarea id="comment" rows="5" v-model="formComment" required />
        </div>

        <button type="submit" class="btn-submit">Enviar Mensaje</button>

        <p v-if="submissionMessage" class="submission-message">
          {{ submissionMessage }}
        </p>
      </form>
    </div>

    <div class="comentarios-grid mb-10">
      <div v-for="comentario in comentarios" :key="comentario.id" class="comentario-card">
        <div class="comentario-header">
          <svg class="quote-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M448 318.5c0 53.6-43.1 97.4-96.2 97.5
              -52.9.2-95.8-43.5-95.9-97.4
              -.1-53.5 43.1-97.5 96.2-97.5
              52.9-.1 95.8 43.6 95.9 97.4z
              M192 318.5c0 53.6-43.1 97.4
              -96.2 97.5-52.9.2-95.8-43.5
              -95.9-97.4-.1-53.5 43.1-97.5
              96.2-97.5 52.9-.1 95.8 43.6
              95.9 97.4z" />
          </svg>
          <p class="nombre-usuario">— {{ comentario.nombreUsuario }}</p>
        </div>
        <p class="comentario-texto">{{ comentario.comentario }}</p>
      </div>
    </div>

    <button class="btn-compra mt-4 mb-5" @click="comprar">
      Quiero el mío
    </button>
  </section>
</template>

<script>
import { dataComentarios } from '@/data/comentarios.js'
import BookViewer from '@/components/BookViewer.vue'

export default {
  name: 'Tienda',
  inject: ['openPaymentModal'],
  components: { BookViewer },

  data() {
    return {
      comentarios: dataComentarios,
      show3D: false,

      showForm: false,
      formName: '',
      formEmail: '',
      formComment: '',
      submissionMessage: null,
    }
  },

  methods: {
    open3D() {
      this.show3D = true
      // Bloquear scroll del body mientras el modal está abierto
      document.body.style.overflow = 'hidden'
    },

    close3D() {
      this.show3D = false
      document.body.style.overflow = ''
    },

    toggleForm() {
      this.showForm = !this.showForm
    },

    comprar() {
      this.openPaymentModal('printed')
    },

    async submitForm() {
      const formData = new FormData()
      formData.append('name', this.formName)
      formData.append('email', this.formEmail)
      formData.append('message', this.formComment)

      try {
        const res = await fetch('https://formspree.io/f/xgvrvrrr', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        })
        if (!res.ok) throw new Error('Error de envío')

        this.submissionMessage = '¡Gracias por tu mensaje! Hemos recibido tu información.'
        this.formName = ''
        this.formEmail = ''
        this.formComment = ''

        setTimeout(() => {
          this.submissionMessage = null
          this.showForm = false
        }, 4000)
      } catch {
        this.submissionMessage = 'Hubo un error al enviar el formulario. Intentá nuevamente.'
      }
    },
  },
}
</script>

<style scoped>
/* ========= TIENDA ========= */
.info-titulo {
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  font-family: 'Georgia', serif;
  font-weight: 300;
  letter-spacing: 1px;
}

.libros {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 4rem;
  justify-content: center;
}

/* ── Foto + overlay 3D ── */
.foto-libro {
  position: relative;        /* necesario para el botón absoluto */
  width: 290px;
  height: 385px;
  margin: 1rem auto;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.foto-libro img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: filter 0.3s ease;
}

/* Oscurecer levemente la foto cuando hover sobre el botón */
.foto-libro:has(.btn-3d:hover) img {
  filter: brightness(0.85);
}

.btn-3d {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 5px 11px;
  font-size: 0.75rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  letter-spacing: 0.3px;
}

.btn-3d:hover {
  background: rgba(0, 95, 106, 0.85);
  transform: scale(1.05);
}

/* ── Resto de .version ── */
.version {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 4px;
  max-width: 350px;
  color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 7vh;
}

.version h3 { font-size: 1.5rem; margin-bottom: 1rem; }
.version p  { font-size: 1rem; line-height: 1.6; margin-bottom: 1.5rem; }

.btn-compra {
  background-color: #005f6a;
  color: #fff;
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-compra:hover {
  transform: scale(1.1);
  background-color: #003f48;
}

/* ═══════════════════════════════════
   MODAL 3D
═══════════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-3d {
  background: #0e1215;
  border-radius: 12px;
  width: min(860px, 92vw);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title {
  color: #c8c0b0;
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.modal-close {
  background: none;
  border: none;
  color: #888;
  font-size: 1.1rem;
  cursor: pointer;
  line-height: 1;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}
.modal-close:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.modal-hint {
  text-align: center;
  color: #555;
  font-size: 0.72rem;
  letter-spacing: 0.3px;
  padding: 0.4rem 0 0;
  margin: 0;
}

.modal-canvas-wrap {
  flex: 1;
  min-height: 420px;
  height: 65vh;
}

/* ── Transición del modal ── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-active .modal-3d,
.modal-leave-active .modal-3d {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-3d,
.modal-leave-to .modal-3d {
  transform: scale(0.96);
  opacity: 0;
}

/* ═══════════════════════════════════
   INSTAGRAM
═══════════════════════════════════ */
.ig-link {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.ig-link a {
  color: #005f6a;
  transition: transform 0.2s ease, opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
}

.ig-link a:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.ig-link span {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

/* ═══════════════════════════════════
   CONTRATAPA
═══════════════════════════════════ */
.section-contratapa {
  background-color: #f8f8f8;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section-contratapa div {
  width: 100%;
  max-width: 800px;
  margin: 0 auto !important;
}
.section-contratapa p {
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  font-family: 'Georgia', serif;
}

/* ═══════════════════════════════════
   COMENTARIOS Y FORMULARIO
═══════════════════════════════════ */
.section-comentarios {
  background-color: #f8f8f8;
  min-height: 80vh;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.center-button-container {
  width: 100%;
  text-align: center;
  margin-top: -2rem;
}

.btn-comentar {
  color: #fff;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  background-color: #005f6a;
  box-shadow: 0 4px 10px rgba(0, 95, 106, 0.4);
}
.btn-comentar:hover { background-color: #003f48; }

.contact-form-container {
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #005f6a;
}
.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.form-title  { font-size: 1.8rem; color: #005f6a; text-align: center; }
.form-title2 { font-size: 1.5rem; color: #005f6a; text-align: center; }

.form-group { display: flex; flex-direction: column; }
.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.95rem;
}
.form-group input,
.form-group textarea {
  padding: 0.8rem 1rem;
  border: 1px solid #21252996;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #005f6a;
  box-shadow: 0 0 0 3px rgba(0, 95, 106, 0.2);
  outline: none;
}
.form-group textarea { resize: vertical; }

.btn-submit {
  background-color: #005f6a;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submission-message {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 6px;
  background-color: #e6ffe6;
  color: #005f6a;
  font-weight: bold;
  text-align: center;
  border: 1px solid #005f6a;
}

.comentarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
}
@media (min-width: 1200px) {
  .comentarios-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1400px;
  }
}

.comentario-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 5px solid #005f6a;
  display: flex;
  flex-direction: column;
}
.comentario-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.comentario-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.quote-icon { width: 20px; height: 20px; fill: #005f6a; margin-right: 10px; }
.nombre-usuario { font-size: 1rem; font-weight: bold; color: #005f6a; margin: 0; letter-spacing: 0.5px; }
.comentario-texto { font-size: 1.1rem; line-height: 1.6; color: #555; font-style: italic; margin-top: 0; }
</style>