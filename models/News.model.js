const { default: mongoose } = require("mongoose");

const newsSchema = mongoose.Schema({
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    textNews: {
        type: String,
        required: true,
    },
    dateOfCreation: {
        type: Date,
        timestamps: true,
        required: true,
    }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;