const UsersController = require('./controllers/users.controller.js');

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
}