import React, { useEffect } from "react";
import "./AdminRecipe.scss";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeData } from "../../redux/slices/recipeSlice";
import { useNavigate } from "react-router-dom";

function AdminRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const recipeData = useSelector((state) => state.recipeReducer.recipeData);

    useEffect(() => {
        dispatch(getRecipeData());
    }, [dispatch]);

    // console.log(recipeData);

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
                        <button className="delete-btn">
                            <MdDeleteForever />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminRecipe;
