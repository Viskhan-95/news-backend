const { Router } = require("express");
const { categoriesController } = require("../controllers/categories.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const route = Router();

//получить категории могут все, а изменить или добавить только admin
route.get("/categories/fetch", categoriesController.fetchCategories);
route.post("/category/add", authMiddleware, roleMiddleware(["admin"]), categoriesController.createCategory);
route.patch("/category/update/:id", authMiddleware, roleMiddleware(["admin"]), categoriesController.updateCategory);
route.delete("/category/delete/:id", authMiddleware, roleMiddleware(["admin"]), categoriesController.removeCategory);

module.exports = route;