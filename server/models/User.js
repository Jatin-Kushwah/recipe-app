const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        recipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "recipe",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userSchema);
