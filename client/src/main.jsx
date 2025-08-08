import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './route/index.jsx'
import {Provider } from 'react-redux'; // is used to connect the Redux store to the React application
import { store } from './store/store.js'; // is
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider> 
  // </StrictMode>,
)

