"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      alert("Logged in successfully!");
      router.push("/admin");
      // TODO: Redirect or set session
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="text-3xl font-bold text-blue-900">
            Highfield Garage
          </div>
          <div className="text-blue-700 text-sm font-bold">Admin Login</div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:border-blue-500"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:border-blue-500"
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="bg-blue-900 text-yellow-400 font-semibold px-6 py-2 rounded hover:bg-blue-700 hover:text-yellow-300 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
      </div>
    </div>
  );
}
