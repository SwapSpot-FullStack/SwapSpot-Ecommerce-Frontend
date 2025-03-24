import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      toast.error("Username must be at least 3 characters.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      toast.error("Enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // ✅ Corrected endpoint
      await axios.post("/api/users/register", { username, email, password });

      toast.success("Registration successful ✅");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirm("");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message ?? "Registration failed");
      toast.error(err.response?.data?.message ?? "Registration failed");
    }
  };

  return (
    <main className="login-page">
      <div className="glass-box">
        <h2 className="form-title">Register</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-link-text">
            Already have an account?{" "}
            <a href="/login" className="form-link">
              Login here
            </a>
          </p>

          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
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
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="form-input"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirm((prev) => !prev)}
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
              {showConfirm ? "🙈" : "👁️"}
            </span>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-button">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
}

export default Register;
