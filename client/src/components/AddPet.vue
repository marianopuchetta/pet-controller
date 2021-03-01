<template>
  <div class="container">
    <div class="submitform">
      <h2 class="m-4">Añade una mascota</h2>
      <b-form v-on:submit="submitForm" class="form_pet mt-4" size="md">
        <b-form-group
          id="input_name"
          class="label "
          label="Nombre:"
          label-for="input_name"
          require
        >
          <b-form-input
            id="input_name"
            v-model="pet.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input_type" class="label" label="Tipo:" label-for="input_type">
          <b-form-select v-model="pet.type" :options="options"></b-form-select>
        </b-form-group>

   <b-form-group
          id="input_pet_breed"
          class="label"
          label="Raza:"
          label-for="input_pet_breed"
        >
          <b-form-input
            id="input_pet_bredd"
            v-model="pet.pet_breed"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input_day_of_birth"
          class="label"
          label="fecha de nacimiento:"
          label-for="input_day_of_birth"
        >
          <b-form-datepicker
          placeholder="Seleccionar fecha"
            id="input_day_of_birth"
            v-model="pet.day_of_birth"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>
        <b-form-group
          id="input_day_of_death"
          label="fecha de muerte:"
          class="label"
          label-for="input_day_of_death"
        >
          <b-form-datepicker
            id="input_day_of_death"
            v-model="pet.day_of_death"
            class="mb-2"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="input_pet_number"
          class="label"
          label="numero de registro:"
          label-for="input_pet_number"
        >
          <b-form-input
            id="input_pet_number"
            v-model="pet.pet_number"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input_mother" class="label" label="madre:" label-for="input_mother">
          <b-form-input
            id="input_mother"
            v-model="pet.mother"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input_father" class="label"  label="padre:" label-for="input_father">
          <b-form-input
            id="input_father"
            v-model="pet.father"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input_gender"
         class="label"
          label="género:"
          label-for="pet_gender_radio"
        >
          <b-form-radio
            class="mb-3"
            v-model="pet.gender"
            name="pet.gender_radio"
            value="macho"
            inline
            >macho</b-form-radio
          >
          <b-form-radio
            class="mb-3"
            v-model="pet.gender"
            name="pet.gender_radio"
            value="hembra"
            inline
            >hembra</b-form-radio
          >
        </b-form-group>
      
          <p v-if="message !== ''" class="text-danger m-3">{{ message }}</p>
        <div class="buttons_div mt-3 mb-5">
          <b-button class="mr-2" type="submit" variant="success"
            >Crear Mascota</b-button
          >
          <b-button type="reset" v-on:click="onReset()" variant="danger"
            >Limpiar</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapGetters } from "vuex";

export default {
  name: "addpet",
  data() {
    return {
      pet: {
        name: "",
        type: "PERRO",
        day_of_birth: "",
        day_of_death: "",
        pet_number: "",
        mother: "",
        father: "",
        gender: "",
        breed: "",
      },
      options: [
        { value: "PERRO", text: "Perro" },
        { value: "GATO", text: "Gato" },
        { value: "GALLINA", text: "Gallina" },
        { value: "PALOMA", text: "Paloma" },
        { value: "CONEJO", text: "Conejo" },
        { value: "PAJARO", text: "Pájaro" },
        { value: "PATO", text: "Pato" },
        { value: "OTROS", text: "Otros" },
      ],
      message: "",
    };
  },
  methods: {
    /* eslint-disable no-console */
    submitForm: function (event) {
      event.preventDefault();
      var data = {
        name: this.pet.name,
        type: this.pet.type,
        day_of_birth: this.pet.day_of_birth,
        day_of_death: this.pet.day_of_death,
        pet_number: this.pet.pet_number,
        mother: this.pet.mother,
        father: this.pet.father,
        gender: this.pet.gender,
        breed: this.pet.breed,
        created_by: this.user_id,
        profile_picture:""
      };
      AXIOS.post("/pet/add", data)
        .then((response) => {
          this.pet.id = response.data.id;
          this.$router.push("/pets");
        })
        .catch((err) => {
          console.log(err);
          this.message = err.response.data.err.message;
          setTimeout(() => (this.message = ""), 3000);
        });
      this.submitted = true;
    },
    newpet() {
      this.submitted = false;
      this.pet = {};
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.day_of_birth = "";
      (this.name = ""), (this.type = ""), (this.pet_number = "");

      // Trick to reset/clear native browser form validation state
      // this.show = false;
      // this.$nextTick(() => {
      //   this.show = true;
      // });
    },
    /* eslint-enable no-console */
  },
  computed: {
    ...mapGetters(["user_id"]),
  },
};
</script>

<style scoped>
.form_pet {
  margin: 0 50vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.text-danger {
  font-weight: 500;
}

@media only screen and (max-width: 768px) {
  .form_pet {
    margin: 0 1vh;
    width: 100%;
  }
.label{
  font-weight: 600;
  font-size: .9em;
}
  .buttons_div button {
    width: 50%;
    font-size: 0.95em;
    font-weight: 600;
    margin-bottom: 2vh;
  }
}
</style>