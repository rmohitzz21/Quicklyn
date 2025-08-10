import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { logout } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from '../utils/isAdmin';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleCLose = () => {
    if (close) close();
  };

  return (
    <div className="
      w-72 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-5
      border border-gray-200 animate-fadein-slide
      transition-all duration-300
      "
      style={{ minWidth: "260px" }}
    >
      {/* Account header */}
      <div className="font-bold text-lg text-gray-900 mb-1 tracking-wide flex items-center gap-1">
        <span>👋</span> {user.name}
      </div>
      <div className="text-xs flex items-center gap-2 mb-2 text-gray-700">
        <span className='max-w-52 text-ellipsis line-clamp-1'>
          { user.mobile}
          {user.role === "ADMIN" && (
            <span className="ml-2 px-1 py-0.5 rounded bg-orange-100 text-orange-400 text-xs font-bold">(Admin)</span>
          )}
        </span>
        <Link 
          onClick={handleCLose}
          to={"/dashboard/profile"}
          className='hover:text-blue-500 focus:outline-none'
        >
          <HiOutlineExternalLink size={16}/>
        </Link>
      </div>

      <Divider />

      {/* Menu Links */}
      <div className="text-sm grid gap-1.5 mt-2">
        {isAdmin(user.role) && (
          <Link
            onClick={handleCLose}
            to={"/dashboard/category"}
            className="px-3 py-2 rounded hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 
                    focus:bg-orange-200 transition-all duration-200 font-medium"
          >
            📂 Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleCLose}
            to={"/dashboard/subcategory"}
            className="px-3 py-2 rounded hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100
                    focus:bg-orange-200 transition-all duration-200 font-medium"
          >
            🗂️ Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleCLose}
            to={"/dashboard/upload-product"}
            className="px-3 py-2 rounded hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 
                    focus:bg-orange-200 transition-all duration-200 font-medium"
          >
            ⬆️ Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleCLose}
            to={"/dashboard/product"}
            className="px-3 py-2 rounded hover:bg-gradient-to-r hover:from-orange-100 hover:to-yellow-100 
                    focus:bg-orange-200 transition-all duration-200 font-medium"
          >
            🏷️ Product
          </Link>
        )}

        <Link
          onClick={handleCLose}
          to={"/dashboard/myorders"}
          className="px-3 py-2 rounded hover:bg-blue-50 focus:bg-blue-100 transition-all duration-200 font-medium"
        >
          📦 My Orders
        </Link>
        <Link
          onClick={handleCLose}
          to={"/dashboard/address"}
          className="px-3 py-2 rounded hover:bg-blue-50 focus:bg-blue-100 transition-all duration-200 font-medium"
        >
          📮 Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="px-3 py-2 mt-2 rounded text-left text-red-600 hover:bg-red-100 focus:bg-red-200 
                  font-medium transition-all duration-200"
        >
          🚪 Log Out
        </button>
      </div>

      {/* Animation keyframes (Tailwind config needed for animate-fadein-slide) */}
      <style>
        {`
          @keyframes fadein-slide {
            0% { opacity: 0; transform: translateY(16px) scale(0.98);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-fadein-slide {
            animation: fadein-slide 0.45s cubic-bezier(.34,1.56,.64,1) both;
          }
        `}
      </style>
    </div>
  )
}

export default UserMenu;
