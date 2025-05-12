<script lang="ts">
import { ref } from "vue";
import {useAuthStore} from "@/stores/authStore.ts";
import router from "@/routers/index.ts";


export default {
  name: "LoginView",
  setup() {
    const password_visible = ref(false);
    const email = ref("");
    const password = ref("");
    const authStore = useAuthStore();

    const cambia_icone_password = () => {
      password_visible.value = !password_visible.value;

    };
    const login = async (email:string, password:string) => {
      authStore.login(email, password)
      .then(() => {
        alert("Login successful");
        router.back();
      })
    }
    return{
      password_visible,
      cambia_icone_password,
      email,
      password,
      login,
      authStore,
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="darker">
      <div class="container">
        <div class="heading">Login</div>
        <form action="" class="form">
          <label>Email </label>
          <input required v-model="email" type="text" class="input"  placeholder="E-mail" />
          <label>Password </label>
          <div class="unione">
            <input v-model="password" :type="password_visible ? 'text' : 'password'" class="input" placeholder="Password" />
            <svg
                v-if="password_visible"
                @click="cambia_icone_password"
                viewBox="0 0 640 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>

            <svg
                v-else
                @click="cambia_icone_password"
                viewBox="0 0 576 512"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
              />
            </svg>
          </div>
          <span class="forgot-password"><a href="#">Forgot Password ?</a></span>

          <div class="modifica">
            <input type="checkbox" id="remember"/>
            <label id="solo"> Remember me</label>
          </div>

          <input class="login-button" type="button" value="Login" @click="login(email, password)"/>
        </form>

        <p class="p">Non hai un account?<router-link to="/registra">Registrati</router-link></p>

      </div>
    </div>

  </div>
</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.background{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/imgs/login_background.jpg");
  background-repeat: round;
}

.darker{
  position: absolute;
  width: 40%;
  height: 100%;
  left: 40%;
  transform: translateX(-100%);
  backdrop-filter: blur(8px) brightness(85%);
}

.container {
  position: absolute;
  width: 520px;
  max-width: 520px;
  background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
  border-radius: 40px;
  padding: 30px 40px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 30px 30px -20px;
  font-family: 'DM Sans', sans-serif;
  left: 55%;
  top: 50%;
  transform: translate(-50%, -50%);
}



.heading {
  text-align: center;
  font-weight: 900;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  color: rgb(16, 137, 211);
}

.form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}

.form label {
  display: block;
  margin-top: 15px;
  font-size: 14px;
  color: rgb(16, 137, 211);
}

.form .input {
  width: 100%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 5px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
  font-size: 14px;
}

.form .input::placeholder {
  color: rgb(170, 170, 170);
  font-size:small;
}

.form .input:focus {
  outline: none;
  border-inline: 2px solid #12B1D1;
}

.unione {
  position: relative;
}

.unione .input {
  padding-right: 45px;
}

.unione svg {
  position: absolute;
  right: 15px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
  fill: #aaa;
}

/* FIX: Dimensioni checkbox ingrandite */
#remember {
  margin: 0;
  cursor: pointer;
  transform: scale(1.4);
  accent-color: #1091d3;

}

.modifica {
  display: flex;
  align-items: center;
  margin: 20px;
  gap: 10px;
}

#solo{
  font-size: 13px;
  color: #0099ff;
  margin: 0;
}

.form .checkbox-container label {
  font-size: 13px;
  font-weight: 400;
  color: #555;
  margin-left: 10px;
}

.form .forgot-password {
  display: block;
  margin-top: 10px;
  margin-left: 10px;
}

.form .forgot-password a {
  font-size: 13px;
  color: #0099ff;
  text-decoration: none;
}

.form .login-button {
  display: block;
  width: 100%;
  font-weight: bold;
  background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
  color: white;
  padding-block: 15px;
  margin: 25px auto 0 auto;
  border-radius: 20px;
  box-shadow: rgba(133, 189, 215, 0.88) 0px 20px 10px -15px;
  border: none;
  transition: all 0.2s ease-in-out;
}

.form .login-button:hover {
  transform: scale(1.03);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 23px 10px -20px;
}

.form .login-button:active {
  transform: scale(0.95);
  box-shadow: rgba(133, 189, 215, 0.88) 0px 15px 10px -10px;
}

.p {
  text-align: center;
  font-size: 13px;
  color: #555;
  margin-top: 20px;
}

.p a {
  color: rgb(16, 137, 211);
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
}

.social-account-container {
  margin-top: 30px;
}

.social-account-container .title {
  display: block;
  text-align: center;
  font-size: 12px;
  color: rgb(141, 140, 140);
}

.social-account-container .social-accounts {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.social-account-container .social-accounts .social-button {
  background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
  border: 5px solid white;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  display: grid;
  place-content: center;
  box-shadow: rgba(133, 189, 215, 0.88) 0px 12px 10px -8px;
  transition: all 0.2s ease-in-out;
}

.social-account-container .social-accounts .social-button .svg {
  fill: white;
  margin: auto;
}

.social-account-container .social-accounts .social-button:hover {
  transform: scale(1.2);
}

.social-account-container .social-accounts .social-button:active {
  transform: scale(0.9);
}

.agreement {
  display: block;
  text-align: center;
  margin-top: 20px;
}

.agreement a {
  text-decoration: none;
  color: #0099ff;
  font-size: 9px;
}


</style>