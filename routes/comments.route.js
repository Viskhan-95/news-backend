const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const route = Router();

//получить комментарии могут все, а изменить или добавить только зарегистрированный
route.get("/comments/fetch/:id", commentsController.fetchComments);
route.post("/comments/add", authMiddleware, commentsController.createComment);
route.patch("/comments/update/:id", authMiddleware, commentsController.updateComment);
route.delete("/comments/remove/:id", authMiddleware, commentsController.removeComment);

module.exports = route;