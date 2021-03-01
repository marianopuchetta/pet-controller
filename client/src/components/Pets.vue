  <template>
  <div class="container">
    <b-spinner v-if="loading"></b-spinner>
    <div v-else>
      <div v-if="rows !== 0">
        <p class="total_count m-2">Total de mascotas: {{ rows }}</p>

 
        <div class="card-columns grid-container">
        
          <div v-for="(pet, index) in pets" :key="index">
         <b-card-group columns>    
              <b-card
                class="b-card"
                header-bg-variant="primary"
                :header="pet.name.toUpperCase()"
                header-tag="header"
                footer-tag="footer"
              >
                <div class="card_body">
                  <div>
                    <b-avatar
                      class="avatar"
                      :src="pet.profile_picture"
                    ></b-avatar>
                  </div>
                  <div class="card_body_text">
                    <b-card-text class="">{{ pet.type}}</b-card-text>
                    <b-card-text>{{ pet.breed }}</b-card-text>
                    <b-card-text>{{ pet.gender }}</b-card-text>
                    <b-card-text>{{ pet.pet_number }}</b-card-text>
                    <b-card-text
                      class="day_of_birth_text">Nacio:{{ pet.day_of_birth }}</b-card-text
                    >
                    <router-link
                      :to="{
                        name: 'pet-details',
                        params: { _id: pet._id, pet: pet },
                      }"
                    >
                      <b-button variant="primary">Ver mas</b-button>
                    </router-link>
                  </div>
                </div>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link to="/addpet"
          ><b-button class="mt-5" variant="warning"
            >Añadir mascota</b-button
          ></router-link
        >
      </div>
    </div>

    <div>
      <router-view @refreshData="refreshList"></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { AXIOS } from "./http-common";

export default {
  name: "pets",
  data() {
    return {
      loading: true,
      pets: [],
    };
  },
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["user_id"]),
    rows() {
      return this.pets.length;
    },
  },
  methods: {
    /* eslint-disable no-console */
    retrievepets() {
      AXIOS.get("http://localhost:3000/pets/" + this.user_id)
        .then((response) => {
          this.pets = response.data; // JSON are parsed automatically.
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievepets();
    },
    /* eslint-enable no-console */
  },

  created() {
    this.retrievepets();
  },
};
</script>

<style  scoped>
.grid-container {
  display: grid;
  grid-template-columns: 50vh 50vh 50vh;
  grid-template-rows: auto;
  grid-gap: 10vh;
  column-gap: 10vh;
}
.b-card {
  width: 400% !important;
  border:1px solid black;
}
.card_body {
  display: flex;
}
.card_body_text {
  display: flex;
  flex-flow: column;
  align-items: baseline;
   line-height: .5em; 

}

 .avatar {
  width: 6.5rem;
  height: 6.5rem;
  margin: 5vh 1vh;
}

@media only screen and (max-width: 768px) {
  
  .grid-container {
    grid-template-columns: 45vh 45vh;
    grid-template-rows: auto;

  }
  .b-card {
    width: 375% !important;
      font-size: 0.8em;

  }
  .avatar {
  width: 5rem;
  height: 5rem;
  margin: 5vh 1vh;
}
}
@media only screen and (max-width: 576px) {
  .b-card {
    width: 100% !important;
  }
  .grid-container {
    display: flex;
    flex-flow: column;
  }
  .card_body_text {
    font-size: .95em;
  }
  .day_of_birth_text{
    font-size: .85em;
  }
  .avatar {
  width: 5rem;
  height: 5rem;
  margin: 3vh 1vh;
}
}
</style>