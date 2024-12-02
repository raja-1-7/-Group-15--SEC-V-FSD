import Navbar from "../components/Navbar"; // Ensure the correct path to Navbar
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Home() {
  return (
    <div>
      {/* Ensure the Navbar component is properly rendered here */}
      <Navbar />
      
      {/* Add other content for the Home component */}
      <div className="home-content">
        <h1>Welcome to FoodHood</h1>
        
        {/* Text that redirects to Recipes Page */}
        <Link to="/recipes">
          <p style={styles.redirectText}>
            Want to cook something? Here’s how...
          </p>
        </Link>
      </div>
    </div>
  );
}


const styles = {
  redirectText: {
    fontSize: "7.5em",
    fontWeight: "bold",
    color: "#ff6347",  // Tomato color
    cursor: "pointer",
    textAlign: "center",
    marginTop: "20px",
    textDecoration: "underline",
    transform: "translateY(70px)",
  },
};
