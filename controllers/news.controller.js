const News = require("../models/News.model");

module.exports.newsController = {
    fetchNews: async (req, res) => {    //получаем новости по определенной категории
        const { id } = req.params;

        try {
            const news = await News.find({category: id});

            res.json(news);

        } catch (err) {
            res.status(401).json({
                error: "ошибка при получении новостей " + err.toString()
            });
        }
    },
    createNews: async (req, res) => {      //создаем новость (новость может создать только автор)
        const { category } = req.body;
        const { author } = req.body;
        const { textNews } = req.body;

        try{
            const news = await News.create({
                author,
                category,
                textNews,
            });

            res.json(news);

        } catch (err) {
            res.json({
                error: "ошибка при добавлении новости " + err.toString()
            });
        }
    },
    updateNews: async (req, res) => {   //обновление новости (новость может обновить только автор или администратор)
        const { id } = req.params;

        try {
            await News.findOneAndUpdate(id);

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