const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
    news: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "News",
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    textComment: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;