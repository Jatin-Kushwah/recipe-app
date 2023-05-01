import React, { useState } from "react";
import "./CreateRecipe.scss";
import { axiosClient } from "../../Utils/axiosClient";

const CreateRecipe = () => {
    const [formData, setFormData] = useState({
        name: "",
        cuisine: "",
        ingredients: [],
        steps: [],
        image: "",
        videoUrl: "",
        cookingTime: "",
        category: "",
    });

    const cuisineOptions = [
        { value: "", label: "Select a cuisine" },
        { value: "indian", label: "Indian" },
        { value: "american", label: "American" },
        { value: "italian", label: "Italian" },
        { value: "mexican", label: "Mexican" },
    ];

    const categoryOptions = [
        { value: "", label: "Select a category" },
        { value: "appetizer", label: "Appetizer" },
        { value: "main course", label: "Main course" },
        { value: "dessert", label: "Dessert" },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleIngredientChange = (event, index) => {
        const { value } = event.target;
        const ingredients = [...formData.ingredients];
        ingredients[index] = value;
        setFormData({ ...formData, ingredients });
    };

    const handleStepChange = (event, index) => {
        const { value } = event.target;
        const steps = [...formData.steps];
        steps[index] = value;
        setFormData({ ...formData, steps });
    };

    const handleAddStep = () => {
        const steps = [...formData.steps, ""];
        setFormData({ ...formData, steps });
    };

    const handleAddIngredient = () => {
        const ingredients = [...formData.ingredients, ""];
        setFormData({ ...formData, ingredients });
    };

    const handleRemoveIngredient = (index) => {
        const ingredients = [...formData.ingredients];
        ingredients.splice(index, 1);
        setFormData({ ...formData, ingredients });
    };

    const handleRemoveStep = (index) => {
        const steps = [...formData.steps];
        steps.splice(index, 1);
        setFormData({ ...formData, steps });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosClient.post("/admin/create", {
                ...formData,
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="create-recipe-form" onSubmit={handleSubmit}>
            <div className="name-input simple-input">
                <label className="label" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="image-input simple-input">
                <label className="label" htmlFor="image">
                    Image
                </label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>

            <div className="video-input simple-input">
                <label className="label" htmlFor="videoUrl">
                    Video URL
                </label>
                <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                />
            </div>

            <div className="time-input simple-input">
                <label className="label" htmlFor="cookingTime">
                    Cooking Time
                </label>
                <input
                    type="text"
                    name="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleChange}
                />
            </div>

            <div className="dropdown-input">
                <div className="cuisine-input">
                    <label htmlFor="cuisine">Cuisine</label>
                    <select
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                    >
                        {cuisineOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="category-input ">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="add-remove-input">
                <div className="ingredients-option">
                    <label htmlFor="ingredients">Ingredients</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div className="input-remove-btn" key={index}>
                            <input
                                type="text"
                                name="ingredients"
                                value={ingredient}
                                onChange={(event) =>
                                    handleIngredientChange(event, index)
                                }
                            />
                            <button
                                className="remove-btn"
                                type="button"
                                onClick={() => handleRemoveIngredient(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="add-btn"
                        type="button"
                        onClick={handleAddIngredient}
                    >
                        Add Ingredient
                    </button>
                </div>

                <div className="steps-option">
                    <label htmlFor="steps">Steps</label>
                    {formData.steps.map((step, index) => (
                        <div className="input-remove-btn" key={index}>
                            <input
                                type="text"
                                name="steps"
                                value={step}
                                onChange={(event) =>
                                    handleStepChange(event, index)
                                }
                            />
                            <button
                                className="remove-btn"
                                type="button"
                                onClick={() => handleRemoveStep(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="add-btn"
                        type="button"
                        onClick={handleAddStep}
                    >
                        Add Step
                    </button>
                </div>
            </div>

            <button className="submit-btn" type="submit">
                Create Recipe
            </button>
        </form>
    );
};

export default CreateRecipe;
