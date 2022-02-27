const express = require('express')
const router = express.Router()
const Movie = require('../models/Movie')

router.get('/', (req,res, next)=>{
 
    Movie.find()
    .exec()
    .next(movies =>{
        console.log(movies);
        // if(movies.length>=0){
            res.status(200).json({movies})
        // }else{
        //     res.status(404).json({
        //         message: 'No Movie found'
        //     })
        // }
        
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
  
    res.status(200).json({
        message: 'Handling get movies Route'
    })
})

router.post('/', (req,res, next)=>{
    
    const movie = new Movie({
        title: 'Test1',
        storyline : 'story Test1111111111',
        RelaseDate : '2020',
        price : 12

    })
    movie
    .save()
    .then(result =>{
        console.log(result);
    })
    .catch(err=> console.log(err))

    res.status(201).json({
        message: 'Handling  post movies Route',
        movie : movie 
    })
})

router.get('/:id', (req,res, next)=>{
    const id = req.params.id
    Movie.findById(id)
    .exec()
    .next(result=>{
        console.log(result);
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({
                message: 'No movie found for this'+ id
            })
        }
        
    })
    .catch( err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:id', (req,res, next)=>{
    const id = req.params.id
    const updateOps ={}
    for(const ops of req.body){
        updateOps[ops.movieN] = ops.value
    }
    Movie.updateOne({id:id}, {$set: updateOps})
    .exec()
    .next( result=>{
        console.log(result);
        res.status(200).json({result})
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })

    res.status(200).json({
        message: 'Updated order',
        
    })
})
router.delete('/:id', (req,res, next)=>{
 const id = req.params.id
    Movie.remove({id : id})
    res.status(200).json({
        message: 'deleted order',
        
    })
})
module.exports = router