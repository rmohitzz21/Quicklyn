import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import CofirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ name: "", image: "" });
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({ _id: "" });

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getCategory });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">📁 Category Management</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-sm bg-white text-blue-600 font-medium px-4 py-2 rounded-md shadow hover:bg-blue-100 transition-all duration-300"
        >
          ➕ Add Category
        </button>
      </div>

      {/* No Data */}
      {!categoryData[0] && !loading && (
        <div className="mt-6">
          <NoData />
        </div>
      )}

      {/* Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
          >
            <img
              alt={category.name}
              src={category.image}
              className="w-full h-36 object-contain p-3 bg-gray-100"
            />
            <p className="text-center text-sm font-medium mt-2 px-2 truncate">
              {category.name?.en || category.name}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 p-3">
              <button
                onClick={() => {
                  setOpenEdit(true);
                  setEditData(category);
                }}
                className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 rounded transition-colors duration-300"
              >
                ✏ Edit
              </button>
              <button
                onClick={() => {
                  setOpenConfirmBoxDelete(true);
                  setDeleteCategory(category);
                }}
                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded transition-colors duration-300"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && <Loading />}

      {/* Modals */}
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}
      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
