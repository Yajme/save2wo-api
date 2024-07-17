import express from 'express';
import historyController from '../controller/historyController.js';
const router = express.Router();

router.get("/",historyController.getAll);
router.get("/cage/:cagenumber",historyController.getByCage);
router.get("/fish-kill/:count")


export default router;