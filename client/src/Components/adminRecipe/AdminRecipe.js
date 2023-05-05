import React, { useEffect, useState } from "react";
import "./AdminRecipe.scss";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteRecipe,
    getAdminRecipeData,
} from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

function AdminRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");

    const recipeData = useSelector(
        (state) => state.recipeReducer.adminRecipeData
    );

    useEffect(() => {
        dispatch(getAdminRecipeData());
    }, [dispatch]);

    const handleDelete = async (recipeId) => {
        try {
            if (
                window.confirm("Are you sure you want to delete this recipe?")
            ) {
                await dispatch(deleteRecipe(recipeId));
                dispatch(getAdminRecipeData());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredData = recipeData.filter((recipe) => {
        if (categoryFilter && recipe.category !== categoryFilter) {
            return false;
        }
        if (cuisineFilter && recipe.cuisine !== cuisineFilter) {
            return false;
        }
        return true;
    });

    return (
        <div className="AdminRecipe">
            <div className="filter-box">
                <label>
                    Category:
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="appetizer">Appetizer </option>
                        <option value="main course">Main course </option>
                        <option value="dessert">Dessert </option>
                    </select>
                </label>
                <label>
                    Cuisine:
                    <select
                        value={cuisineFilter}
                        onChange={(e) => setCuisineFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="indian">Indian </option>
                        <option value="american">American </option>
                        <option value="italian">italian </option>
                        <option value="mexican">Mexican </option>
                    </select>
                </label>
            </div>
            {filteredData?.map((recipe) => (
                <div key={recipe?._id} className="recipe-box">
                    <h3 className="recipe-name">{recipe?.name}</h3>
                    <div className="recipe-img">
                        <img src={recipe?.image?.url} alt={recipe?.name} />
                    </div>
                    <div className="edit-delete">
                        <button
                            className="edit-btn"
                            onClick={() => navigate(`edit/${recipe._id}`)}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(recipe._id)}
                            className="delete-btn"
                        >
                            <MdDeleteForever />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminRecipe;
