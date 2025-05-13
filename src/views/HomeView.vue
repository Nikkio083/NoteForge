
<script setup>
import NavbarHome from "../components/NavBarHome.vue";
import { useshareinput } from "@/stores/shareInput.js";
import foo from "../components/footer.vue";
import { RouterLink } from "vue-router";
import {useAuthStore} from "@/stores/authStore.ts";
import { useFileStore } from '@/stores/fileStore.js'

import { ref } from "vue";
const inputcondiviso = useshareinput(); // accediamo allo store
const authStore = useAuthStore();
const fileStore = useFileStore();


const NumRisorse = ref(0);
const NumGruppi = ref(0);
// const NumUtenti = authStore.NumUsers;


</script>

<template>
  <div class="home">
    <div class="navbar"><NavbarHome /></div>
    <div>
      <img src="../assets/imgs/quaderno.png" alt="quaderno" class="quaderno" />
      <img src="../assets/imgs/ruler.png" alt="ruler" class="ruler" />
    </div>
    <h1 id="tit">Dove gli Appunti vengono Forgiati</h1>
    <!-- inizio barra di ricerca -->
    <div class="searchbar">
      <div class="searchbar-wrapper">
        <div class="searchbar-left">
          <div class="search-icon-wrapper">
            <span class="search-icon searchbar-icon">
              <router-link to="/ris" class="router-link">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    @click="inputcondiviso.testo.value = inputcondiviso.testo.value.toLowerCase()"
                    id="search"
                >
                  <path
                      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  ></path>
                </svg>
              </router-link>
            </span>
          </div>
        </div>

        <div class="searchbar-center">
          <div class="searchbar-input-spacer"></div>

          <input
              v-model="inputcondiviso.testo"
              type="text"
              class="searchbar-input"
              maxlength="2048"
              name="q"
              autocapitalize="off"
              autocomplete="off"
              title="Search"
              role="combobox"
              placeholder="Cerca appunti"
          />
        </div>

        <div class="searchbar-right">
          <svg
              class="voice-search"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              @click="inputcondiviso.startVoiceRecognition"
          >
            <path
                fill="#4285f4"
                d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
            ></path>
            <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
            <path
                fill="#fbbc05"
                d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
            ></path>
            <path
                fill="#ea4335"
                d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <!-- fine barra di ricerca -->
    <div>
      <img src="../assets/imgs/libro.png" alt="libro" class="libro" />
      <img src="../assets/imgs/astuccio.png" alt="astuccio" class="astuccio" />
    </div>
  </div>
  <div class="descrizione">
    <h2 class="titolo2">Cosa è Note<span>Forge</span></h2>
    <p id="paragrafo_descrizione">
      NoteForge è la piattaforma per cercare, scaricare, caricare e condividere
      appunti. Grazie a filtri avanzati per scuola e indirizzo e a un sistema di
      valutazione (visualizzazioni, like, dislike e commenti), trovi sempre il
      materiale più utile. Inoltre, puoi creare gruppi di studio per collaborare
      con altri studenti.
    </p>
    <div class="nums">
      <div class="num">
        <h3>
          Risorse<span
        ><img
            src="../assets/imgs/icon_risorse.png"
            alt="icon_risorse"
            class="icon"
        /></span>
        </h3>
        <h2>{{ fileStore.NumFiles }}</h2>
      </div>
      <div class="num">
        <h3>
          Gruppi
          <span
          ><img
              src="../assets/imgs/icon_gruppi.png"
              alt="gruppi"
              class="icon"
          /></span>
        </h3>
        <h2>{{ NumGruppi }}</h2>
      </div>
      <div class="num">
        <h3>
          Utenti<span
        ><img
            src="../assets/imgs/icon_utenti.png"
            alt="utenti"
            class="icon"
        /></span>
        </h3>
        <h2>{{ authStore.NumUsers }}</h2>
      </div>
    </div>
    <img src="../assets/imgs/libri.png" alt="libri" class="libri" />
  </div>

  <div class="ilmeglio">
    <h2>Solo il meglio per chi dà il meglio</h2>
    <h3>
      Trova i migliori materiali didattici per eccellere nel tuo percorso di
      studi.
    </h3>
    <img
        src="../assets/imgs/like_dislike.png"
        alt="like_dislike"
        class="like_dislike"
    />
  </div>

  <div class="gruppi">
    <h2 class="tit_gruppi">Unisciti o crea <span>un gruppo studio.</span></h2>
    <p>
      Condividi la nostra passione, la nostra determinazione e la nostra
      visione? Allora saremo lieti di incontrarti!
    </p>
    <div class="buttons">
      <input type="button" value="Crea" class="but" id="b1" />
      <input type="button" value="Unisciti" class="but" id="b2" />
    </div>
    <img
        src="../assets/imgs/icon_creagruppi.png"
        alt="crea"
        class="icon_creagruppi"
    />

  </div>
  <!-- il footer -->
  <foo class="footer"/>


</template>

