  <template>
  <div class="container">
   <div v-if="role === 'ADMIN_ROLE'">
      <b-button variant="success" size="sm" class="m-4">
      <router-link  to="/adduser" class=" btn"
        >Add User</router-link
      ></b-button
    >
   </div>
    <h1>Users List</h1>
    <div v-if="message !== ''">
      <p class="error">{{ message }}</p>
    </div>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="users_table"
        size="sm"
      ></b-pagination>

      <!-- <p class="mt-3">Current Page: {{ currentPage }}</p> -->
      <b-table
        id="users_table"
        hover
        :items="users"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(see)="user">
          <router-link
            :to="{
              name: 'user-details',
              params: { _id: user.item._id, user: user.item },
            }"
          >
            <i class="fa fa-share-square"></i>
          </router-link>
        </template>
      </b-table>
    </div>
    <div>
      <router-view @refreshData="refreshList"></router-view>
    </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapState, mapGetters } from "vuex";

export default {
  name: "users-list",
  data() {
    return {
      message: "",
      perPage: 5,
      currentPage: 1,
      users: [],
      fields: ["username", "role", "status", "see"],
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveUsers() {
      let config = {
        headers: {
          token: this.token,
          role: this.role
        },
      };
      AXIOS.get("/users", config)
        .then((response) => {
            console.log(config)
          this.users = response.data; // JSON are parsed automatically.
        })
        .catch((e) => {
          console.log(e.response.data.err.message);
          this.message = e.response.data.err.message;
          setTimeout(() => (this.message = ""), 3000);
        });
    },
    refreshList() {
      this.retrieveUsers();
    },
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveUsers();
  },
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["role"]),
    rows() {
      return this.users.length;
    },
  },
};
</script>

<style scoped>
.list-row {
  display: flex;
  align-self: center;
  flex-flow: column wrap;
}
.error {
  color: red;
  font-size: 1em;
}
.btn{
    color:white;
}
@media only screen and (max-width: 768px) {
}
</style>