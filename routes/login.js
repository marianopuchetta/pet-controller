const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const user = require('./../models/user');
const bodyParser = require('body-parser');
const app = express();


app.post('/login', (req,res) => {
    console.log('login')
    let body = req.body;
 
    
         User.findOne({ email: body.email}, (err, userDB)=>{
        if(err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }
        //check if the entered user exist
        if(!userDB){
            return res.status(400).json({
                ok:false,
                err: {
                    message: "email or password incorrect"
                }
            })
        }
        
        //check password
        if(!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                err:{
                    message: "email or password incorrect"
                }
            })
        }

        //generate the authentication token
        let token = jwt.sign({
            user : userDB,
        },process.env.SEED_AUTHENTICATION, {
            expiresIn: process.env.TOKEN_EXPIRATION
        })
        res.json({
            ok: true,
            userDB,
            token:token
        })
    })
    
 
});

module.exports = app;

