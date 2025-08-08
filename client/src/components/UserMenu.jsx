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
import isAdmin from '../utils/isAdmin.js';


const UserMenu = ({close}) => {
    const user  = useSelector((state) => state?.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const handleLogout = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.logout,
        });
        //console.log('Logout Response:', response);
        
        if (response.data.success) {
          if(close){
            close()
          }
          dispatch(logout());
          localStorage.clear();
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        AxiosToastError(error);
      }
    };

    const handleCLose = () =>{
      if(close){
        close()
      }
    }
  return (
    <div>
        <div className='font-semibold'>My Account</div>
        <div className='text-sm flex items-center gap-2'>
          <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}
          <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : "" }</span></span>
          <Link  onClick={handleCLose}to={"/dashboard/profile"} className='hover:text-primary-200'>
            <HiOutlineExternalLink size={15}/>
          </Link>
        </div>

        <Divider/>

        <div className='text-sm grid gap-1'>
            {
              isAdmin(user.role) && (
                <Link onClick={handleCLose} to={"/dashboard/category"} className='px-2 hover:bg-orange-200 py-1'>Category</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleCLose} to={"/dashboard/subcategory"} className='px-2 hover:bg-orange-200 py-1'>Sub Category</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleCLose} to={"/dashboard/upload-product"} className='px-2 hover:bg-orange-200 py-1'>Upload Product</Link>
              )
            }

            {
              isAdmin(user.role) && (
                <Link onClick={handleCLose} to={"/dashboard/product"} className='px-2 hover:bg-orange-200 py-1'>Product</Link>
              )
            }
            
            <Link onClick={handleCLose} to={"/dashboard/myorders"} className='px-2 hover:bg-orange-200 py-1'>My Orders</Link>
            <Link onClick={handleCLose} to={"/dashboard/address"} className='px-2 hover:bg-orange-200 py-1'>Save Address</Link>
             <button onClick={handleLogout} className='text-left px-2 hover:bg-orange-200 py-1'>Log Out</button> 
        </div>

    </div>
    
  )
}

export default UserMenu