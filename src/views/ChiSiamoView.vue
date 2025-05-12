<script setup lang="ts">
import NavbarHome from "../components/NavBarHome.vue";
import foo from "../components/footer.vue";
import amicone from "@/assets/imgs/profiloamicone.jpeg";
import amr from "@/assets/imgs/Amr.png";
import nour from "@/assets/imgs/Nour.png";
import musta from "@/assets/imgs/Musta.jpeg";

const creators = [
  {
    name: "Nicola",
    surname: "Amicone",
    potere: "Fullstack Developer",
    img: amicone,
    link: "https://github.com/Nikkio083",
  },
  {
    name: "Amro",
    surname: "Awadein",
    potere: "Fullstack Developer",
    img: amr,
    link: "https://github.com/Amro-ALMasry",
  },
  {
    name: "Nour",
    surname: "Ben Salem",
    potere: "Fullstack Developer",
    img: nour,
    link: "https://github.com/nour9407",
  },
  {
    name: "Mustafa",
    surname: "Abdellatif",
    potere: "Fullstack Developer",
    img: musta,
    link: "https://github.com/moustafa21812",
  },
];
</script>

<template>
  <div class="mypage">
    <div class="navbar">
      <NavbarHome />
    </div>

    <!-- Intro Section -->
    <section class="intro-section">
      <h1>Chi <span>Siamo</span></h1>
      <p>
        Siamo un team di studenti e appassionati della conoscenza. <br />
        Abbiamo creato <strong>NoteForge</strong> per permettere a chi studia di
        <span class="highlight">cercare</span>,
        <span class="highlight">caricare</span> e
        <span class="highlight">condividere</span> appunti in modo semplice e veloce.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="mission-content">
        <h2>La nostra missione</h2>
        <p>
          Crediamo che l'accesso allo studio debba essere <strong>semplice</strong>,
          <strong>collaborativo</strong> e <strong>gratuito</strong>. Con NoteForge vogliamo costruire
          una piattaforma dove ogni studente può trovare e condividere appunti con pochi click.
        </p>
        <p>
          Il nostro obiettivo è creare una community dove lo studio diventa più leggero, e dove
          aiutarsi a vicenda è la chiave del successo scolastico.
        </p>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <h2>Il Team di NoteForge</h2>
      <div class="team-grid">
        <div v-for="(person, i) in creators" :key="i" class="card" :class="`delay-${i}`">
          <img
              :src="person.img"
              :alt="`${person.name} ${person.surname} ${person.potere}`"
          />
          <h3>
            {{ person.name }} {{ person.surname }}<br />
            <small>{{ person.potere }}</small>
          </h3>
          <a :href="person.link" target="_blank">Scopri di più</a>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <foo/>

  </div>
</template>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  padding-top: 9px;
  padding-bottom: 7px;
  background: linear-gradient(to right, #0f172a, #1e293b);
}

.mypage {
  margin: -10px;
}

/* INTRO Section */
.intro-section {
  background: linear-gradient(to bottom right, #0f172a, #1e293b);
  color: #f1f5f9;
  padding: 4rem 1rem;
  text-align: center;
}

.intro-section h1 {
  font-size: 3rem;
  color: #38bdf8;
  margin-bottom: 1rem;
}

.intro-section h1 span {
  color: #facc15;
}

.intro-section p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

.highlight {
  color: #facc15;
  font-weight: bold;
}

/* MISSION Section */
.mission-section {
  background: #e0f2fe;
  padding: 4rem 1rem;
  text-align: center;
}

.mission-content {
  max-width: 800px;
  margin: 0 auto;
  color: #0f172a;
}

.mission-section h2 {
  font-size: 2.5rem;
  color: #0284c7;
  margin-bottom: 1.5rem;
}

.mission-section p {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* TEAM Section */
.team-section {
  background: #f3f4f6;
  padding: 4rem 1rem;
}

.team-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1d4ed8;
  margin-bottom: 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
}

.delay-0 { animation-delay: 0.2s; }
.delay-1 { animation-delay: 0.4s; }
.delay-2 { animation-delay: 0.6s; }
.delay-3 { animation-delay: 0.8s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1d4ed8;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
}

.card:hover img {
  border-color: #f59e0b;
}

.card h3 {
  margin: 0.5rem 0;
  color: #111827;
  font-size: 1.3rem;
}

.card h3 small {
  font-size: 0.9rem;
  color: #6b7280;
}

.card a {
  color: #7c3aed;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.card a:hover {
  background: rgba(124, 58, 237, 0.1);
  text-decoration: underline;
}

/* Responsive tweak */
@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>