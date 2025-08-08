import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-2 rounded-2xl shadow-xl bg-white px-8 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">Sign in to your account</h2>
          <p className="text-gray-500 mt-1">Welcome back! Please enter your credentials.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none bg-gray-50 transition"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoFocus
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-gray-600 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none bg-gray-50 transition pr-10"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((preve) => !preve)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700 transition"
                tabIndex={-1}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto text-sm text-green-700 hover:text-green-800 hover:underline mt-1 w-fit"
            >
              Forgot password?
            </Link>
          </div>

          <button
            disabled={!valideValue}
            className={
              "w-full py-2 rounded-lg font-semibold text-white transition shadow " +
              (valideValue
                ? "bg-green-700 hover:bg-green-800 active:bg-green-900"
                : "bg-gray-400 cursor-not-allowed")
            }
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link
            to="/register"
            className="ml-1 text-green-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
