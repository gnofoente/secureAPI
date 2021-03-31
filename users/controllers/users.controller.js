const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    console.log(req.body);
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt)
        .update(req.body.password)
        .digest('base64');
    
    req.body.password = salt + '$' + hash;
    req.body.permissionLevel = 1;

    UserModel.createUser(req.body)
    .then((result) => {
        res.status(201).send({ id: result._id });
    })
    .catch((error) => {
        console.log('Fail');
        res.status(201).send(error);
    })
};

exports.getById = (req, res) => {
    UserModel.getById(req.params.id)
    .then(result => {
        res.status(200).send(result);
    })
    .catch(error => {
        console.log('Error');
        res.status(201).send(error);
    });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString(base64);
        let hash = crypto.createHmac('sha512', salt)
            .update(req.body.password)
            .digest('base64');
        req.body.password = salt + '$' + hash;
    }

    UserModel.patchUser(req.params.id, req.body).then(result => {
        res.status(204).send({});
    }).catch(error => {
        res.status(201).send(error);
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    UserModel.list(limit, page).then(result => {
        res.status(200).send(result);
    });
};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.id)
    .then(result => {
        res.status(204).send({});
    });
};
