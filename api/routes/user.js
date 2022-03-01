const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/.env').Jwt_key
const ensureAuthenticated = require('../auth/ensureAuthenticated')


router.post('/signup', (req,res,next)=>{
    User.findOne({email: req.body.email})
    .exec()
    .then(user =>{
        if(user){
            res.status(409).json({
                message: 'Email Already used'
            })
        }else{
            bcrypt.hash( req.body.password, 10, (err, hash)=>{
                if(err){
                    return res.status(500).json({
                        error : err
                    }) } else{
                    const user = new User({
                        email : req.body.email,
                        password : hash 
                    })
                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message: 'user Created'
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(201).json({
                            error: err
                        })
                    })
                 
                }
            })
        }
    })
   
})

router.post('/login', (req, res, next)=>{
    User.findOne({ email: req.body.email })
    .exec()
    .then(user =>{
       bcrypt.compare(req.body.password, user.password, (err, result)=>{
           if(err){
               return res.status(401).json({
                   message: 'Auth Failed'
               })
           }
           if(result){
             const token =  jwt.sign({
                   email: user.email,
                   userId : user._id},
                    jwtSecret,  
                    { expiresIn: '1h'}
                     )
                return res.status(200).json({
                    message: 'Login Successful',
                    token: token
                })
           }
           res.status(401).json({
            message: 'Auth Failed'
        })
       })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})



router.delete('/:id',ensureAuthenticated, (req,res,next)=>{
    const id = req.params.id
    User.remove({ _id: id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'User Deleted successfully'
        })
       
    })
    .catch( err=>{
        res.status(500).json({
            message: 'no user with this id: '+ id,
            error: err
        })
    }
        
        )
})




module.exports = router