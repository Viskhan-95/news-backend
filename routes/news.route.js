const { Router } = require("express");
const { newsController } = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const fileMiddleWare = require("../middlewares/fileMiddleWare");

const route = Router();

//получить новости могут все, а изменить или добавить только автор новости
route.get("/news/fetch", newsController.fetchNews);
route.post("/news/create/:id", authMiddleware, fileMiddleWare.single("svg"), roleMiddleware(["author"]), newsController.createNews);
route.patch("/news/update/:id", authMiddleware, roleMiddleware(["author"]), newsController.updateNews);
route.delete("/news/remove/:id", authMiddleware, roleMiddleware(["author"]), newsController.removeNews);


module.exports = route;