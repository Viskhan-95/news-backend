const Comment = require("../models/Comment.model");

module.exports.commentsController = {
    fetchComments: async (req, res) => {    //получаем комментарии к определенной новости
        const { id } = req.params;

        try {
            const comments = await Comment.findById({news:id});
            
            res.json(comments);

        } catch (err) {
            res.status(401).json ({
                error: "ошибка при получении комментарий " + err.toString()
            });
        }
    },
    createComment: async (req, res) => {    //добавляем новость
        const { news } = req.body;
        const { textComment } = req.body;

        try {
            const comment = await Comment.create({
                user: req.user.id,
                roles: req.user.roles,
                news,
                textComment,
            });

            res.json(comment);

        } catch (err) {
            res.status(401).json ({
                error: "ошибка при создании комментарии " + err.toString()
            });
        }
    },
    updateComment: async (req, res) => {    //изменяем определенную комментарию
        const { id } = req.params;

        try {
            await Comment.findByIdAndUpdate(id);

            res.json("комментарий обновлен");

        } catch (err) {
            res.status(401).json({
                error: "ошибка при обновлении комментарии " + err.toString()
            });
        }
    },
    removeComment: async (req, res) => {    // удаляем определенный комментарий
        const { id } = req.params;
        
        try {
            const comment = await Comment.findById(id);

            if(comment.user.toString() === req.user.id) {
                await comment.remove();
            }

            res.json("комментарий удален")

        } catch (err) {
            res.status(401).json({
                error: "ошибка при удалении комментарии " + err.toString()
            });
        }
    }
}