const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} not valid'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required:[true,'El nombre de usurio es necesario']
    },
    email: {
        type: String,
        unique: true,
        required:[true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria'],
    },
    role: {
        type: String, 
        default: 'USER_ROLE',
        required: true, 
        enum: validRoles
    },
    status: {
        type: Boolean, 
        default: false
    },
    created_at: {
        type: Date, 
        default: Date.now
    },

});

userSchema.methods.toJson = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} Ya esta en uso. Tiene que ser unico'
})

module.exports = mongoose.model('User',userSchema);