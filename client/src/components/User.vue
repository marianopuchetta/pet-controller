<template>
  <div class="container">
    <div class="overflow-auto">
      <h1 class="title_user">User</h1>
      <div v-if="this.user">
        <div v-if="message !== ''">
          <h4 class="error">{{ message }}</h4>
        </div>
        <b-table
          class="b-table"
          stacked
          :items="items"
          responsive
          :fields="fields"
        >
          <template v-if="editable" v-slot:cell(username)="{ item }">
            <b-form-input v-model="item.username" />
          </template>
          <template v-if="editable" v-slot:cell(email)="{ item }">
            <b-form-input v-model="item.email" />
          </template>
          <template v-if="editable" v-slot:cell(password)="{ item }">
            <b-form-input v-model="item.password" />
          </template>
          <template v-if="editable" v-slot:cell(role)="{ item }">
            <b-form-input v-model="item.role" />
          </template>
          <template v-if="editable" v-slot:cell(status)="{ item }">
            <b-form-input v-model="item.status" />
          </template>
        </b-table>
        <div v-if="editable">
          <b-button
            class="btn"
            variant="outline-danger"
            v-on:click="disableEditing()"
            ><i class="fa fa-window-close"></i
          ></b-button>
          <b-button
            class="btn"
            variant="outline-success"
            v-on:click="updateUser()"
            ><i class="fa fa-save"></i
          ></b-button>
        </div>
        <div v-else>
          <b-button
            class="btn"
            variant="outline-danger"
            v-on:click="confirmation()"
            ><i class="fa fa-trash"></i
          ></b-button>
          <b-button
            class="btn"
            variant="outline-warning"
            v-on:click="enableEditing()"
            ><i class="fa fa-edit"></i
          ></b-button>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapState , mapGetters} from "vuex";

export default {
  name: "user",
  props: ["user"],
  data() {
    return {
      items: [this.user],
      fields: ["username", "email", "role", "status"],
      editable: false,
      message: "",
    };
  },
  methods: {
    /* eslint-disable no-console */
    updateUser() {
      var data = {
        id: this.user._id,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role,
        status: this.user.status,
      };

      AXIOS.put("/user/" + this.user._id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.editable = false;
    },
    deleteUser() {
      let config = {
        headers: {
          token: this.token,
          role: this.role,
        },
      };
      AXIOS.delete("/user/" + this.user._id, config)
        .then((response) => {
          console.log(response);
          this.$emit("refreshData");
          this.$router.push("/users").catch(err => {console.log(err)});
        })
        .catch((e) => {
          console.log(e.response.data.err.message);
          this.message = e.response.data.err.message;
          setTimeout(() => (this.message = ""), 3000);
        });
    },

    disableEditing() {
      this.editable = false;
    },
    enableEditing() {
      this.editable = true;
    },
    confirmation() {
      let r = confirm("Delete?");
      if (r == true) {
        this.deleteUser();
        return true;
      } else {
        return false;
      }
    },
    /* eslint-enable no-console */
  },
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["role"])

  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.title_user {
  font-size: 3em;
}
</style>
<style scoped >
.fa {
  font-size: 2em;
  color: black;
}
.btn {
  margin: 1vh;
}
@media only screen and (max-width: 768px) {

}
</style>