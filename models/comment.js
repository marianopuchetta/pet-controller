const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment: {
        type: String
    },
    created_by: {
        type: String,
        require:true
    },
    pet_id: {
        type: String,
        require: true
    },
    created_date:{
        type: String
    }
});

commentSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
return userObject;
}

module.exports = mongoose.model('comment',commentSchema);