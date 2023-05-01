import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";
import CreateRecipe from "./Components/createRecipe/CreateRecipe.js";
import EditRecipe from "./Components/editRecipe/EditRecipe.js";
import RequireUser from "./Components/requireUser";
import AdminRecipe from "./Components/adminRecipe/AdminRecipe";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<RequireUser />}>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="" element={<AdminRecipe />} />
                        <Route path="create" element={<CreateRecipe />} />
                        <Route path="edit/:recipeId" element={<EditRecipe />} />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
