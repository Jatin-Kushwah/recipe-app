import React, { useEffect } from "react";
import "./AdminRecipe.scss";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { deleteRecipe, getRecipeData } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

function AdminRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recipeData = useSelector((state) => state.recipeReducer.recipeData);

    useEffect(() => {
        dispatch(getRecipeData());
    }, [dispatch]);

    const handleDelete = async (recipeId) => {
        try {
            if (
                window.confirm("Are you sure you want to delete this recipe?")
            ) {
                await dispatch(deleteRecipe(recipeId));
                dispatch(getRecipeData());
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="AdminRecipe">
            {recipeData?.map((recipe) => (
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
