import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async(request,response) => {
    try {
        const file = request.file;
        // console.log(file);

        const uploadImage = await uploadImageCloudinary(file);

        return response.json({
            message: "uploaded Successfully",
            data: uploadImage,
            success: true,
            error: false
        })
        
    } catch (error) {
       return response.status(500).json({
         message : error.message || error,
         error : true,
         success : false 
       })
    }
}

export default uploadImageController;