import CategoryModel from "../models/category.model.js";

export const AddCategory = async (request,response) => {
    try {
        const {name, image} = request.body;

        if(!name || !image) {
            return response.status(400).json({
                message: "Name and image are required",
                error: true,
                success: false
            });
        }

        const payload = {
            name,
            image
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const savedCategory =await addCategory.save();

        if(!savedCategory) {
            return response.status(500).json({
                message: "Failed to add category",
                error: true,
                success: false
            });
        }

        return response.status(201).json({
            message: "Category added successfully",
            data: savedCategory,
            error: false,
            success: true
        });


   

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error: true,
            success: false
        })
    }
}