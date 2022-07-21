const { Schema, SchemaTypes, model }  = require("mongoose");

const newsSchema = Schema({
    category: {
        type: SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    headerNews: {
        type: String,
        required: true,
    },
    textNews: {
        type: String,
        required: true,
    },
    imageName: String,
    dateOfCreation: {
        type: Date,
        default: Date.now,
        required: true,
    }
});

const News = model("News", newsSchema);

module.exports = News;