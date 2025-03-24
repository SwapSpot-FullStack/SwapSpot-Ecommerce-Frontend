import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Enter a valid email.");
      toast.error("Invalid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      toast.error("Password too short.");
      return;
    }

    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.token;

      login(token);
      toast.success("Logged in successfully 👋");

      setEmail("");
      setPassword("");

      navigate("/listings");
    } catch (err) {
      setError(err.response?.data?.message ?? "Login failed");
      toast.error(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <main className="login-page">
      <div className="glass-box">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <p className="form-link-text">
            Don’t have an account?{" "}
            <a href="/register" className="form-link">
              Register here
            </a>
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
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

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
