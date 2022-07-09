const { usersController } = require("../controllers/users.controller");
const { Router } = require("express");
const { check } = require("express-validator"); //установил библиотеку для проверки введенных данных в input
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const route = Router();

//получить список пользователей может только admin, а изменить или добавить admin или user, автора регистрирует admin
route.get("/users/fetch", authMiddleware, roleMiddleware(["admin"]), usersController.fetchUsers);
route.post("/login", usersController.login);
route.post("/user/add", [
    check("login", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть больше 4 и меньше 10 символов").isLength({min: 4, max: 10}),
    check("email", "Неверный email").normalizeEmail().isEmail()
], usersController.registerUser);
route.patch("/user/update/:id", authMiddleware, roleMiddleware(["user", "admin"]), usersController.updateUser);
route.delete("/user/delete/:id", authMiddleware, roleMiddleware(["user", "admin"]), usersController.removeUser);

module.exports = route;