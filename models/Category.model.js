const { Schema, model }  = require("mongoose");

const categorySchema = Schema({
    nameCategory: {
        type: String,
        required: true,
        unique: true,
    },
    aboutCategory: {
        type: String,
        required: true,
    },
    nameStaticImage: {
        type: String,
        required: true
    }
});

const Category = model("Category", categorySchema);

module.exports = Category;