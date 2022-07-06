const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    login: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;