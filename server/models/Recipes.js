const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            type: String,
            required: true,
        },
    ],
    steps: [
        {
            type: String,
            required: true,
        },
    ],
    image: {
        publicId: String,
        url: String,
    },
    videoUrl: {
        type: String,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Recipe", recipeSchema);