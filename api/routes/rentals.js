const express = require('express')
const router = express.Router()


router.get('/', (req,res, next)=>{
    res.status(200).json({
        message: 'rentals were fetched'
    })
})

router.post('/', (req,res, next)=>{
    res.status(201).json({
        message: 'rentals was created'
    })
})

router.get('/:id', (req,res, next)=>{
    const id = req.params.id
    res.status(200).json({
        message: 'Handling a single movie rental',
        id: id 
    })
})

router.patch('/:id', (req,res, next)=>{

    res.status(200).json({
        message: 'Updated rental',
        
    })
})
router.delete('/:id', (req,res, next)=>{

    res.status(200).json({
        message: 'deleted rental',
        
    })
})
module.exports = router