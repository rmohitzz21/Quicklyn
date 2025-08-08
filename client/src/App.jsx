import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const fetchUser = async()=>{
    const userData =  await fetchUserDetails();
//console.log('User Data:', userData.data);
dispatch(setUserDetails(userData.data));

    
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
    <Header/>
  
    <main>
      <Outlet/>
    </main>
    <Footer/>
    <Toaster/>
    </>
    
  )
}
export default App
