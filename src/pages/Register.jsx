import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

// Component for user registration
function Register() {
  const [username, setUsername] = useState(""); // State to store username input
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const [confirm, setConfirm] = useState(""); // State to store confirm password input
  const [error, setError] = useState(null); // State to manage error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirm, setShowConfirm] = useState(false); // State to toggle confirm password visibility

  const navigate = useNavigate(); // Hook to navigate after successful registration

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // 1. Username validation: Ensure it’s at least 3 characters long
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      toast.error("Username must be at least 3 characters.");
      return;
    }

    // 2. Email validation: Check if email contains "@"
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      toast.error("Enter a valid email address.");
      return;
    }

    // 3. Password validation: Ensure password is at least 6 characters long
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short.");
      return;
    }

    // 4. Confirm password validation: Ensure passwords match
    if (password !== confirm) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Send POST request to the backend to register the user
      await axios.post("/users/register", { username, email, password });
      toast.success("Registration successful ✅");

      // Clear the form after successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm("");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      // Handle registration failure
      setError(err.response?.data?.message ?? "Registration failed");
      toast.error(err.response?.data?.message ?? "Registration failed");
    }
  };

  return (
    <main className="login-page">
      <div className="glass-box">
        <h2 className="form-title">Register</h2> {/* Form title */}
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-link-text">
            Already have an account?{" "}
            <a href="/login" className="form-link">
              Login here
            </a>
          </p>

          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />

          {/* Password input with visibility toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)} // Toggle password visibility
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
              {/* Icon to toggle password visibility */}
            </span>
          </div>

          {/* Confirm password input with visibility toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"} // Toggle confirm password visibility
              placeholder="Confirm Password"
              className="form-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)} // Update confirm password state
              required
            />
            <span
              onClick={() => setShowConfirm((prev) => !prev)} // Toggle confirm password visibility
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
              {showConfirm ? "🙈" : "👁️"}{" "}
              {/* Icon to toggle confirm password visibility */}
            </span>
          </div>

          {/* Display error message if any validation fails */}
          {error && <p className="form-error">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
