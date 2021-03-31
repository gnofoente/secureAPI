const UsersController = require('./controllers/users.controller.js');

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);

    app.get('/users/:id', [
        UsersController.getById
    ]);

    app.get('/users', [
        UsersController.list
    ])

    app.patch('/users/:id', [
        UsersController.patchById
    ]);

    app.delete('/users/:id', [
        UsersController.removeById
    ]);
}