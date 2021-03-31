const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
    const user = new User(userData);
    console.log(user);
    return user.save();
};

exports.getById = (id) => {
    return User.findById(id).then(result => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({ _id: id }, userData, { useFindAndModify: false });
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec((err, users) => {
                if (err) reject(err);
                else resolve(users);
            });
    });
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, err => {
            if (err) reject(err);
            else resolve(err);
        });
    });
};