const express = require('express')
const router = express.Router()


router.get('/', (req,res, next)=>{

  
    res.status(200).json({
        message: 'Handling get movies Route'
    })
})

router.post('/', (req,res, next)=>{
    res.status(201).json({
        message: 'Handling  post movies Route'
    })
})

router.get('/:id', (req,res, next)=>{
    const id = req.params.id
    res.status(200).json({
        message: 'order details',
        id: id 
    })
})

router.patch('/:id', (req,res, next)=>{

    res.status(200).json({
        message: 'Updated order',
        
    })
})
router.delete('/:id', (req,res, next)=>{

    res.status(200).json({
        message: 'deleted order',
        
    })
})
module.exports = router