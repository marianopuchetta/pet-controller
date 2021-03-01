<template>
  <div>
    <div class="enter_comment">
      <b-form v-on:submit="submitComment">
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Ingrese comentario"
          rows="3"
          max-rows="3"
        ></b-form-textarea>
        <p v-if="this.message !== ''" class="text-danger">{{message}}</p>
        <b-button v-on:click="submitComment" variant="success" class="m-3">Guardar</b-button>
      </b-form>
    </div>
        <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="comments_table"
          size="sm"
        ></b-pagination>
        <b-table
          id="comments_table"
          class="comments_table"
          hover
          :items="comments"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
        >
         <template #cell(created_date)="comments">
            <p class="date_table">{{ comments.item.created_date }}</p
            >
          </template>
          <template #cell(borrar)="comments">
                <i v-on:click="deleteComment(comments.item._id)" class="fa fa-trash"></i> 
          </template>
        </b-table>
      </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapGetters } from "vuex";

export default {
  name: "comment",
  props: ["pet-id"],
  data() {
    return {
      message:'',
       perPage: 10,
      currentPage: 1,
      text: "",
      comments: [],
       fields: [
        // A column that needs custom formatting
       { key: "created_date", label: "Fecha" },
       { key: "comment", label: "comentario" },
        "borrar",
      ],
    };
  },
  methods: {
    submitComment() {
      
      let date = new Date();
      let newDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      let data = {
        text: this.text,
        created_by: this.user_id,
        created_date: newDate,
        pet_id: this.petId,
      };
      AXIOS.post("/savecomment/", data)
        .then((res) => {
          console.log(res.data.comment);
          this.text = '';
          this.showComments();
        })
        .catch((err) => {
          console.log(err.response.data.err.message);
          this.message = err.response.data.err.message
                    setTimeout(() => (this.message = ""), 3000);

        this.text = '';
        });
    },
    showComments() {
      AXIOS.get("/petcomments/", {
        params: {
          created_by: this.user_id,
          pet_id: this.petId,
        },
      })
        .then((res) => {
          console.log(res.data.comment);
          this.comments = res.data.comment;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteComment(id){
      console.log(id)
      AXIOS.delete("/deleteComment/" + id)
        .then((res) => {
          console.log(res);
         this.showComments();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },
  computed: {
    ...mapGetters(["user_id"]),
    rows() {
      return this.comments.length;
    },
  },
  created() {
    this.showComments();
  },
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .overflow-auto {
    display:flex;
    flex-direction: column;
  }
  
  .comments_table{
    font-size: .75em;
    font-weight: 700;
  }
  .date_table{
    font-size: .8em;
  }
}
</style>