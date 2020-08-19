const express=require('express');

const router = express.Router();
const Post=require('../views/database');

//GET BACK ALL THE POSTS
router.get('/', async (req,res)=>{
    try {
        const citas= await Post.find();
        res.json(citas);
    } catch (err) {
        res.json({message:err});
    }
  });


//SUBMIT A POST
router.post('/', async ( req,res)=>{
   const citas=new Post({
       salon: req.body.salon,
       hour: req.body.hour,
       date: req.body.date,
       description: req.body.description
   });

   try {
         const savedCita = await citas.save();
         res.json(savedCita);       
   } catch (err) {
       res.json({ message:err });
   }

});


//SPECIFIC POST
router.get('/:citaId', async (req,res)=>{

    try {
        const cita= await Post.findById(req.params.citaId);
        res.json(cita);
    } catch (err) {
        res.json({message:err});
    }


})

module.exports=router;