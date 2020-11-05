const {Router} = require('express');
const router = Router();
var fs = require('fs'); 
var Parse = require('./gramatica');
var Tree = require('./Arbol')

router.get('/', (req, res) => res.json({message: 'Hello world'}));

module.exports = router;