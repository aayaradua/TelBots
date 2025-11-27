import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [telegramUserid, setTelegramUserid] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        name,
        username,
        telegramUserid,
        telegramUsername,
        email,
        password,
      });
      navigate("/choose-plan"); // Redirect to plan selection immediately
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
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
        <h1 className="text-3xl font-bold text-white mb-6">Register</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
          <input
            type="text"
            placeholder="Telegram User ID"
            value={telegramUserid}
            onChange={(e) => setTelegramUserid(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
          <input
            type="text"
            placeholder="Telegram Username"
            value={telegramUsername}
            onChange={(e) => setTelegramUsername(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-black border border-neutral-700 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 py-3 rounded font-semibold text-black"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-neutral-400 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
