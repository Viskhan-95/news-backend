const Comment = require("../models/Comments.model");

module.exports.commentsController = {
    fetchComments: async (req, res) => {
        const { id } = req.body;

        try {
            const comments = await Comment.findById({news:id});
            
            res.json(comments);

        } catch (err) {
            res.json ({
                error: "ошибка при получении комментарий " + err.toString()
            });
        }
    },
    createComment: async (req, res) => {
        const { news } = req.body;
        const { textComment } = req.body;
        const { user } = req.body;

        try {
            const comment = await Comment.create({
                news,
                user,
                textComment,
            });

            res.json(comment);

        } catch (err) {
            res.json ({
                error: "ошибка при создании комментарии " + err.toString()
            });
        }
    },
    updateComment: async (req, res) => {
        const { id } = req.params;

        try {
            await Comment.findByIdAndUpdate(id);

            res.json("comment updated");

        } catch (err) {
            res.json({
                error: "ошибка при обновлении комментарии " + err.toString()
            });
        }
    },
    removeComment: async (req, res) => {
        const { id } = req.params;
        
        try {
            const comment = await Comment.findById(id);

            if(comment.user.toString() === req.user.id) {
                await comment.remove();
            }

            res.json("comment deleted")

        } catch (err) {
            res.json({
                error: "ошибка при удалении комментарии " + err.toString()
            });
        }
    }
}