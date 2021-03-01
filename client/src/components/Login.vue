<template>
  <div class="div_login container">
    <b-form class="form mt-5" v-show="show" v-on:submit="submitForm">
      <b-form-group id="input_email" label="email:" label-for="input_email">
        <b-form-input
          id="input_email"
          v-model="form.email"
          type="email"
          required
          placeholder="ingrese su email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input_password"
        label="contraseña:"
        label-for="input_password"
      >
        <b-form-input
          id="input_password"
          v-model="form.password"
          type="password"
          required
          placeholder="ingrese su contraseña"
        ></b-form-input>
      </b-form-group>
      <div v-if="message !== ''">
        <p class="error">{{ message }}</p>
      </div>
      <b-button v-if="!loading" class="mb-4" type="submit" variant="success">Entrar</b-button>
      <b-button v-else class="mb-4" type="submit" variant="success"><b-spinner small></b-spinner></b-button>
      <div id="formFooter">
        <router-link to="/register"><span>Registrarse</span></router-link>
        <router-link to="/forgotpassword"><span>Olvido su contraseña?</span></router-link>
      </div>
    </b-form>   
  </div>

</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { AXIOS } from "./http-common";
export default {
  name: "login",
  data() {
    return {
      loading:false,
      form: {
        email: "",
        password: "",
      },
      show: true,
      message: "",
    };
  },
  methods: {
    ...mapMutations(["getUser","setUsername(localStorage('user_name')"]),
    ...mapActions(["logIn", "getToken", "logOut"]),

    submitForm: function (event) {
      event.preventDefault();
      this.loading = true;
      let data = {
        email: this.form.email,
        password: this.form.password,
      };
      AXIOS.post("/login", data)
        .then((res) => {
          const token = res.data.token;
          // let user_name = res.data.userDB.username
          this.logIn(token);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.response.data.err.message);
          this.message = err.response.data.err.message;
          setTimeout(() => (this.message = ""), 3000);
           this.loading = false;

        });
      event.target.reset();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}
.div_login {
    display: flex;
  justify-content: center;
}
.form {
  padding: 2vh;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  width: 50%;
  display: block;
}
.form input {
  border-radius: 5px;
  width: 70%;
  margin: auto;
}

#formFooter {
  display: flex;
  flex-direction: column;
}
span{
  color: rgba(0, 0, 255, 0.8);
  font-weight: 700;
}
.error {
  color: red;
}
@media only screen and (max-width: 768px) {
  .form {
    width: 100%;
  }
  .form input {
  width: 100% !important;
  margin: auto;
}
}
</style>