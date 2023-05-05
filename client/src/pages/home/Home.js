import React, { useEffect, useState } from "react";
import "./Home.scss";
import NavBar from "../../Components/navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeData } from "../../redux/slices/recipeSlice";
import RecipeBox from "./recipeBox/RecipeBox";

function Home() {
    const dispatch = useDispatch();

    const [categoryFilter, setCategoryFilter] = useState("");
    const [cuisineFilter, setCuisineFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [recipe, setRecipe] = useState();
    const [openRecipeBox, setOpenRecipeBox] = useState(false);

    const recipeData = useSelector((state) => state.recipeReducer.recipeData);

    useEffect(() => {
        dispatch(getRecipeData());
    }, [dispatch]);

    const filteredData = recipeData.filter((recipe) => {
        if (categoryFilter && recipe.category !== categoryFilter) {
            return false;
        }
        if (cuisineFilter && recipe.cuisine !== cuisineFilter) {
            return false;
        }
        if (
            searchQuery &&
            !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }
        return true;
    });

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="Home">
            <NavBar onSearch={handleSearch} />

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

            <div className="recipes">
                {filteredData?.map((recipe) => (
                    <div
                        key={recipe._id}
                        className="recipe"
                        onClick={() => {
                            setOpenRecipeBox(!openRecipeBox);
                            setRecipe(recipe);
                        }}
                    >
                        <div className="recipe-img">
                            <img src={recipe.image.url} alt={recipe.name} />
                        </div>

                        <div className="recipe-name">{recipe.name}</div>
                    </div>
                ))}
                {openRecipeBox && (
                    <RecipeBox
                        closeRecipeBox={() => setOpenRecipeBox(false)}
                        recipe={recipe}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;
