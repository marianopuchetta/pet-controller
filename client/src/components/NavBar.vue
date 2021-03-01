<template>
  
    <b-navbar sticky toggleable="md" type="light" variant="light" class="nav">
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
  
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions(["logOut", "getToken"])  
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
<style scoped>

</style>