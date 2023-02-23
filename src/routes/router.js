const express = require('express')
const router = express.Router();
const { searcMovies, movieCreateRender, newMovie, movieDetailRender, movieEditRender, movieEdit, movieDelete } = require('../contollers/controller')
const protegerRuta = require('../../middleware/protegerRuta')

router.get('/', searcMovies)

router.get('/movies/movieCreate', protegerRuta, movieCreateRender)
router.post('/movies/movieCreate', newMovie)

router.get('/movies/movieDetail/:id', movieDetailRender)

router.get('/movies/movieEdit/:id', protegerRuta, movieEditRender)
router.post('/movies/movieEdit/:id', movieEdit)
router.post('/movies/:id', movieDelete)


module.exports = router;