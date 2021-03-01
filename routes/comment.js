const express = require('express');
const app = express();

const Comment = require('../models/comment')

app.get('/petcomments/',(req,res)=>{

    let { created_by, pet_id } = req.query;

    Comment.find({$and: [{ pet_id: pet_id }, { created_by: created_by }] },(err,comment)=>{
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
            comment
          })
    })
})

app.post('/savecomment/',(req,res)=>{
    let{text,created_by,created_date,pet_id} = req.body;
    let newComment = new Comment({
        comment : text,
        pet_id: pet_id,
        created_by: created_by,
        created_date: created_date

    }); if(text === ''){
      return res.status(400).json({
               ok:false,
               err :{
                   message: 'El comentario no puede estar vacio'
               }
           })
   } else {
       newComment.save((err)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err :{
                    message: 'try again later'
                }
            })
        }
    })
   }
  
    res.json(newComment)
})

app.delete('/deleteComment/:id',(req,res)=>{
console.log(req)
    let id = req.params.id;
  
    Comment.findByIdAndRemove(id,(err,commentRemodev)=>{
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
      })
    })
  
  })

// export app - express
module.exports = app;