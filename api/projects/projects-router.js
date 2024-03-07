// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProject, verifyId } = require('./projects-middleware');

router.get('/', async (req, res, next) => {
    await Projects.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    
    await Projects.get(id)
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

router.post('/', validateProject, async (req, res, next) => {
    console.log("Running throug hrouter")
    await Projects.insert(req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
})

router.put('/:id', validateProject, async (req, res, next) => {
    const id = req.params.id;
    await Projects.update(id, req.body)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(next)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    await Projects.remove(id)
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

router.get('/:id/actions', async (req, res, next) => {
    const id = req.params.id;
    await Projects.getProjectActions(id)
        .then((result) => {
            // if (!result || result.length === 0) {
            //     const error = new Error('No project with given id');
            //     error.status = 404;
            //     throw error;
            // }
            res.status(200).json(result);
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