import React from "react";
import "./RecipeBox.scss";
import { BsTag } from "react-icons/bs";
import { MdAccessTimeFilled } from "react-icons/md";
function RecipeBox({ closeRecipeBox, recipe }) {
    return (
        <div className="RecipeBox">
            <div className="blank" onClick={closeRecipeBox}></div>
            <div className="container">
                <div className="left">
                    <img src={recipe.image.url} alt={recipe.name} />
                    <iframe
                        width="90%"
                        height="50%"
                        src={recipe.videoUrl}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>

                <div className="right">
                    <div className="heading">
                        <h2 className="name">{recipe.name}</h2>
                        <p className="cuisine">
                            <BsTag />
                            {recipe.cuisine},
                            <span className="time">
                                <MdAccessTimeFilled />
                                {recipe.cookingTime} mins
                            </span>
                        </p>
                    </div>

                    <div className="instruction">
                        <h3 className="head">Cooking Instructions</h3>
                        <ul className="steps">
                            {recipe.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="ingredients">
                        <h3 className="head">Ingredients</h3>
                        <ul className="list">
                            {recipe.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeBox;
