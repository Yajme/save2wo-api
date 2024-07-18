import express from 'express';
import contaminationController from '../controller/contaminationController.js';
const router = express.Router();

router.get("/",contaminationController.getAll);
router.get("/cage/:cagenumber",contaminationController.getByCage);
router.get("/:level",contaminationController.getByContaminationLevel);
router.get("/from/:fromDate/to/:toDate",contaminationController.getByDateRange);
router.get("/after/:date",contaminationController.getAfterDate);
router.get("/before/:date",contaminationController.getBeforeDate);
router.get("/latest/:limit",contaminationController.getLatestRecordLimit);

//router.get("/",contaminationControllerController);




export default router;