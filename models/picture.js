const mongoose = require('mongoose');



let Schema = mongoose.Schema;

let pictureSchema = new Schema({
    url_pic: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    pet_id: {
        type: String, 
        required: true, 
    }

});

pictureSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();

    return userObject;

}



module.exports = mongoose.model('Picture', pictureSchema);