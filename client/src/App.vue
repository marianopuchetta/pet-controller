<template>
  <div id="app" class="container">
    
    <div >
        <b-navbar  toggleable="md"   class="navbar">
      <b-navbar-brand
        ><router-link to="/">Mascotas</router-link></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="links ml-auto-4">
          <b-nav-item
            ><router-link to="/pets">Listado de mascota</router-link></b-nav-item
          ><b-nav-item
            ><router-link to="/addpet">Añadir mascota</router-link></b-nav-item
          >
          <b-nav-item
            ><router-link to="/searchpet">Buscar</router-link></b-nav-item
          >

          <b-nav-item v-if="isActive && role === 'ADMIN_ROLE'"
            ><router-link to="/users">Panel de Administrador</router-link></b-nav-item
          >
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em v-if="isActive">{{ username }}</em>
              <em v-else>Ingresar</em>
            </template>
            <div v-if="isActive">
              <b-dropdown-item
                ><b-button variant="outline-danger" @click="logOut()"
                  >Cerrar sesión</b-button
                >
              </b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item
                ><b-button variant="outline-success"
                  ><router-link to="/login">Entrar</router-link></b-button
                ></b-dropdown-item
              >
              <b-dropdown-item
                ><router-link to="/register"><b-button variant="outline-primary"
                  >Registrarse</b-button
                ></router-link></b-dropdown-item
              >
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters,mapState } from "vuex";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logOut", "getToken"]),
  },
  computed: {
     ...mapState(["token"]),
    ...mapGetters(["isActive", "username", "role"]),
  },
  created() {
    this.getToken();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ranchers&family=Roboto:wght@500&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

body {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  font-size: 1rem;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 98, 121, 0.8939950980392157) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}
html {
  height: 100%;
   background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 98, 121, 0.8939950980392157) 0%,
    rgba(0, 212, 255, 1) 100%
  );
}
#app {
  margin:0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  justify-content: center; 
  height: 100%;
 
}
.navbar{
 background-color: rgba(248, 244, 244, 0.5);
}
@media only screen and (max-width: 768px) {
  
}
</style>
<style scoped >

</style>
