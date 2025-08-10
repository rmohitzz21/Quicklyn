import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategory, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()
// auth used to protect the route and ensure only authenticated users can add a category
categoryRouter.post('/add-category', auth, AddCategory);
categoryRouter.get('/get',getCategoryController);
categoryRouter.put('/update', auth,updateCategoryController);
categoryRouter.delete('/delete',auth,deleteCategoryController);


export default categoryRouter;