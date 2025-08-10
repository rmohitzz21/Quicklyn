import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { setUserDetails } from './store/userSlice.js';
import { useDispatch } from 'react-redux';
import { setAllCategory } from './store/productSlice.js';
import SummaryApi from './common/SummaryApi.js';

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

  useEffect(() => {
    fetchUser();
    fetchCategory();
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
