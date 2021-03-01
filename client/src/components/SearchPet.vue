<template>
  <div class="container">
    <div class="div_search_pet">
      <b-spinner v-if="loading"></b-spinner>
      <b-form v-on:submit="submitForm" class="form_search_pet" size="md">
        <b-form-input
          v-model="input_search_pet"
          size="sm"
          class="mr-sm-2"
          placeholder="Ingresar busqueda"
        ></b-form-input>
        <b-form-group
          id="input_search_type"
          label="Buscar por:"
          label-for="input_search_type"
        >
          <b-form-radio
            class="mb-2"
            v-model="search_type"
            name="search_type_radio"
            value="name"
            inline
            >Nombre</b-form-radio
          >
          <b-form-radio
            class="mb-2"
            v-model="search_type"
            name="search_type_radio"
            value="type"
            inline
            >Tipo</b-form-radio
          ><b-form-radio
            class="mb-2"
            v-model="search_type"
            name="search_type_radio"
            value="father"
            inline
            >Padre</b-form-radio
          >
          <b-form-radio
            class="mb-2"
            v-model="search_type"
            name="search_type_radio"
            value="mother"
            inline
            >Madre</b-form-radio
          >
          <b-form-radio
            class="mb-2"
            v-model="search_type"
            name="search_type_radio"
            value="pet_number"
            inline
            >Número de registro</b-form-radio
          >
          <b-form-radio
            v-model="search_type"
            name="search_type_radio"
            value="day_of_birth"
            inline
            >Fecha de nacimiento</b-form-radio
          >
        </b-form-group>
        <b-button type="submit" size="sm" class="mb-2" variant="success"
          >Buscar</b-button
        >
        <p v-if="message !== ''" class="text-danger">{{ message }}</p>
      </b-form>
    </div>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="pets_table"
        size="sm"
      ></b-pagination>
      <b-table
        id="pets_table"
        class="table"
        hover
        :items="this.search_result"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <!-- A custom formatted column -->
        <template #cell(name)="pet">
          <b>{{ pet.item.name.toUpperCase() }}</b>
        </template>
        <template #cell(see)="pet">
          <router-link
            :to="{
              name: 'pet-details',
              params: { _id: pet.item._id, pet: pet.item },
            }"
          >
            <i class="fa fa-share-square"></i>
          </router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { AXIOS } from "./http-common.js";

export default {
  name: "searchPet",
  data() {
    return {
      loading: false,
      search_result: [],
      input_search_pet: "",
      search_type: "name",
      message: "",
      perPage: 15,
      currentPage: 1,
      fields: [
        // A column that needs custom formatting
        { key: "name", label: "Nombre" },
        { key: "type", label: "Tipo" },
        { key: "gender", label: "Género" },
        "see",
      ],
    };
  },
  methods: {
    submitForm: function (event) {
      event.preventDefault();
      this.loading = true;
      let config = {
        headers: {
          token: this.token,
        },
      };
      let data = {
        input_search_pet: this.input_search_pet,
        search_type: this.search_type,
        user_id: this.user_id,
      };
      AXIOS.post("/search/", data, config)
        .then((res) => {
          this.loading = false;
          this.search_result = res.data.pet;
          this.input_search_pet = "";
        })
        .catch((err) => {
          this.loading = false;
          this.message = err.response.data.err.message;
          setTimeout(() => (this.message = ""), 5000);
        });
    },
  },
  computed: {
    ...mapState(["token"]),
    ...mapGetters(["role", "user_id"]),
    rows() {
      return this.search_result.length;
    },
  },
};
</script>

<style scoped>
.div_search_pet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form_search_pet label {
  font-weight: 500;
  font-size: 0.9em;
}
.form_search_pet input {
  margin: 2vh 0;
  width: 100% !important;
}

</style>