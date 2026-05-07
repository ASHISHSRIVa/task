import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api/api";

import {
  useAuth,
} from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  // SAFE AUTH
  const auth = useAuth();

  const login =
    auth?.login;

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        form
      );

      // SAFE LOGIN CHECK
      if (login) {
        login(data);

        navigate("/dashboard");
      } else {
        setError(
          "Auth Provider Error"
        );
      }
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data
          ?.message ||
          "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl"
      >

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-800">
          Welcome Back
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Login to continue
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            className="border border-slate-300 p-4 rounded-xl outline-none focus:border-blue-500"
            value={form?.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            className="border border-slate-300 p-4 rounded-xl outline-none focus:border-blue-500"
            value={form?.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>

          {/* LINK */}
          <p className="text-center text-slate-500">

            Don't have account?

            <Link
              to="/signup"
              className="text-blue-600 ml-2 font-semibold"
            >
              Signup
            </Link>

          </p>

        </div>
      </form>
    </div>
  );
};

export default Login;