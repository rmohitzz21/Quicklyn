import { request, response } from "express";
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddCategory = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Name and image are required",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
    };

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const savedCategory = await addCategory.save();

    if (!savedCategory) {
      return response.status(500).json({
        message: "Failed to add category",
        error: true,
        success: false,
      });
    }

    return response.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt : -1 })

    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const updateCategoryController = async(request,response) =>{
  try {
    
    const {_id,name,image} = request.body;

    const update = await CategoryModel.updateOne({
       _id : _id
    },{
      name,
      image
    })

    return response.json({
      message : "Update Category",
      success : true,
      error : false,
      data : update
    })
  } catch (error) {
      return response.status(500).json({
        
        message : error,
        error : true,
        success : false

      })
  }
}

export const deleteCategoryController =  async(request,response) => {

  try {
    
    const {_id} = request.body;

    const checkSubCategory = await SubCategoryModel.find({
      category : {
        "$in" : [_id]
      }
    }).countDocuments()

    const checkProduct = await ProductModel.find({
       category: {
          "$in" : [_id]
       }
    }).countDocuments() 

    if(checkSubCategory > 0 || checkProduct > 0){
      return response.status(400).json({
        message : "Category is already use can't delete",
        error : true,
        success : false
      })
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id : _id })

    return response.json({
      message : "Delete category successfully",
      data : deleteCategory,
      error : false,
      success : true

    })

  } catch (error) {
      return response.status(500).json({
         message : error.message || error,
         success : false,
         error : true
      })
  }
}