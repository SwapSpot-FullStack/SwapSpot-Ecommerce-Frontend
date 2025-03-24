import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import featuredImg from "../assets/featured-img.png";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="page-wrapper">
      {/* Green Header */}
      <header className="home-header">
        <h1>SwapSpot</h1>
        <FaSearch />
      </header>

      {/* Sub-navigation bar */}
      <Navbar />

      <main className="main-content">
        {/* Featured Section */}
        <div className="featured">
          <h2 className="pill-label">Featured</h2>
          <div className="featured-card">
            <img
              src={featuredImg}
              alt="Featured"
              className="featured-image"
              style={{
                width: 300,
                height: 300,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <p>
                Lorem ipsum dolor sit amet. Et corrupti rerum in expedita animi
                voluptatibus. Aut sunt doloribus. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Blanditiis debitis sit magnam
                labore culpa temporibus pariatur numquam ea fuga optio
                laboriosam eius, commodi praesentium. Magni ullam libero rem
                maxime incidunt! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Totam tempora ad nulla a dignissimos quod
                vero, consequuntur atque illo dicta. Ut, atque nihil. Provident
                consequatur hic possimus voluptate deleniti beatae.
              </p>
              <button className="pill-button">View More</button>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="categories">
          <h2 className="pill-label">Categories</h2>
          <div className="category-grid">
            <button className="category-button">Electronics</button>
            <button className="category-button">Fashion</button>
            <button className="category-button">Outdoors</button>
            <button className="category-button">Kitchen</button>
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
