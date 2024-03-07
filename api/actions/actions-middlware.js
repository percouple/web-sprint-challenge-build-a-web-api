// add middlewares here related to actions
const Actions = require('./actions-model')

function validateAction (req, res, next) {
    console.log("Validating action object")
    // if (req.method === 'PUT' && !Object.keys(req.body).includes(('completed'))) {
    //     return res.status(400).json({ message: "Completed status required for updating a action" });
    // }
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        return res.status(400).json({ message: `Name and description are required for ${req.method === 'PUT' ? 'updating a ' : 'a '} action` });
    }
    // If validation passes, call next() to proceed to the next middleware
    next();
}

module.exports = {
    validateAction: validateAction
}