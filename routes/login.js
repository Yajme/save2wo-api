import express from 'express';
import loginController from '../controller/loginController.js';
const router = express.Router();

router.post("/",loginController.Login);
router.post("/change/:info",loginController.changeHandler);


export default router;