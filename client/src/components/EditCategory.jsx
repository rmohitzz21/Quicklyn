import React, { useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import uploadImage from '../utils/UploadImage'
import { IoClose } from 'react-icons/io5'

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image
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
        ...SummaryApi.updateCategory,
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
    setLoading(true)
    const response = await uploadImage(file)
    const { data: ImageResponse } = response
    setLoading(false)
    setData((prev) => ({
      ...prev,
      image: ImageResponse.data.url
    }))
  }

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal Container with Animation */}
      <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 animate-slideUp">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h1 className="text-lg font-semibold text-gray-800">✏️ Update Category</h1>
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-red-100 transition-colors"
          >
            <IoClose size={22} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="grid gap-1">
            <label className="text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-gray-50 border border-gray-200 rounded-md p-2 outline-none focus:border-green-400 focus:ring focus:ring-green-100 transition"
            />
          </div>

          {/* Image Upload */}
          <div className="grid gap-1">
            <span className="text-sm font-medium text-gray-700">Category Image</span>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              
              {/* Image Preview */}
              <div className="border bg-gray-50 h-36 w-full lg:w-36 flex items-center justify-center rounded-md shadow-inner">
                {data.image ? (
                  <img
                    alt="category preview"
                    src={data.image}
                    className="w-full h-full object-contain rounded"
                  />
                ) : (
                  <p className="text-sm text-gray-400">No Image</p>
                )}
              </div>

              {/* Upload Button */}
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                    px-4 py-2 rounded-md border cursor-pointer font-medium text-sm transition-all 
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
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={!data.name || !data.image || loading}
            className={`
              w-full py-2 rounded-md font-semibold text-white transition-all
              ${data.name && data.image
                ? "bg-green-600 hover:bg-green-700 active:scale-95"
                : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            {loading ? "Saving..." : "✅ Update Category"}
          </button>
        </form>
      </div>

      {/* Modal Animation */}
      <style>
        {`
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(20px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-slideUp {
            animation: slideUp 0.35s ease-out forwards;
          }
        `}
      </style>
    </section>
  )
}

export default EditCategory
