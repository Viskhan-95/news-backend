const { default: mongoose } = require("mongoose");

const newsSchema = mongoose.Schema({
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
        required: true,
    },
    news: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    dateOfCreation: {
        type: Date,
        required: true,
        timestamps: true,
    }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;