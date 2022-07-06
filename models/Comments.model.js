const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require: true,
    },
    news: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "News",
        require: true,
    },
    comment: {
        type: String,
        require: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;