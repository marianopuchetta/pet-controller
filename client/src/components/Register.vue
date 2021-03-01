<template>
  <div class="div_register container">
    <b-form v-show="show" class="form mt-4 mb-4" v-on:submit="submitForm">
      <b-form-group
        id="input_username"
        label="usuario:"
        label-for="input_username"
      >
        <b-form-input
          id="input_username"
          v-model="form.username"
          required
          placeholder="Ingresar usuario"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input_email" label="email:" label-for="input_email">
        <b-form-input
          id="input_email"
          v-model="form.email"
          required
          type="email"
          placeholder="Ingresar email"
        ></b-form-input>
      </b-form-group>
      <p class="text-danger-password">Al menos 8 caracteres, 1 número, 1 mayúscula, 1 minúscula</p>
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
          placeholder="Ingresar contraseña"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input_confirm_password"
        label="confirmar contraseña:"
        label-for="input_confirm_password"
      >
        <b-form-input
          id="input_confirm_password"
          v-model="form.confirm_password"
          type="password"
          required
          placeholder="Confirmar contraseña"
        ></b-form-input>
      </b-form-group>
       <div v-if="message !== ''">
        <p class="text-danger">{{ message }}</p>
      </div>
      <b-button v-if="!loading"  type="submit" variant="success">Registrarse</b-button>
      <b-button v-else  type="submit" variant="success"><b-spinner small></b-spinner></b-button>
      <b-button type="reset" v-on:click="onReset()" variant="danger"
        >Limpiar</b-button
      >
      <!-- Remind Passowrd -->
      <div id="form_footer">
        <router-link to="/login"><span>Login</span></router-link>
        <router-link to="/forgotPassword"><span>Olvido su contraseña?</span></router-link>
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
        username: "",
        email: "",
        password: "",
        confirm_password: ""
      },
      show: true,
      message: "",
    };
  },
  methods: {
    ...mapMutations(["getUser"]),
    ...mapActions(["logIn", "getToken", "logOut"]),

    submitForm: function (event) {
      event.preventDefault();
      this.loading = true;
      let data = {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        confirm_password : this.form.confirm_password
      };
      AXIOS.post("/register", data)
        .then((res) => {
          const token = res.data.token;
          this.logIn(token);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err.response.data.err.message);
          this.message = err.response.data.err.message;
          setTimeout(() => (this.message = ""), 5000);
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
.div_register {
   display: flex;
  justify-content: center;
}
.form {
border: 1px solid rgba(0, 0, 0, 0.5);  
border-radius: 10px;
  width: 50%;
  display: block;
}
.form input {
  width: 70%;
  margin: auto;
}
#form_footer {
  display: flex;
  flex-direction: column;
}
.text-danger-password {
  font-size: .62em;
  color:red;
margin-bottom: 0;
margin-top: 5vh;
}
span{
  color: rgba(0, 0, 255, 0.8);
  font-weight: 700;
}
@media only screen and (max-width: 768px) {
  .form {
    width: 100% ;
    padding: 2vh;
  }
  #form_footer {
    margin-top: 1vh;
  }
  .form input {
    border-radius: 5px;
  width: 100%;
  margin: auto;
}
  .error{
    font-size: 1em;
  }
}
</style>