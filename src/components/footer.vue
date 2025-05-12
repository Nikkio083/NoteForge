<script setup>
</script>
<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-col">
        <h3>NoteForge</h3>
        <p>Condividere la conoscenza è la nostra missione.</p>
      </div>
      <div class="footer-col">
        <h4>Contattaci</h4>
        <p>
          <strong>Email:</strong>
          <a href="mailto:note.forge@email.com">note.forge@email.com</a>
        </p>
        <p>
          <strong>Instagram:</strong>
          <a href="https://instagram.com" target="_blank">@noteforge</a>
        </p>
      </div>
      <div class="footer-col">
        <h4>Seguici</h4>
        <p>Resta aggiornato sulle novità del progetto.</p>
      </div>
    </div>
    <div class="footer-bottom">
      © 2025 NoteForge - Tutti i diritti riservati
    </div>
  </footer>
</template>

<style scoped>
/* Footer Section */
.footer {
  background: #0f172a;
  color: #f1f5f9;
  padding: 3rem 1rem 1rem 1rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.footer-col h3,
.footer-col h4 {
  color: #38bdf8;
  margin-bottom: 1rem;
}

.footer-col p,
.footer-col a {
  color: #e2e8f0;
  font-size: 0.95rem;
  text-decoration: none;
}

.footer-col a:hover {
  text-decoration: underline;
  color: #facc15;
}

.footer-bottom {
  text-align: center;
  padding-top: 1rem;
  font-size: 0.85rem;
  border-top: 1px solid #334155;
  margin-top: 2rem;
  color: #94a3b8;
}
</style>
