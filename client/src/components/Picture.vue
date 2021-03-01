<template>
  <div class="container">
      <div v-if="this.profile_picture" class="uploading-image">
        <img :src="this.profile_picture" class="image" />
        <b-button
          variant="danger"
          @click="deleteProfilePicture"
          class="ml-2 mr-2"
          ><i class="fa fa-trash"></i
          ></b-button
        >
      </div>

      <div v-else class="uploading-image">
        <img :src="this.previewImage" class="image" />
        <div>
          <input
            v-if="previewImage === null"
            type="file"
            class="input_picture"
            accept="image/jpeg"
            @change="uploadImage"
          />
          <div class="buttons">
            <b-button v-if="this.previewImage" 
          variant="success" 
          @click="onUpload" 
          class="mr-2"
          
            ><b-spinner v-if="loading" small></b-spinner><i class="fa fa-save"></i
          ></b-button
          >
          <b-button v-if="this.previewImage"
            variant="danger"
            @click="previewImage = null"
            class="mr-2"
            ><i class="fa fa-trash"></i
          ></b-button
          > 
          </div>

        </div>
      </div>
  </div>
</template>

<script>
import { AXIOS } from "./http-common";
import { mapGetters } from "vuex";

export default {
  name: "imageUpload",
  props: ["pet-id"],
  data() {
    return {
      loading:false,
      previewImage: null,
      image: null,
      profile_picture: null,
      picture_id: "",
    };
  },
  methods: {
    uploadImage(e) {
      this.image = e.target.files[0];
      this.previewImage = URL.createObjectURL(this.image);
      console.log(this.user_id);
      console.log(this.petId);
    },
    onUpload() {
      this.loading = true;
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("name", this.image.name);
      AXIOS.post(
        "/upload/" + this.user_id + "/" + this.petId,
        formData
      )
        .then((res) => {
          this.profile_picture = res.data.url_pic;
         this.loading = false;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    showProfilePicture() {
      try {
        AXIOS.get(
          "/profilePicture/" +
            this.user_id +
            "/" +
            this.petId
        )
          .then((res) => {
            this.profile_picture = res.data.picture[0].url_pic;
            this.picture_id = res.data.picture[0]._id;
          })
          .catch((err) => {
            console.log(err.response);
          });
      } catch (error) {}
    },
    deleteProfilePicture() {
      AXIOS.delete("/deletePicture/" + this.picture_id)
        .then((res) => {
          console.log(res);
          this.profile_picture = null;
          this.previewImage = null;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  computed: {
    ...mapGetters(["user_id"]),
  },
  created() {
    this.showProfilePicture();
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.image {
  height: 250px;
  border: 2px solid black;
  display: flex;
  flex-flow: row nowrap;
   width: 30% !important;
   margin:4vh 0;
}
.uploading-image {
  display: flex;
  flex-flow: column nowrap;
    justify-content: center;
  align-items: center;
}
.input_picture {
  height: 20%;
}
.buttons {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.mr-2 {
  display: flex;
  margin: 1vh;
  color:black;
  font-size: 1em;
}
@media only screen and (max-width: 768px) {
.input_picture {
  width: 58% !important;
  height: 20%;
}
.spinner{
  width: 50%;
}
.image{
  height: 200px;
  width: 100% !important;
}
}
 
</style>