<style scoped>
.router-link:hover {
  background-color: transparent;
}
.navbar {
  position: fixed;
  z-index: 100;
  background: linear-gradient(
      to right,
      #0d47a1,
      #2876cb,
      #358de0,
      #3b99eb,
      #3f9ff0,
      #40a2f2,
      #219cff
  );
}
.home {
  background: linear-gradient(
      to right,
      #0d47a1,
      #2876cb,
      #358de0,
      #3b99eb,
      #3f9ff0,
      #40a2f2,
      #219cff
  );
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 50%;
}
.quaderno {
  position: absolute;
  top: 40%;
  left: 94%;
  transform: translate(-50%, -50%);
  height: auto;
}
.ruler {
  position: absolute;
  top: 40%;
  left: 0;
  transform: translate(-5%, -50%);
  height: auto;
}
#tit {
  text-align: center;
  color: white;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  text-shadow: 2px 2px 4px #000000;
}
/*parra di ricerca*/
.searchbar {
  font-size: 14px;
  font-family: arial, sans-serif;
  color: #202124;
  display: flex;
  z-index: 3;
  background: white;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  margin: 0 auto;
  width: 500px;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.searchbar:hover {
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  border-color: rgba(223, 225, 229, 0);
}

.searchbar-wrapper {
  flex: 1;
  display: flex;
  padding: 5px 8px 0 14px;
}

.searchbar-left {
  font-size: 14px;
  font-family: arial, sans-serif;
  color: #202124;
  display: flex;
  align-items: center;
  padding-right: 13px;
  margin-top: -5px;
}

.search-icon-wrapper {
  margin: auto;
}

.search-icon {
  margin-top: 3px;
  color: #9aa0a6;
  height: 20px;
  line-height: 20px;
  width: 20px;
}

.searchbar-icon {
  display: inline-block;
  fill: currentColor;
  height: 24px;
  line-height: 24px;
  position: relative;
  width: 24px;
}

.searchbar-center {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}

.searchbar-input-spacer {
  color: transparent;
  flex: 100%;
  white-space: pre;
  height: 34px;
  font-size: 16px;
}

.searchbar-input {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.87);
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 100%;
  margin-top: -37px;
  height: 34px;
  font-size: 16px;
  max-width: 100%;
  width: 100%;
}

.searchbar-right {
  display: flex;
  flex: 0 0 auto;
  margin-top: -5px;
  align-items: stretch;
  flex-direction: row;
}

.searchbar-clear-icon {
  margin-right: 12px;
}

.voice-search {
  flex: 1 0 auto;
  display: flex;
  cursor: pointer;
  align-items: center;
  border: 0;
  background: transparent;
  outline: none;
  padding: 0 8px;
  width: 2.8em;
}

#search {
  cursor: pointer;
  margin-top: -5px;
  margin-left: 5px;
}

.searchbar-icon:active {
  color: #00c0ce;
  /*fai una animazione per sinitire il click*/
  transform: scale(0.9);
  transition: transform 0.5s ease;
  transition: color 0.5s ease;
  transition: all 0.5s ease;
}
.searchbar-icon:hover {
  color: #00c0ce;
}

/*fine parra di ricerca*/
.libro {
  position: absolute;
  top: 75%;
  left: 0;
  transform: translate(-0%, -50%);
  height: auto;
}
.astuccio {
  position: absolute;
  top: 80%;
  left: 91%;
  transform: translate(-50%, -50%);
  height: auto;
}
/*descrizione*/
.descrizione {
  background-color: #dbe6f0;
  position: absolute;
  top: 50%;
  left: 0;
  height: 50%;
}
.titolo2 {
  margin: 20;
  margin-left: 3%;
  color: #ff6a00;
}
.titolo2 span {
  color: #3186da;
}
#paragrafo_descrizione {
  margin: 20;
  margin-left: 3%;
  color: #202124;
  width: 50%;
  font-size: 20px;
}

.nums {
  background-color: #c4e0ef;
  width: 50%;
  border-radius: 100px;
  display: flex;
  top: 50%;
  left: 20%;
  transform: translate(5%, -50%);
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  margin-top: 5%;
  text-align: center;
}

.nums .num {
  margin-top: 2%;
}
.num h3 {
  color: #ff6a00;
  text-align: center;
}
.num h2 {
  color: #3186da;
  text-align: center;
  position: relative;
  left: -20px;
  transform: translate(20%, -50%);
}
.libri {
  position: absolute;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
  height: auto;
}
.icon {
  width: 20px;
  margin-left: 5px;
  position: relative;
  top: 5px;
}
.ilmeglio {
  position: absolute;
  top: 100%;
  left: 22%;
  transform: translate(-50%, -0%);
}
.like_dislike {
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(50%, -100%);
}
.gruppi {
  position: absolute;
  top: 150%;
  left: 0;
  transform: translate(0%, -60%);
  background-color: #dbe6f0;
  width: 100%;
  height: 50%;
}
.tit_gruppi {
  color: #ff6a00;
  margin: 20;
  margin-left: 3%;
}
.tit_gruppi span {
  color: #3186da;
}
.gruppi p {
  width: 50%;
  font-size: 20px;
  margin: 20;
  margin-left: 3%;
}
.buttons {
  display: flex;
  position: absolute;
  top: 60%;
  left: 30%;
  transform: translate(-50%, -50%);
}
.but {
  width: 300px;
  height: 80px;
  border-radius: 50px;
  margin: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #fff;
}
.but:hover {
  background-color: #c4e0ef;
}
.icon_creagruppi {
  position: absolute;
  width: 20%;
  top: 50%;
  left: 85%;
  transform: translate(-50%, -50%);
}
.footer{
  position: absolute;
  top: 180%;
  left: 0;
  width: 100%;
  transform: translate(0%, -25%);
}
</style>
