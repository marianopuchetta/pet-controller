
//  module.exports = app
const express = require('express');
const app = express();
// Import model
const Picture = require('../models/picture');
const Pet = require('../models/pet');

const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
});
const parser = multer({ storage: storage });

app.post('/upload/:user_id/:petId', parser.single("image"), (req, res) => {

   const image = {};
  url = req.file.path;
  image.id = req.file.public_id;

  let { user_id, petId } = req.params;

  let newPicture = new Picture({
    created_by: user_id,
    pet_id: petId,
    url_pic: url
  });
  newPicture.save((err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    
    let data = {
      id: petId,
      profile_picture: url

    };
console.log(url)
    Pet.findByIdAndUpdate(petId, data,
        (err, petDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
           console.log(petDB) 
        });
        

    res.json(newPicture);
  });

});

app.get('/profilePicture/:user_id/:petId', (req, res) => {

  let { user_id, petId } = req.params;

  Picture.find({ $and: [{ pet_id: petId }, { created_by: user_id }] }, (err, picture) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Prueba de nuevo luego'
        }
      });
    }

    
    res.json({
      ok: true,
      picture
    })

  })

})

app.delete('/deletePicture/:id',(req,res)=>{

  let id = req.params.id;

  Picture.findByIdAndRemove(id,(err,pictureRemodev)=>{
    if(err){
      return res.status(400).json({
        ok: false,
        err:{
          message:'try again later'
        }
      });
    }
    res.json({
      ok: true,
      picture: pictureRemodev
    })
  })

})
module.exports = app


