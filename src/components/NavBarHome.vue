<script setup>
import { RouterLink, RouterView } from 'vue-router'
import router from "@/routers/index.js";
import { useshareinput } from "@/stores/shareInput.js";
import {useAuthStore} from "@/stores/authStore.js";

const inputcondiviso = useshareinput(); // accediamo allo store
const authStore = useAuthStore();
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

      <li><RouterLink to="ChiSiamo" class="a">Chi Siamo</RouterLink></li>
      <li><RouterLink to="ris" class="a">Cerca</RouterLink></li>
      <li v-if="authStore.user"><RouterLink to="carica" class="a">Carica</RouterLink></li>
      <li v-if="!(authStore.user)"><RouterLink to="login" class="a">Carica</RouterLink></li>
      <li v-if="authStore.user"><span class="a" @click="authStore.logout()">Logout</span></li>

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
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  /* rimane fisso in alto */
  height: 60px;
  width: 100%;
  color: #000000;
  transition: background-color 0.3s ease;
  z-index: 1000;
}
.navbar__links {
  list-style: none;
  display: flex;
  gap: 65px;
  align-items: center;
}

.navbar__links .a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  white-space: nowrap; /* Impedisce al testo di andare a capo */

}

.navbar__links .a:hover {
  background-color: #ffffff;
  color: #000000;
  border-radius: 50px;
  transition: all 1s ease;
  padding: 5px 10px;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
}
.router-link:hover {
  background-color: transparent;
}
#sposta {
  margin-left: 5%;
}

#x1 {
  color: #ff6a00;
  font-size: 24px;
  font-weight: bold;
  margin-right: 0;
  margin-left: 0;
}
#x2 {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

#pandiera {
  position: absolute;
  right: 9%;
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
  position: absolute;
  /* rimane fisso in alto */
  top: 20%;
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
  -webkit-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  top: 1.35%;
}

.ui-wrapper > input {
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
}

.dropdown-container::before {
  content: "🇮🇹";
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
  -webkit-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
}

.select-wrapper {
  position: absolute;
  top: calc(var(--height) + 10px);
  left: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  text-align: center;
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
  left: 100%;
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
  -webkit-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
}

/* actions */

#phonenumber:invalid + .invalid-msg {
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

.dropdown-checkbox:checked ~ .select-wrapper {
  top: calc(var(--height) + 5px);
  opacity: 1;
  visibility: visible;
}

.dropdown-checkbox:checked + .dropdown-container::after {
  rotate: 180deg;
  translate: 0 -2px;
}

.ui-wrapper input#Italiano:checked ~ .dropdown-container::before,
.ui-wrapper input#Italiano:checked ~ .select-wrapper li.Italiano {
  content: "🇮🇹";
  background-color: lightgray;
}

.ui-wrapper input#Inglese:checked ~ .dropdown-container::before,
.ui-wrapper input#Inglese:checked ~ .select-wrapper li.Inglese {
  content: "🇬🇧";
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



</style>
