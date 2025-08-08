import {createBrowserRouter} from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import SearchPage from '../components/SearchPage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import ResetPassword from '../pages/ResetPassword.jsx';
import OtpVerification from '../pages/OtpVerification.jsx';
import UserMenuMobile from '../pages/UserMenuMobile.jsx';
import Dashboard from '../layouts/Dashboard.jsx';
import Profile from '../pages/Profile.jsx';
import MyOrders from '../pages/MyOrders.jsx';
import Address from '../pages/Address.jsx';
import CategoryPage from '../pages/Category.jsx';
import SubCategoryPage from '../pages/SubCategoryPage.jsx';
import UploadProduct from '../pages/UploadProduct.jsx';
import Product from '../pages/Product.jsx';
const router = createBrowserRouter([
    {
        path : '/',
        element : <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />,
            },
            {
                path: 'verification-otp',
                element: <OtpVerification />
            },
            {
                path:'user',
                element:<UserMenuMobile/>
            },
            {
                path:"dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path: 'profile',
                        element:<Profile/>
                    },
                    {
                        path: 'myorders',
                        element:<MyOrders/>
                    },
                    {
                        path: 'address',
                        element:<Address/>
                    },
                    {
                        path: 'category',
                        element: <CategoryPage/>
                    },
                    {
                        path: 'subcategory',
                        element: <SubCategoryPage/>
                    },
                    {
                        path: 'upload-product',
                        element: <UploadProduct/>
                    },
                    {
                        path: 'product',
                        element: <Product/>
                    }
                ]
            }
        ]
    }
])

export default router;