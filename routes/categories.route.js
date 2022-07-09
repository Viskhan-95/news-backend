const { Router } = require("express");
const { categoriesController } = require("../controllers/categories.controller");
const roleMiddleware = require("../middlewares/roleMiddleware");

const route = Router();

//получить категории могут все, а изменить или добавить только admin
route.get("/categories/fetch", categoriesController.fetchCategories);
route.post("/category/add", roleMiddleware(["admin"]), categoriesController.createCategory);
route.patch("/category/update/:id", roleMiddleware(["admin"]), categoriesController.updateCategory);
route.delete("/category/remove/:id", roleMiddleware(["admin"]), categoriesController.removeCategory);

module.exports = route;