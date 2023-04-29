const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        cuisine: {
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
            ref: "user",
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("recipe", recipeSchema);
