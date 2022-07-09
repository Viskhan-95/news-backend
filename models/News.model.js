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
    image: String,
    dateOfCreation: {
        type: Date,
        timestamps: true,
        required: true,
    }
});

const News = model("News", newsSchema);

module.exports = News;