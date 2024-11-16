const express = require('express');
const router = express.Router();
const Joi = require('joi');



const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    gender: Joi.string().min(3).max(5).required(),
    isAlive: Joi.boolean().required(),
});



let authors = [
    {
        id:1,
        name:"waleed elshafey",
        gender: "man",
        isAlive : true
    },
    {
        id:2,
        name:"ziad",
        gender: "man",
        isAlive : true
    },
    {
        id:3,
        name:"jasseka",
        gender: "woman",
        isAlive : false
    }
]

router.get('/', (req, res) => {
    res.json(authors)
  })
  router.get('/:id', (req, res) => {
    const id = +req.params.id
     const author = authors.find(author => author.id === id)
     if(!author){
        res.status(404).json({msg:"user is not exsit"});
     }
     res.status(200).json(author)
  })

  router.post('/', (req, res) => {
    const {error} = schema.validate(req.body) 
    if(error){
        res.status(400).send(error.details[0].massege)
    }
    const author = {id:authors.length+1,...req.body}
    authors.push(author)
    res.status(201).json(authors)
    
  })

  router.patch('/:id', (req, res) => {
    const id = +req.params.id
    let author = authors.find(author => author.id === id)
    if(!author){
        res.status(404).json({msg:"user is not exsit"});
     }
 author = {...author,...req.body}
 res.status(200).json(author)
  })
  
  router.delete('/:id', (req, res) => {
    const id = +req.params.id
    
   authors = authors.filter(item => item.id != id)

    res.status(200).json({msg:"deleted sucssefully"});


  })



module.exports = router;