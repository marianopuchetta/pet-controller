// Import express
const express = require('express');
const user = require('../models/user');
const app = express();
const bcrypt = require('bcryptjs');

const {checkAuth,checkRole} = require('../middlewares/auth');


// Import model
const User = require('../models/user');

//GET all users
app.get('/users',[checkAuth,checkRole],(req, res) => {
    console.log('users')
    let from = req.query.from || 0;
    let until = req.query.until || 30;

    from = Number(from);
    until = Number(until);

    User.find()
        .skip(from)
        .limit(until)
        .exec((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'Something happened. Try again later.'
                    }
                });
            }
            res.json( userDB);
        });
});

//GET user by id
app.get('/user/:id',[checkAuth,checkRole], (req, res) => {
   
    User.findById(req.params.id, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            user : userDB
        });
    });
});

//ADD user
app.post('/user/add',[checkAuth,checkRole], (req, res) => {
        let body = req.body;

    let newUser = new User({
        username: body.username,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status,
        role: body.role
    });
    if(newUser.password !== ''){
          newUser.save((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json(newUser);
    });
    }else {
        res.json({
            ok: false,
            err
        })
    }
  
});

//UPDATE user
app.put('/user/:id',[checkAuth,checkRole], (req, res) => {

    let id = req.params.id;
    let body = req.body;
    

    let update = body;

    User.findByIdAndUpdate(id, update, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: update
        });
    });
});

//DELETE user
app.delete('/user/:id',[checkAuth,checkRole], (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, userRemoved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userRemoved})
    });
})


// export app - express
module.exports = app;