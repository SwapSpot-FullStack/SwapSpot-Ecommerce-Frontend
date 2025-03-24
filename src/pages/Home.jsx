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
        <section className="featured" aria-labelledby="featured-title">
          <h2 id="featured-title" className="pill-label">
            Featured
          </h2>
          <div className="featured-card">
            <img
              src={featuredImg}
              alt="Black winter jacket with fur hood"
              className="featured-image"
            />
            <div>
              <p>Check out this sick winter jacket!</p>
              <Link
                to="/listings/4"
                className="pill-button"
                style={{ marginTop: "1rem" }}
                aria-label="View more details about the winter jacket"
              >
                View More
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories" aria-labelledby="categories-title">
          <h2 id="categories-title" className="pill-label">
            Categories
          </h2>
          <div className="category-grid">
            <Link
              to="/listings?category=Electronics"
              className="category-button"
              aria-label="View Electronics listings"
            >
              Electronics
            </Link>
            <Link
              to="/listings?category=Fashion"
              className="category-button"
              aria-label="View Fashion listings"
            >
              Fashion
            </Link>
            <Link
              to="/listings?category=Outdoors"
              className="category-button"
              aria-label="View Outdoors listings"
            >
              Outdoors
            </Link>
            <Link
              to="/listings?category=Kitchen"
              className="category-button"
              aria-label="View Kitchen listings"
            >
              Kitchen
            </Link>
          </div>
          <Link
            to="/create"
            className="list-item-button"
            aria-label="Create a new listing"
          >
            List Item
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
