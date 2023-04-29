const router = require("express").Router();
const recipeController = require("../controllers/recipeController");
const requireUser = require("../middleware/requireUser");

router.post("/", requireUser, recipeController.createRecipeController);
router.put("/", requireUser, recipeController.editRecipeController);

module.exports = router;
