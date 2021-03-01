<template>
  <div class="container">
    <div class="div first_div">
      <h1>Lleva el control de tus mascotas</h1>
      <ol>
        <li>Fecha de Nacimiento</li>
        <li>Madre y Padre</li>
        <li>Género</li>
      </ol>
    </div>
     <router-link to="/register"><b-button class="mb-5" variant="primary"
              >Registrarse</b-button></router-link>

    <div class="div fade-in">
      <h1 class="h1_anota">Anota las visitas al veterinario</h1>
      <h2>Registra cuando le das su medicacion</h2>
    </div>
     <router-link to="/register"><b-button class="mb-5" variant="primary"
              >Registrarse</b-button></router-link>

    <div class="div fade-in busca_div">
      <h1>Busca por:</h1>
      <img class="pic_div_3" src="@/assets/foto_busqueda.png" alt="">
    </div>
 <router-link to="/register"><b-button class="mb-5" variant="primary"
              >Registrarse</b-button></router-link>
    <div class="div fade-in">
      <h1>Perfil con foto</h1>
      <img class="pic_div_4" src="@/assets/foto_perfil.png">
    </div>
     <router-link to="/register"><b-button class="mb-5" variant="primary"
              >Registrarse</b-button></router-link>
  </div>
</template>

<script>
export default {
  name: "unverifiedhome",
  data() {
    return {};
  },
  methods: {
    onScroll(e) {
      let fadeInElements = Array.from(
        document.getElementsByClassName("fade-in")
      );

      for (let i = 0; i < fadeInElements.length; i++) {
        let elem = fadeInElements[i];
        if (this.isElemVisible(elem)) {
          elem.style.opacity = "1";
          elem.style.transform = "scale(.95)";
          elem.style.transition = "all 0.5s ease-out";
          fadeInElements.splice(i, 1); // only allow it to run once
        } else {
          elem.style.opacity = "0";
          elem.style.transform = "scale(.8)";
          elem.style.transform = "translate(30px,0)";
        }
      }
    },
    isElemVisible(el) {
      let rect = el.getBoundingClientRect();
      // console.log('div ' + el.getBoundingClientRect().top)
      // console.log('scroll ' + window.scrollTop)
      // let elemTop = window.innerHeight - rect.top ;
      let elemTop = rect.top ; // 200 = buffer
      let elemBottom = rect.bottom - 100;
      return elemTop <= window.innerHeight && elemBottom >= 0;
    },
  },
  created: function () {
    window.addEventListener("scroll", this.onScroll, true);
  },

  destroyed: function () {
    window.removeEventListener("scroll", this.onScroll, true);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Slackey&display=swap");

.container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-family: "Slackey", cursive;
}
.div {
  box-shadow: 1px 1px 8px 3px black;
  height: 500px;
  margin-bottom: 15vh !important;
  padding: 10vh;
  display: inline-block;
  width: 100%;
  border-radius: 20px;
  
}
.fade-in {
  opacity: 0;
  width: 100%;
  -webkit-transition: all 1s ease-out;
  -moz-transition: all 1s ease-out;
  transition: all 1s ease-out;
}
.first_div {
  margin: 10vh 15vh;
}
h1 {
  margin: 1vh 0 1vh 2vh;
  color: rgba(255, 0, 0, 0.65);
  text-shadow: 2px 2px 4px black;
}
h2 {
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 4px 3px 4px rgb(0, 0, 0);
  font-size: 1.5em;
  display: inline;
}
ol {
  list-style: disc;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 4px 3px 4px rgb(0, 0, 0);
  font-size: 1.5em;
  display: inline;
  list-style-position: inside;
}
.pic_div_3{
    width: 50%;
    height: 65%;
  }
.pic_div_4{
  width: 30%;
  height: 350px;
}
.mb-5{
  margin:2vh;
  border: 1px solid black;
  font-variant: normal;
text-shadow:0px 2px 7px rgb(0, 0, 0);
height: 15vh;

}
@media only screen and (max-width: 768px) {
  .div {
    margin: 4vh;
    height: 80vh;
    padding: 1vh;
  }
  .first_div h1 {
    margin-bottom: 1vh;
  }
  h1 {
    margin: 4vh 0;
    font-size: 1.9em;
  }
  .busca_div h1 {
    margin-top: 6vh;
  }
  .pic_div_3{
    width: 75%;
    height: 65%;
  }
  .pic_div_4{
    width: 65%;
    height: 70%;
  }
}
</style>