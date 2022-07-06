const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;