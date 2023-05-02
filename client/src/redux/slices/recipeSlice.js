import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";

export const getRecipeData = createAsyncThunk(
    "admin/getRecipeData",
    async () => {
        try {
            const response = await axiosClient.get("/admin");
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const updateRecipe = createAsyncThunk(
    "admin/updateRecipe",
    async (body) => {
        try {
            const response = await axiosClient.put("/admin/", body);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const deleteRecipe = createAsyncThunk(
    "admin/deleteRecipe",
    async (recipeId) => {
        try {
            const response = await axiosClient.delete(`/admin/${recipeId}`);
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const getOneRecipe = createAsyncThunk(
    "admin/getOneRecipe",
    async (recipeId) => {
        try {
            const response = await axiosClient.get(
                `/admin/getRecipe/${recipeId}`
            );
            return response.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

const recipeSlice = createSlice({
    name: "recipeSlice",
    initialState: {
        recipeData: [],
        oneRecipe: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecipeData.fulfilled, (state, action) => {
                state.recipeData = action.payload;
            })
            .addCase(getOneRecipe.fulfilled, (state, action) => {
                state.oneRecipe = action.payload;
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
                state.oneRecipe = action.payload;
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.recipeData = state.recipeData.filter(
                    (recipe) => recipe.id !== action.payload
                );
            });
    },
});

export default recipeSlice.reducer;
