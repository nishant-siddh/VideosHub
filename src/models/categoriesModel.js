import mongoose from 'mongoose';

const categoriesSchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: [true, "Please provide a categoryName"]
    },
})

const Categories = mongoose.models.Categories || mongoose.model('Categories', categoriesSchema);
export default Categories;