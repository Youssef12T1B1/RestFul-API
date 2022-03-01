const express = require('express')
const router = express.Router()

const Rental = require('../models/Rental')
const Movie = require('../models/Movie')




router.get('/', (req,res, next)=>{
   Rental.find()
   .populate('movie','title')
   .exec()
   .then(results=>{
      res.status(200).json({
        count : results.length,
        Rentals : results.map(result =>{
            return{
                movie: result.movie,
                qty : result.qty,
                _id: result._id,
                request:{
                    type: 'GET',
                    url : 'http://localhost:3000/rentals/'+ result._id
                }
            }
       
        })
      
    })
   })
   .catch( err=>{
    console.log(err);
    res.status(500).json({
        error: err
    })
})
})

router.post('/', (req,res, next)=>{
    Movie.findById(req.body.movieId)
    .then(movie =>{
        if(!movie){
            return res.status(404).json({
                message:'Movie not Found'
            })
        }
        const rental = new Rental({
            movie: req.body.movieId,
            qty: req.body.qty
           
        })
         return rental.save()
    })
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Rental Stored',
            CreatedRental:{
                movie: result.movie,
                qty: result.qty,

            },
            request:{
                type:'GET',
                url : 'http://localhost:3000/rentals/'+ result._id
            }
        })
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
  
    
  
})

router.get('/:id', (req,res, next)=>{
    const id = req.params.id
    Rental.findById(id)
    .populate('movie')
    .exec()
    .then(result=>{
        if(!result){
            return res.status(404).json({
                message: 'rental  not Found'
            })
        }
        res.status(200).json({
            result: result,
            request:{
                type:"GET",
                url : 'http://localhost:3000/rentals'

            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })

    }
 
    )
  
})

router.patch('/:id', (req,res, next)=>{

    res.status(200).json({
        message: 'Updated rental',
        
    })
})
router.delete('/:id', (req,res, next)=>{
 Rental.remove({_id: req.params.id})
 .exec()
 .then(result=>{
    res.status(200).json({
        message: 'deleted rental',
       
        request:{
            type:"POST",
            url : 'http://localhost:3000/rentals',
            body: {
                movieId: 'ID', qty:'Number'
            }

        }
        
    })
 })
 .catch(err=>{
    res.status(500).json({
     error: err
        
    })
 })
  
})
module.exports = router