<script setup >
import { ref } from 'vue'
import { useshareinput } from '@/stores/shareInput.js'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from "@/stores/authStore.js";
import {useFileStore} from "@/stores/fileStore.js";
import router from "@/routers/index.js";
const inputcondiviso = useshareinput() // accediamo allo store
const authStore = useAuthStore();
const fileStore = useFileStore();


</script>

<template>
  <div class="navbar">
    <ul class="navbar__links">
      <li>
        <RouterLink to="/" class="router-link">
          <span id="x1">Note</span>
          <!--azzurro-->
          <span id="x2">Forge</span>
          <!--nero-->
        </RouterLink>
      </li>
      <li>
        <div class="searchbar">
          <div class="searchbar-wrapper">
            <div class="searchbar-left">
              <div class="search-icon-wrapper">
                <span class="search-icon searchbar-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="fileStore.searchFile(inputcondiviso.testo.toLowerCase())" id="search">
                    <path
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    ></path>
                  </svg>
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
                  @input="fileStore.searchFile(inputcondiviso.testo.toLowerCase())"
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
      </li>
      <li><RouterLink to="ChiSiamo" class="a">Chi Siamo</RouterLink></li>
      <li><RouterLink to="ris" class="a">Cerca</RouterLink></li>
      <li><RouterLink to="carica" class="a">Carica</RouterLink></li>

      <li><input v-if="!(authStore.$state.user)" type="button" value="Accedi" class="button" @click="router.push('/login')" /></li>
      <li v-if="authStore.$state.user" class="profile-picture">
        <RouterLink to="/profilo">
          <img
              :src="authStore.$state.user.user_metadata.profilePic.publicUrl || 'https://via.placeholder.com/40'"
              alt="Profile"
              class="profile-img"
          />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>

.profile-picture {
  display: flex;
  position: absolute;
  /* rimane fisso in alto */
  top: 20%;
  right: 4%;}

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.1);
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: fixed;
  /* rimane fisso in alto */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 60px;
  width: 100%;
  color: #000000;
  background: linear-gradient(to right, #ffffff, #f0f0f0);
  transition: background-color 0.3s ease;
}
.navbar__links {
  list-style: none;
  display: flex;
  gap: 50px;
  align-items: center;
}

.navbar__links a {
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  font-size: 20px;
  white-space: nowrap;
}


.navbar__links .a:hover {
  background-color: #000000;
  color: #08a4ff;
  border-radius: 50px;
  transition: all 0.7s ease;
  padding: 5px 10px;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;

}

#x1 {
  color: #00bfff;
  font-size: 24px;
  font-weight: bold;
  margin-right: 0;
  margin-left: 0;
}
#x2 {
  color: #000000;
  font-size: 24px;
  font-weight: bold;
}
.router-link:hover {
  background-color: transparent;
}

/*----------------parra di ricerca------------------*/
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
/*----------------parra di ricerca fine------------------*/
/*bottone accedi*/
.button {
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  background-color: rgba(76, 239, 48, 0.99);
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  font-size: 20px;
  transition: all 0.5s ease;
  font-family: arial, sans-serif;
  position: fixed;
  /* rimane fisso in alto */
  top: 1.35%;
  right: 1%;
}

.button:hover {
  letter-spacing: 2px;
  background-color: #00bfff;
  box-shadow: rgb(9, 212, 226) 10px;
}

.button:active {
  letter-spacing: 3px;
  background-color: hsl(261deg 80% 48%);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(93 24 220) 0px 0px 0px 0px;
  transform: translateY(10px);
  transition: 100ms;
}
/*bottone accedi*/
/*lingua*/
.ui-wrapper {
  --height: 50px;
  --text-color: rgb(73, 73, 73);
  /* --border-color: rgb(185, 184, 184);
   --border-focus-color: rgb(0, 110, 255);*/
  /*--shadow-color: rgba(34, 60, 80, 0.2);
  --shadow-focus-color: rgba(0, 110, 255, 0.2); */
}





.ui-wrapper *,
.ui-wrapper *::before,
.ui-wrapper *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text-color);
}

.ui-wrapper {
  width: var(--width);
  height: var(--height);
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  /*border-radius: 10px;*/
  position: relative;
  /*border: 1px solid var(--border-color);*/
  background-color: var(--background);
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-right: 10px;
  -webkit-box-shadow: 0px 2px 5px 0px var(--shadow-color);
  box-shadow: 0px 2px 5px 0px var(--shadow-color);
  -webkit-transition: .4s;
  -o-transition: .4s;
  transition: .4s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 1.35%;

}

