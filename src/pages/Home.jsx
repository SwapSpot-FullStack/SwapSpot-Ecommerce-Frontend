import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import featuredImg from "../assets/placeholder.png";
import Footer from "../components/Footer";

// Home page component displaying featured items and categories
function Home() {
  return (
    <div className="page-wrapper">
      <Navbar /> {/* Navbar component */}
      <main className="main-content">
        {/* Featured Section */}
        <section className="featured" aria-labelledby="featured-title">
          <h2 id="featured-title" className="pill-label">
            Featured {/* Title of the featured section */}
          </h2>
          <div className="featured-card">
            <img
              src={featuredImg} // Display featured image
              alt="Black winter jacket with fur hood" // Descriptive alt text for accessibility
              className="featured-image"
            />
            <div className="featured-content">
              <p>Check out this sick winter jacket!</p>{" "}
              {/* Description of the featured item */}
              <Link
                to="/listings/4" // Link to detailed page of this listing
                className="pill-button mt-4"
                aria-label="View more details about the winter jacket"
              >
                View More
              </Link>{" "}
              {/* Button to view more details of the item */}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories" aria-labelledby="categories-title">
          <h2 id="categories-title" className="pill-label">
            Categories {/* Title for the categories section */}
          </h2>
          <div className="category-grid">
            {/* Link for each category with filter */}
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
            List Item{" "}
            {/* Link to the page where the user can create a listing */}
          </Link>
        </section>
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
}

export default Home;
