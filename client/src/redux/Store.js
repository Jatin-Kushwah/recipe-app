import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./slices/recipeSlice";

export default configureStore({
    reducer: {
        recipeReducer,
    },
});
