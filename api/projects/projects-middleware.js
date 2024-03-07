// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProject (req, res, next) {
    console.log("Validating project object")
    if (req.method === 'PUT' && !Object.keys(req.body).includes(('completed'))) {
        return res.status(400).json({ message: "Completed status required for updating a project" });
    }
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ message: `Name and description are required for ${req.method === 'PUT' ? 'updating a ' : 'a '} project` });
    }
    // If validation passes, call next() to proceed to the next middleware
    next();
}

module.exports = {
    validateProject: validateProject
}