import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login"; // Import Login page
import SignUp from "./pages/SignUp"; // Import SignUp page

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} /> {/* Add Login Route */}
          <Route path="/signup" element={<SignUp />} /> {/* Add SignUp Route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
