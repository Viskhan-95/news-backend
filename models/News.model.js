const { default: mongoose } = require("mongoose");

const newsSchema = mongoose.Schema({
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Category",
        require: true,
    },
    news: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    dateOfCreation: {
        String, //или Date?
        require: true,
    }
});

const News = mongoose.model("News", newsSchema);

module.exports = News;