.ui-wrapper>input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  width: 0;
  height: 0;
  opacity: 0;
  position: absolute;
  left: 9999px;
}

.dropdown-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 9px 0 0 9px;
  background-color: var(--dropdown-button-color);
  white-space: nowrap;

}

.dropdown-container::before {
  content: "🇮🇹 Italiano";
  font-size: 20px;
  background: none !important;
}

.dropdown-container::after {
  content: "";
  background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNDk0OTQ5IiB3aWR0aD0iNzAwcHQiIGhlaWdodD0iNzAwcHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDcwMCA3MDAiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxwYXRoCiAgICAgICAgZD0ibTM4MC4zOSA0ODQuNzkgMzA3LjA0LTMwNS45OWMxNi43NjYtMTcuODEyIDE2Ljc2Ni00NS4wNTkgMC02MS44MjgtMTYuNzY2LTE2Ljc2Ni00NS4wNTktMTYuNzY2LTYxLjgyOCAwbC0yNzUuNiAyNzUuNi0yNzUuNi0yNzUuNmMtMTcuODEyLTE2Ljc2Ni00NS4wNTktMTYuNzY2LTYxLjgyOCAwLTE2Ljc2NiAxNi43NjYtMTYuNzY2IDQ0LjAxMiAwIDYxLjgyOGwzMDUuOTkgMzA1Ljk5YzE3LjgxMiAxNi43NjYgNDUuMDU5IDE2Ljc2NiA2MS44MjggMHoiCiAgICAgICAgZmlsbC1ydWxlPSJjdXJyZW50Q29sb3IiIC8+Cjwvc3ZnPg==");
  width: 12px;
  height: 12px;
  background-position: center;
  background-size: cover;
  margin-left: 5px;
  -webkit-transition: .2s;
  -o-transition: .2s;
  transition: .2s;
}

.select-wrapper {
  width: 100%;
  position: absolute;
  top: calc(var(--height) + 20px);
  left: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: .2s;
  -o-transition: .2s;
  transition: .2s;
}

.select-wrapper ul {
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 0;
  list-style: none;
  height: 90px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  white-space: nowrap;
}

.select-wrapper ul li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
}

.select-wrapper ul li label {
  width: 100%;
}

.select-wrapper ul li,
.select-wrapper ul li * {
  cursor: pointer;
}

.select-wrapper ul li:hover {
  background: lightgray;
}

.select-wrapper ul li span {
  display: inline-block;
  margin-right: 15px;
}

.input-wrapper {
  width: 100%;
  padding-left: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  row-gap: 2px;
}

.input-wrapper legend {
  font-size: 11px;
}

.input-wrapper .textfield {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.input-wrapper .textfield::before {
  content: "+31";
  margin-right: 5px;
  white-space: nowrap;
}

.input-wrapper .textfield input {
  width: 100%;
  font-size: 16px;
  outline: none;
  border: none;
  background: none;
}

.invalid-msg {
  font-size: 12px;
  position: absolute;
  color: red;
  top: 115%;
  left: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: .2s;
  -o-transition: .2s;
  transition: .2s;
}

/* actions */

#phonenumber:invalid+.invalid-msg {
  top: 110%;
  opacity: 1;
  visibility: visible;
}

.ui-wrapper:focus-within {
  border-color: var(--border-focus-color);
  -webkit-box-shadow: 0px 2px 5px 0px var(--shadow-focus-color);
  box-shadow: 0px 2px 5px 0px var(--shadow-focus-color);
}

.dropdown-container:hover {
  background-color: var(--dropdown-button-hover-color);
}

.dropdown-checkbox:checked~.select-wrapper {
  top: calc(var(--height) + 5px);
  opacity: 1;
  visibility: visible;

}

.dropdown-checkbox:checked+.dropdown-container::after {
  rotate: 180deg;
  translate: 0 -2px;
}

.ui-wrapper input#Italiano:checked~.dropdown-container::before,
.ui-wrapper input#Italiano:checked~.select-wrapper li.Italiano {
  content: "🇮🇹 Italiano";
  background-color: lightgray;
}

.ui-wrapper input#Inglese:checked~.dropdown-container::before,
.ui-wrapper input#Inglese:checked~.select-wrapper li.Inglese {
  content: "🇬🇧 Inglese";
  background-color: lightgray;
}
/*lingua*/
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
.searchbar-icon:focus-visible {
  color: #fbbc05;
}
.language{
  position: fixed;
  top: 0.6%;
  right: 8%;
}
</style>