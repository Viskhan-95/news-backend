const jwt = require("jsonwebtoken");

module.exports = function (roles) {
    return function (req, res, next) {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(401).json({
                    error: "У вас нет доступа"
                })
            }
            next();
        } catch (err) {
            return res.status(401).json({
                error: "Ошибка авторизации: "
            });
        }
    }
}