const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { success, error } = require("../Utils/responseWrap");
const cloudinary = require("cloudinary").v2;

const createRecipeController = async (req, res) => {
    try {
        const {
            name,
            ingredients,
            steps,
            image,
            videoUrl,
            cookingTime,
            category,
        } = req.body;

        if (
            !name ||
            !ingredients ||
            !steps ||
            !image ||
            !cookingTime ||
            !category
        ) {
            return res.send(error(400, "All fields are required"));
        }

        const cloudImg = await cloudinary.uploader.upload(image, {
            folder: "recipeImg",
            resource_type: "auto",
        });

        const owner = req._id;

        const user = await User.findById(owner);

        const recipe = await Recipe.create({
            name,
            ingredients,
            steps,
            image: {
                publicId: cloudImg.public_id,
                url: cloudImg.url,
            },
            videoUrl,
            cookingTime,
            owner,
            category,
        });

        user.recipes.push(recipe._id);
        await user.save();

        return res.send(success(201, recipe));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

const editRecipeController = async (req, res) => {
    try {
        const {
            recipeId,
            name,
            ingredients,
            steps,
            image,
            videoUrl,
            cookingTime,
            category,
        } = req.body;

        if (
            !name ||
            !ingredients ||
            !steps ||
            !image ||
            !cookingTime ||
            !category
        ) {
            return res.send(error(400, "All fields are required"));
        }

        // const recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.send(error(404, "Recipe not found"));
        }

        const cloudImg = await cloudinary.uploader.upload(image, {
            folder: "recipeImg",
            resource_type: "auto",
        });

        recipe.name = name;
        recipe.ingredients = ingredients;
        recipe.steps = steps;
        recipe.videoUrl = videoUrl;
        recipe.cookingTime = cookingTime;
        recipe.category = category;
        recipe.image = {
            publicId: cloudImg.public_id,
            url: cloudImg.url,
        };

        await recipe.save();

        return res.send(success(200, recipe));
    } catch (err) {
        return res.send(error(500, err.message));
    }
};

module.exports = {
    createRecipeController,
    editRecipeController,
};
