const {Schema, model} = require('mongoose');

const collection = 'users';

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: false}
}
)

const userModel = model(collection, userSchema);

module.exports = {userModel}