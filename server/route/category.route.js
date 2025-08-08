import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategory } from "../controllers/category.controller.js";

const categoryRouter = Router()
// auth used to protect the route and ensure only authenticated users can add a category
categoryRouter.post('/add-category', auth, AddCategory);



export default categoryRouter;