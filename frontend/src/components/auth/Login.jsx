import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser, loading, setLoading } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const loggedInUser = await api.post("/auth/login", { email, password });
      setUser(loggedInUser.data);
      if(user.hasActivePlan === true) {
        navigate("/dashboard");
      } else {
        navigate("/plans-choosen");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl border border-neutral-800"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 py-3 rounded font-semibold text-black"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/forgot-password" className="text-yellow-500 font-semibold">
            Forgot Password?
          </Link>
          <p className="text-neutral-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-500 font-semibold">Register</Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
