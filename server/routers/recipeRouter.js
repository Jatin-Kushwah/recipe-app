const router = require("express").Router();
const recipeController = require("../controllers/recipeController");
const requireUser = require("../middleware/requireUser");

router.post("/", requireUser, recipeController.createRecipeController);
router.put("/", requireUser, recipeController.editRecipeController);
router.delete("/", requireUser, recipeController.deleteRecipeController);
router.get("/", recipeController.getAllRecipe);
router.get(
    "/getRecipe/:recipeId",
    requireUser,
    recipeController.getOneRecipeController
);

module.exports = router;
