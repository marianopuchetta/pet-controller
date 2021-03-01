<template>
  <div class="container">
    <div class="submitform">
      <div v-if="!submitted">
        <div v-if="message !==''" class="error">
          {{message}}
        </div>
        <b-form v-on:submit="submitForm" class="form_user">
          <b-form-group
            id="input_username"
            label="username:"
            label-for="input_username"
          >
            <b-form-input
              id="input_username"
              v-model="user.username"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input_email" label="email:" label-for="input_email">
            <b-form-input
              id="input_email"
              v-model="user.email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input_password"
            label="password:"
            label-for="input_password"
          >
            <b-form-input
              id="input_password"
              v-model="user.password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input_role" label="role:" label-for="user_role_radio">
            <b-form-radio
            class="mb-3"
              v-model="user.role"
              name="user.role_radio"
              value="USER_ROLE"
              inline
              >user</b-form-radio
            >
            <b-form-radio
            class="mb-3"
              v-model="user.role"
              name="user.role_radio"
              value="ADMIN_ROLE"
              inline
              >admin</b-form-radio
            >
          </b-form-group>
          <b-form-group
            id="input_status"
            label="status:"
            label-for="input_status"
          >
               <b-form-radio
              v-model="user.status"
              name="user.status_radio"
              value="true"
              inline
              >verified</b-form-radio
            >
            <b-form-radio
              v-model="user.status"
              name="user.status_radio"
              value="false"
              inline
              >unverified</b-form-radio
            >
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" v-on:click="onReset()" variant="danger"
            >Reset</b-button
          >
        </b-form>
      </div>
      <div v-else>
          <h4>The user was added successfully!</h4>
          <button  class="btn btn-success" v-on:click="newUser">
          Add new user
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import {mapGetters, mapState} from 'vuex';
export default {
  name: "adduser",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        role: "USER_ROLE",
        status: "false",
      },
      submitted: false,
      message: ''
    };
  },
  methods: {
    /* eslint-disable no-console */
    submitForm: function (event) {
      event.preventDefault();
        let config = {
        headers: {
          token: this.token,
          role: this.role,
        },
      };
      var data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
        status: this.user.status,
      };
      AXIOS.post("/user/add", data,config)
        .then((response) => {
          this.user.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e.response.data.err.message);
          this.message = e.response.data.err.message;
          setTimeout(() => (this.message= ''), 6000);
        });
       event.target.reset();
      
    },
    newUser() {
      this.submitted = false;
      this.user = {};
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.email = "";
      (this.username = ""),
        (this.password = ""),
        (this.role = ""),
        (this.status = "");
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    /* eslint-enable no-console */
  },
    computed: {
      ...mapGetters(["role"]),
    ...mapState(["token"])
  }
};
</script>

<style scoped>
.error{
color:red;
font-size: 1.2em;
font-weight: 600;
}
.form_user{
    margin:0 50vh;
}
@media only screen and (max-width: 768px) {
    .form_user{
    margin:0 10vh;
}
}
@media only screen and (max-width: 1064px) {
    .form_user{
    margin:0 10vh;
}
}
</style>