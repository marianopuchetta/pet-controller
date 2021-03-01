<template>
  <div class="container">
    <div  v-if="!isActive">
      <UnVerifiedHome />
    </div>
    <div v-else class="buttons">
      <router-link to="/pets">
        <b-button class="button">Listado de mascotas</b-button></router-link
      >
      <router-link to="/addpet"
        ><b-button class="button">Añadir mascota</b-button></router-link
      >
      <router-link to="/searchpet"
        ><b-button class="button">Buscar mascota</b-button></router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UnVerifiedHome from "./UnVerifiedHome.vue";

export default {
  name: "home",
  components: {
    UnVerifiedHome,
  },
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters(["isActive"]),
  },
};
</script>

<style scoped>

.buttons {
}

.button {
  width: 50%;
  margin: 2vh;
  height: 25vh;
  border-radius: 2vh;
  border: 0.4vh solid white;
  background: rgb(174, 111, 181);
  background: linear-gradient(
    90deg,
    rgba(150, 80, 150, 1) 5%,
    rgba(170, 93, 179, 1) 17%,
    rgba(180, 80, 190, 1) 100%
  );
  color: white;
  font-size: 2em;
  font-weight: 600;
  text-shadow: 4px 2px 4px rgb(44, 24, 24);
}

@media only screen and (max-width: 768px) {
  .button {
    width: 100%;
    margin: 2vh;
    height: 20vh;
  }
  .link {
    color: white;
    font-size: 1.5em;
    font-weight: 500;
  }
}
</style>