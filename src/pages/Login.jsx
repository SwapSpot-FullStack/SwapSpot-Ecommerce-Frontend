import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

// Login component for authenticating users
function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(null); // State for any error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); // Hook for navigation after successful login
  const { login } = useAuth(); // Auth context to save the token after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate email format
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      toast.error("Invalid email.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short.");
      return;
    }

    try {
      // Send POST request to login endpoint
      const response = await axios.post("/login", { email, password });
      const token = response.data.token; // Retrieve token from response

      login(token); // Save the token in context and localStorage
      toast.success("Logged in successfully 👋");

      // Clear input fields
      setEmail("");
      setPassword("");

      // Redirect to listings page after successful login
      navigate("/listings");
    } catch (err) {
      // Show error if login fails
      setError(err.response?.data?.message ?? "Login failed");
      toast.error(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <main className="login-page">
      <div className="glass-box">
        {/* Form title */}
        <h2 className="form-title">Login</h2>

        {/* Form for user login */}
        <form onSubmit={handleSubmit} className="form-container">
          {/* Link to the registration page if user doesn't have an account */}
          <p className="form-link-text">
            Don’t have an account?{" "}
            <a href="/register" className="form-link">
              Register here
            </a>
          </p>

          {/* Email input field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="form-input"
            required
          />

          {/* Password input field with toggle for visibility */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="form-input"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility on click
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              {showPassword ? "🙈" : "👁️"}{" "}
              {/* Display password icon based on visibility */}
            </span>
          </div>

          {/* Display error message if there is an error */}
          {error && <p className="form-error">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
