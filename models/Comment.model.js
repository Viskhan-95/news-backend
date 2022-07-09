const { Schema, SchemaTypes, model }  = require("mongoose");

const commentSchema = Schema({
    news: {
        type: SchemaTypes.ObjectId,
        ref: "News",
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    textComment: {
        type: String,
        required: true
    }
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;