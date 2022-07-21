const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

module.exports.usersController = {
    fetchUsers: async (req, res) => {   //получить список пользователей сможет admin
        try {
            const users = await User.find();

            res.json(users);

        } catch (err) {
            res.status(401).json({
                error: "ошибка при получении списка пользователей " + err.toString()
            })
        }
    },

    registerUser: async (req, res) => {     //регистрация пользователя
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.errors[0].msg
                });
            }
            const { firstName, lastName, email, login, password, role } = req.body;
            const candidate = await User.findOne({ login });

            if (candidate) {
                return res.status(400).json({error:"логин уже занят"});
            }

            const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

            const user = await User.create({
                firstName,
                lastName,
                email,
                login,
                password: hash,
                role
            });

            res.json(user);

        } catch (err) {
            return res.status(400).json({
                error: "ошибка при регистрации:" + err.message
            });
        }
    },

    login: async (req, res) => { // проверка на правильность введенных пользователем данных
        try {
            const { login, password } = req.body;

            const candidate = await User.findOne({ login });

            if (!candidate) {
                return res.status(401).json({ error: 'Неверный логин или пароль' });
            }

            const valid = await bcrypt.compare(password, candidate.password);

            if (!valid) {
                return res.status(401).json({ error: 'Неверный логин или пароль' });
            }

            const payload = {
                id: candidate._id,
                login: candidate.login,
                role: candidate.role,
            }

            const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, { 
                expiresIn: '12h'
            })

            res.json({ token, user: payload.id });

        } catch (err) {
            res.status(401).json({
                error: "ошибка при проверке логина и пароля"
            })
        }
    },

    updateUser: async (req, res) => { // обновление данных пациента
        try {
            const { firstName, lastName, email, login, password, role } = req.body;
            const { id } = req.params;
            const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

            await User.findByIdAndUpdate(id, {
                lastName,
                firstName,
                email,
                login,
                password: hash,
                role,
            });

            res.json("Данные изменены")

        } catch (err) {
            res.status(401).json({
                error: "ошибка при изменении данных пользователя " + err.toString()
            });
        }
    },
    removeUser: async (req, res) => {   //удаление пользователя, имеет право admin и user
        try {
            const { id } = req.params;

            await User.findByIdAndRemove(id);

            res.json("Пользователь удален")

        } catch (err) {
            res.status(401).json({
                error: "ошибка при удалении пользователя " + err.toString()
            });
        }


    }
}