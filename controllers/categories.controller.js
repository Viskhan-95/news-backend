const Categories = require("../models/Category.model");

module.exports.categoriesController = {
    fetchCategories: async (req, res) => {
        try {
            const categories = await Categories.find();
            
            res.json(categories);

        } catch (err) {
            res.status(401).json({
                error: "ошибка при получении категорий " + err.toString()
            });
        }
    },
    createCategory: async (req, res) => {
        const { nameCategory } = req.body;
        
        try {
            const category = await Categories.create({
                nameCategory,
            })
            
            res.json(category);

        } catch (err) {
            res.status(401).json({
                error: "ошибка при создании категории " + err.toString()
            });
        }
    },
    updateCategory: async (req, res) => {
        const { id } = req.params;
        const { nameCategory } = req.body;

        try {
            await Categories.findByIdAndUpdate(id, {
                nameCategory,
            });
            
            res.json("категория обновлена");

        } catch (err) {
            res.status(401).json({
                error: "ошибка при обновлении категории " + err.toString()
            });
        }
    },
    removeCategory: async (req, res) => {
        const { id } = req.params;

        try {
            await Categories.findByIdAndRemove(id);
           
            res.json("категория удалена");

        } catch (err) {
            res.status(401).json({
                error: "ошибка при удалении категории " + err.toString()
            });
        }
    },
}