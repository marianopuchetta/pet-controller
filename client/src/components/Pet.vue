<template>
  <div >
    <b-card no-body class="b-card mt-5">
      <b-tabs
        card
        content-class="mt-1 tabs"
        active-nav-item-class="font-weight-bold text-uppercase text-danger"
      >
        <b-tab :title="this.pet.name" active>
          <div class="overflow-auto">
            <div v-if="this.pet">
              <Picture :pet-id="this.pet._id"></Picture>

              <b-table
              size="sm"
                class="pet_table"
                stacked
                :items="items"
                :fields="fields"
              >
                <template v-if="editable" v-slot:cell(name)="{ item }">
                  <b-form-input  v-model="item.name" />
                </template>
                <template v-if="editable" v-slot:cell(breed)="{ item }">
                  <b-form-input v-model="item.breed" />
                </template>
                <template v-if="editable" v-slot:cell(type)="{ item }">
                  <b-form-select
                    v-model="item.type"
                    :options="options"
                  ></b-form-select>
                </template>
                <template v-if="editable" v-slot:cell(day_of_birth)="{ item }">
                  <b-form-datepicker
                    placeholder="Seleccionar fecha"
                    close-button
                    reset-button
                    label-close-button="Cerrar"
                    label-reset-button="Limpiar"
                    id="input_day_of_birth"
                    v-model="item.day_of_birth"
                    class="mb-2 "
                    
                  ></b-form-datepicker>
                </template>
                <template v-if="editable" v-slot:cell(day_of_death)="{ item }">
                  <b-form-datepicker
                  close-button
                    reset-button
                    label-close-button="Cerrar"
                    label-reset-button="Limpiar"
                    placeholder="Seleccionar fecha"
                    id="input_day_of_death"
                    v-model="item.day_of_death"
                    class="mb-2"
                  ></b-form-datepicker>
                </template>
                <template v-if="editable" v-slot:cell(pet_number)="{ item }">
                  <b-form-input v-model="item.pet_number" />
                </template>
                <template v-if="editable" v-slot:cell(mother)="{ item }">
                  <b-form-input v-model="item.mother" />
                </template>
                <template v-if="editable" v-slot:cell(father)="{ item }">
                  <b-form-input v-model="item.father" />
                </template>

                <template v-if="editable" v-slot:cell(gender)="{ item }">
                  <b-form-group id="input_gender" label-for="pet_gender_radio">
                    <b-form-radio
                      class="mb-3"
                      v-model="item.gender"
                      name="pet.gender_radio"
                      value="macho"
                      inline
                      >macho</b-form-radio
                    >
                    <b-form-radio
                      class="mb-3"
                      v-model="item.gender"
                      name="pet.gender_radio"
                      value="hembra"
                      inline
                      >hembra</b-form-radio
                    >
                  </b-form-group>
                </template>
              </b-table>
              <div v-if="editable" class="mb-4">
                <b-button
                  class="btn"
                  variant="danger"
                  v-on:click="disableEditing()"
                  ><i class="fa fa-window-close"></i
                ></b-button>
                <b-button class="btn" variant="success" v-on:click="updatePet()"
                  ><i class="fa fa-save"></i
                ></b-button>
              </div>
              <div v-else class="mb-4">
                <b-button
                  class="btn"
                  variant="danger"
                  v-on:click="confirmation()"
                  ><i class="fa fa-trash"></i
                ></b-button>
                <b-button
                  class="btn"
                  variant="warning"
                  v-on:click="enableEditing()"
                  ><i class="fa fa-edit"></i
                ></b-button>
              </div>
            </div>
            <div v-else>
              <br />
              <p>Please click on a pet...</p>
            </div>
          </div>
        </b-tab>
        <!--************************************************** end firt tab*****************************-->

        <b-tab title="Comentarios">
          <Comment :pet-id="this.pet._id"></Comment>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import { AXIOS } from "./http-common";
import Picture from "./Picture";

export default {
  name: "pet",
  components: {
    Picture,
    Comment,
  },
  props: ["pet"],
  data() {
    return {
      items: [this.pet],
      fields: [
        // A column that needs custom formatting
        { key: "name", label: "Nombre" },
        { key: "breed", label: "Raza" },
        { key: "type", label: "Tipo" },
        { key: "day_of_birth", label: "Nacio" },
        { key: "gender", label: "Género" },
        { key: "pet_number", label: "N° de registro" },
        { key: "mother", label: "Madre" },
        { key: "father", label: "Padre" },
        { key: "day_of_death", label: "Murio" },
      ],
      editable: false,
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
    };
  },
  methods: {
    /* eslint-disable no-console */
    updatePet() {
      var data = {
        id: this.pet.id,
        name: this.pet.name,
        breed: this.pet.breed,
        type: this.pet.type,
        day_of_birth: this.pet.day_of_birth,
        day_of_death: this.pet.day_of_death,
        pet_number: this.pet.pet_number,
        mother: this.pet.mother,
        father: this.pet.father,
        gender: this.pet.gender,
      };

      AXIOS.put("/pet/" + this.pet._id, data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.editable = false;
    },
    deletePet() {
      AXIOS.delete("/pet/" + this.pet._id)
        .then((response) => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push("/pets").catch((err) => {
            console.log(err);
          });
        })
        .catch((e) => {
          console.log(e.response);
        });
    },

    disableEditing() {
      this.editable = false;
    },
    enableEditing() {
      this.editable = true;
    },
    confirmation() {
      let r = confirm("¿Desea borrar esta mascota?");
      if (r == true) {
        this.deletePet();
        return true;
      } else {
        return false;
      }
    },
    /* eslint-enable no-console */
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.title_pet {
  font-size: 3em;
}
.fa {
  font-size: 2em;
  color: black;
}
.btn {
  margin: 1vh;
}
.b-card {
  background: linear-gradient(
    90deg,
    rgba(20, 100, 152, 0.7) 50%,
    rgba(219, 243, 248, 0.6) 100%
  );
}
@media only screen and (max-width: 768px) {
  .pet_table {
    font-size: 0.8em;
    margin: 5vh 0vh;
    display:grid;
  }
  input {
    width: 100% !important;
  }

  #input_day_of_birth__outer_ ,#input_day_of_death__outer_ {
    font-size: 0.65em;
  }

}
</style>
<style>
 .b-form-btn-label-control.form-control > .dropdown-menu {
   margin: 10vh !important;
 }
</style>