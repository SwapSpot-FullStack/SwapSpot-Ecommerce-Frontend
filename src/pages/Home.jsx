import { Link } from "react-router-dom";
import { FaSearch, FaHome, FaShoppingCart, FaComments } from "react-icons/fa";

function Home() {
  return (
    <div>
      <header>
        <h1>SwapSpot</h1>
        <FaSearch />
      </header>

      <nav>
        <div>
          <FaHome /> Home
        </div>
        <div>
          <FaShoppingCart /> Products
        </div>
        <div>
          <FaComments /> Chat
        </div>
      </nav>

      <main>
        <div className="featured">
          <h2 className="pill-label">Featured</h2>
          <div className="featured-card">
            <div
              className="image-placeholder"
              style={{
                width: 80,
                height: 80,
                backgroundColor: "#ccc",
                borderRadius: "50%",
              }}
            ></div>
            <div>
              <p>
                Lorem ipsum dolor sit amet. Et corrupti rerum in expedita animi
                voluptatibus. Aut sunt doloribus.
              </p>
              <button className="pill-button">View More</button>
            </div>
          </div>
        </div>

        <div className="categories">
          <h2 className="pill-label">Categories</h2>
          <div>
            <button className="category-button">Electronics</button>
            <button className="category-button">Fashion</button>
            <button className="category-button">Outdoors</button>
            <button className="category-button">Kitchen</button>
          </div>
          <Link to="/create" className="list-item-button">
            List Item
          </Link>
        </div>
        <footer className="footer">
          <p>&copy; 2025 SwapSpot. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default Home;
