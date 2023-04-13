import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipes from "./pages/SaveRecipes";
import Navbar from "./components/Navbar";
import { Auth } from "./pages/Auth";

function App() {
  // http://localhost:3003/auth/login

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
