import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage.js';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: ""
  })
  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    setData((prev) => ({
      ...prev,
      image: ImageResponse.data.url
    }))
  }

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal Card */}
      <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-6 animate-popUp">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-lg font-semibold text-gray-800">➕ Add Category</h1>
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-red-50 transition"
          >
            <IoClose size={22} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="grid gap-1">
            <label htmlFor='categoryName' className="text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type='text'
              id='categoryName'
              placeholder='Enter category name'
              value={data.name}
              name='name'
              onChange={handleOnChange}
              className="bg-gray-50 p-2 border border-gray-200 rounded-md outline-none focus:border-green-400 focus:ring focus:ring-green-100 transition"
            />
          </div>

          {/* Image Section */}
          <div className='grid gap-1'>
            <p className="text-sm font-medium text-gray-700">Category Image</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              {/* Preview Box */}
              <div className='border bg-gray-50 h-36 w-full lg:w-36 flex items-center justify-center rounded-md shadow-inner'>
                {data.image ? (
                  <img
                    alt='category'
                    src={data.image}
                    className='w-full h-full object-contain rounded'
                  />
                ) : (
                  <p className='text-sm text-gray-400'>No Image</p>
                )}
              </div>

              {/* Upload Button */}
              <label htmlFor='uploadCategoryImage'>
                <div
                  className={`
                    px-4 py-2 rounded-md border font-medium text-sm transition-all 
                    ${!data.name
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "border-green-400 text-green-600 hover:bg-green-50 active:scale-95"}
                  `}
                >
                  {loading ? "Uploading..." : "📤 Upload Image"}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type='file'
                  id='uploadCategoryImage'
                  className='hidden'
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={!data.name || !data.image || loading}
            className={`
              w-full py-2 rounded-md font-semibold text-white transition-all
              ${data.name && data.image
                ? "bg-green-600 hover:bg-green-700 active:scale-95"
                : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            {loading ? "Saving..." : "✅ Add Category"}
          </button>
        </form>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes popUp {
            0% { opacity: 0; transform: translateY(20px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-popUp {
            animation: popUp 0.35s ease-out forwards;
          }
        `}
      </style>
    </section>
  )
}

export default UploadCategoryModel
