const controller = require('../../controllers/user/user.controller');

module.exports = (app) => {
    app.get('/getUser', controller.getUser)
}