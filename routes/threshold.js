import express from 'express';
import thresholdController from '../controller/thresholdController.js';
const router = express.Router();


router.get("/",thresholdController.getAll);
router.get("/contamination/:level",thresholdController.getByContaminationLevel);
router.get("/cage/:cagenumber",thresholdController.getByCage);
router.get("/from/:fromDate/to/:toDate",thresholdController.getByDateRange);
router.get("/after/:date",thresholdController.getAfterDate);
router.get("/before/:date",thresholdController.getBeforeDate);
router.get("/latest/:limit",thresholdController.getLatestRecordLimit);
router.get("/latest",thresholdController.getLatestRecord);

export default router;