import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const valideValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be the same")
      return
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      })
      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl shadow-xl bg-white px-8 py-10 mx-2">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">Create Account</h2>
          <p className="text-gray-500 mt-1">Welcome to <span className="font-semibold text-green-800">Binkeyit</span>. Please register to continue.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-gray-600 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none bg-gray-50 transition"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700 transition"
                tabIndex={-1}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-gray-600 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none bg-gray-50 transition pr-10"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-green-700 transition"
                tabIndex={-1}
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
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
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="ml-1 text-green-700 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Register
