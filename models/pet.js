const mongoose = require("mongoose");

let validTypes = {
    values:['PERRO','GATO','GALLINA','PALOMA','CONEJO','PAJARO','PATO','OTROS'],
    message: '{VALUE} not valid'
}

let Schema = mongoose.Schema;

let petSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  type: {
    type: String,
    default: 'OTHER',
    required: true, 
    enum: validTypes
  },
  day_of_birth: {
    type: String,
  }, 
  day_of_death: {
    type: String,
  },
  pet_number: {
    type: String,
  },
  mother: {
    type: String,
  },
  father: {
    type: String,
  },
  gender: {
    type: String,
  },
  created_by:{
    type: String,
    required: true
  },
  breed: {
    type: String,
  },
  profile_picture:{
    type: String
  }

});
// const crud = (module.exports = mongoose.model("crud", petSchema));

petSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    
    return userObject;
}

module.exports = mongoose.model('Pet', petSchema);
