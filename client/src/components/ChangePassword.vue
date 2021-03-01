<template>
  <div class="container div_change_password">
    <div>
      <h4>Change your password</h4>
    </div>
    <b-form class="form change_password" v-on:submit="submitForm">
      <b-form-group
        id="input_password"
        label="Type new password:"
        label-for="password"
      >
        <b-form-input v-model="form.password" type="password"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input_confirm_password"
        label="Confirm new password:"
        label-for="confirm_password"
      >
        <b-form-input v-model="form.confirm_password" type="password"></b-form-input>
      </b-form-group>
      <p v-if="message !== ''" class="text-danger">{{message}}</p>
      <b-button type="submit" variant="outline-success">Submit</b-button>
      <b-button type="reset" v-on:click="onReset()" variant="danger"
        >Reset</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapState} from "vuex";


export default {
  name: "changePassword",
  data() {
    return {
      message:'',
      form: {
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    submitForm: function (event) {
      event.preventDefault();
       let config = {
        headers: {
          token: this.$route.query.token,
        },
      };
      let data = {
        password: this.form.password,
        confirm_password: this.form.confirm_password,
        email : this.$route.query.email

      };

      AXIOS.put('/change_password',data , config)
      .then(()=>{
        this.$router.push("/login")
      })
      .catch((err)=>{
        console.log(err.response.data.err.message)
        this.message = err.response.data.err.message;
          setTimeout(() => (this.message = ""), 5000);
      })
    },
  },
  computed: {
    ...mapState(["token"])
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
.div_change_password {
  display: flex;
  flex-direction: column;
  justify-self: center;
}
.form {
  background-color: rgba(204, 204, 243, 0.6);
  border-radius: 10px;
  width: 50%;
  margin: auto;
}
.form input {
  width: 70%;
  margin: auto;
}
h4 {
  margin: 4vh;
}
@media only screen and (max-width: 768px) {
    .form{
    margin:5vh 5vh;
      width: 100%;
}
}
</style>