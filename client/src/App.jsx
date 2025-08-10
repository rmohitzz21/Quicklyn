import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';
import { setAllCategory, setAllSubCategory } from './store/productSlice.js';
import SummaryApi from './common/SummaryApi.js';

import Axios from './utils/Axios.jsx';


function App() {
  const dispatch = useDispatch();

  const fetchUser = async()=>{
    const userData =  await fetchUserDetails();
//console.log('User Data:', userData.data);
dispatch(setUserDetails(userData.data));

    
  }

    const fetchCategory = async()=>{
        try {
            //setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const {data : responseData } = response
            console.log(responseData)

            if(responseData.success){
              dispatch(setAllCategory(responseData.data))
                //setCategoryData(responseData.data)
            }

        } catch (error) {
            
        }finally{
            //setLoading(false)
        }
     }

    const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          dispatch(setAllSubCategory(responseData.data))
        }
    } catch (error) {
        //Not Defined
    }finally{
      //Not Defined
    }
    }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
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
