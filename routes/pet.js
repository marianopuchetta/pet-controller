// Import express
const express = require('express');
const { checkAuth } = require('../middlewares/auth');
const app = express();



// Import model
const Pet = require('../models/pet');


//GET all pet
app.get('/pets/:id' ,(req, res) => {

    let id = req.params.id;

    let from = req.query.from || 0;
    let until = req.query.until || 100;

    from = Number(from);
    until = Number(until);

    Pet.find({ created_by: id })
        .skip(from)
        .limit(until)
        .exec((err, petDB, _id) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json(petDB);
        });
});

//GET pet by id
app.get('/pet/:id', (req, res) => {
    let id = req.params.id;
    Pet.findById(id, (err, petDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            pet: petDB
        }
        );
    });
});


//ADD pet
app.post('/pet/add', (req, res) => {
    //busca si hay un pet_number igual con ese created_by id
    Pet.find({ $and: [{ pet_number: req.body.pet_number }, { created_by: req.body.created_by }] }, (err, pet) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'Prueba de nuevo luego'
                }
            });
        }

        //si no hay pet lo guarda
        if (pet.length === 0) {
            let body = req.body;
            let newpet = new Pet({
                name: body.name,
                breed: body.breed,
                type: body.type,
                day_of_birth: body.day_of_birth,
                day_of_death: body.day_of_death,
                pet_number: body.pet_number,
                mother: body.mother,
                father: body.father,
                gender: body.gender,
                created_by: body.created_by,
                profile_picture : body.profile_picture
            });

            newpet.save((err) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Prueba de nuevo luego'
                        }
                    });
                }
                res.json(newpet);
            });
        }else {
            return res.status(400).json({
                ok: false,
                err : {
                    message: 'Número de registro debe ser unico'
                }
            });
        }
    })



});

//UPDATE pet
app.put('/pet/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;
    let update = body;

    Pet.findByIdAndUpdate(id, update,
        (err, petDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                pet: petDB
            }
            );
        });
});

//DELETE pet
app.delete('/pet/:id', (req, res) => {
    let id = req.params.id;

    Pet.findByIdAndRemove(id, (err, petRemoved) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            pet: petRemoved
        });
    });
})

//search pet
app.post('/search', (req, res) => {
    let {input_search_pet,user_id} = req.body;
    let search_type = req.body.search_type;
    let regex = { '$regex': new RegExp("^" + input_search_pet, "i") };
    Pet.find({$and: [{ [search_type]: regex }, { created_by: user_id }] }, (err, pet) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }
        if (pet.length === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'SIN RESULTADOS'
                }
            });
        }
        res.json({
            ok: true,
            pet
        })
    })
})
// export app - express
module.exports = app;