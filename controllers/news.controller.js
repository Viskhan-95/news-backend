const News = require("../models/News.model");

module.exports.newsController = {
    fetchNews: async (req, res) => {    //получаем новости по определенной категории
        const { id } = req.params;

        try {
            const news = await News.find().populate("author");

            res.json(news);

        } catch (err) {
            res.status(401).json({
                error: "ошибка при получении новостей " + err.toString()
            });
        }
    },
    createNews: async (req, res) => {      //создаем новость (новость может создать только автор)
        const { headerNews, textNews, } = req.body;
        const { id } = req.params;
        const author = req.user.id;

        try {
            const news = await News.create({
                category: id,
                headerNews,
                textNews,
                imageName: req.file.path,
                author: author,
            });
            res.json({news});

        } catch (err) {
            res.json({
                error: "ошибка при добавлении новости " + err.toString()
            });
        }
    },
    updateNews: async (req, res) => {   //обновление новости (новость может обновить только автор)
        const { category, headerNews, textNews, imageName } = req.body;
        const { id } = req.params;
        const author = req.user.role;

        try {
            await News.findOneAndUpdate(id, {
                category,
                headerNews,
                textNews,
                imageName,
                author,
                dateOfCreation: Date.now
            });

            res.json("новость обновлена")

        } catch (err) {
            res.status(401).json({
                error: "ошибка при обновлении новости " + err.toString()
            });
        }
    },
    removeNews: async (req, res) => {   //удаляем новость (новость может удалить только автор или администратор)
        const { id } = req.params;

        try {
            await News.findByIdAndDelete(id);

            res.status(401).json({
                error: "ошибка при удалении новости " + err.toString()
            });

        } catch (err) {
            res.status(401).json({
                error: "ошибка при удалении новости " + err.toString()
            });
        }
    },
}