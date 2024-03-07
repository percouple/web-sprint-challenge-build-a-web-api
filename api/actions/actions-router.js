// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

router.get('/', (req, res) => {
    console.log("ROUTING THRU ACTIONS")
})

router.get('/:id', async (req, res) => {

})

router.post('/', async (req, res) => {

})

router.put('/:id', async (req, res) => {
    
})

router.delete('/', async (req, res) => {

})

module.exports = router;