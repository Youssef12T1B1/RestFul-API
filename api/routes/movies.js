const { json } = require('body-parser')
const express = require('express')
const { request } = require('../../app')
const router = express.Router()
const multer = require('multer')
const Movie = require('../models/Movie')

const storage = multer.diskStorage({
 destination : function(req, file, cb){
    cb(null, './Images/')

 },
 filename : function(req,file,cb){
     cb(null,  Date.now() + file.originalname)
 }
})

const fileFilter = (req,file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error('jpg or png images only'), false)
    }

}

const upload = multer({storage: storage,
    limits: {
    fileSize: 1024 * 1024 *3},
    fileFilter: fileFilter
})

router.get('/', (req,res, next)=>{
 
    Movie.find()
    .select('title price poster') //select('-__v')
    .exec()
    .then(movies =>{
           const response = {
               count : movies.length,
               ExistedMovies: movies.map(movie=>{
                   return{
                       title : movie.title,
                       price: movie.price,
                       poster: movie.poster,
                       request: {
                           type:'GET',
                           url: 'http://localhost:3000/movies/'+ movie._id

                       }
                   }
               })
               
           }
            res.status(200).json({response})
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
  
    
})

router.post('/',upload.single('poster'), (req, res, next)=>{
   // console.log(req.file);
    const movie = new Movie({
        title: req.body.title,
        storyline :  req.body.storyline,
        relaseDate :  req.body.relaseDate,
        price :  req.body.price,
        poster: req.file.path

    })
    movie
        .save()
        .then(result =>{
                console.log(result);
                res.status(201).json({
                    message:'Created Movie successfully',
                    CreatedMovie : {
                        title: result.title,
                        price: result.price,
                        request: {
                            type:'GET',
                            url: 'http://localhost:3000/movies/'+ result._id
 
                        }
                    }
                })
            })
        .catch(err=> {
            console.log(err)
            res.status(500).json({
                error: err
            })
        
        })
    
  

  
})

router.get('/:id', (req,res, next)=>{
    const id = req.params.id
    Movie.findById(id)
    .exec()
    .then(result=>{
        console.log(result);
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({
                message: 'No movie found for this Id :'+ id
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

    Movie.updateOne({_id: id}, {$set: updateOps})
    .then( result=>{
        console.log(result);
        res.status(200).json({
            message: 'Movie Updated',
            request: {
                type:'GET',
                url: 'http://localhost:3000/movies/'+ id

            }
            

        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })

   
})

router.delete('/:id', (req,res, next)=>{
 const id = req.params.id
 Movie.remove({ _id: id})
 .exec()
 .then(result=>{
    res.status(200).json({
        message: 'Movie Deleted',
        request: {
            type:'POST',
            url: 'http://localhost:3000/movies',
            body: { name: 'String' , storyline: 'String',relaseDate: 'String',price: 'Number'}

        }
    })
 })
 .catch(err=>{
     console.log(err);
     res.status(500).json({
         error: err
     })
 })
   
})
module.exports = router