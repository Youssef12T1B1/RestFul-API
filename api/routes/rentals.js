const express = require('express')
const router = express.Router()

const ensureAuthenticated = require('../auth/ensureAuthenticated')
const rental = require('../controllers/rentals')




router.get('/',ensureAuthenticated, rental.rental_getall)
router.post('/',ensureAuthenticated , rental.rental_add)
router.get('/:id', ensureAuthenticated, rental.rental_getOne )
router.delete('/:id',ensureAuthenticated, rental.rental_delete)

module.exports = router