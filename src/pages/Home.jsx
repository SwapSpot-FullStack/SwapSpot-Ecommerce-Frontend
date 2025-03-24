import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import featuredImg from "../assets/placeholder.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="main-content">
        {/* Featured Section */}
        <div className="featured">
          <h2 className="pill-label">Featured</h2>
          <div className="featured-card">
            <img
              src={featuredImg}
              alt="Winter Jacket"
              className="featured-image"
            />
            <div>
              <p>Check out this sick winter jacket!</p>
              <Link
                to="/listings/4"
                className="pill-button"
                style={{ marginTop: "1rem" }}
              >
                View More
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories">
          <h2 className="pill-label">Categories</h2>
          <div className="category-grid">
            <Link
              to="/listings?category=Electronics"
              className="category-button"
            >
              Electronics
            </Link>
            <Link to="/listings?category=Fashion" className="category-button">
              Fashion
            </Link>
            <Link to="/listings?category=Outdoors" className="category-button">
              Outdoors
            </Link>
            <Link to="/listings?category=Kitchen" className="category-button">
              Kitchen
            </Link>
          </div>
          <Link to="/create" className="list-item-button">
            List Item
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
