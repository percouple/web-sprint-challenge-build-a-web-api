// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const { validateAction } = require('./actions-middlware');

router.get('/', async (req, res, next) => {
    console.log("ROUTING THRU ACTIONS")
    await Actions.get()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    
    await Actions.get(id)
        .then(result => {
            if (!result) {
                const error = new Error('No project with given id');
                error.status = 404;
                throw error;
            }
            res.status(200).json(result);
        })
        .catch(next)
})

router.post('/', validateAction, async (req, res, next) => {
    await Actions.insert(req.body)
    .then(result => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch(next)
})

router.put('/:id', validateAction, async (req, res, next) => {
    const id = req.params.id;
    await Actions.update(id, req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    await Actions.remove(id)
        .then((result) => {
            if (!result) {
                const error = new Error('No project with given id');
                error.status = 404;
                throw error;
            }
            res.status(200).json(req.body);
        })
        .catch(next)
})

// Global error handling middleware
router.use((err, req, res, next) => {
    console.log(`Error status received: ${err.status}`)
    res.status(err.status || 500).json({
        customMessage: "Running through general error handler",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router;