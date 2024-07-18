import express from 'express';
import historyController from '../controller/historyController.js';
const router = express.Router();

router.get("/",historyController.getAll);
router.get("/cage/:cagenumber",historyController.getByCage);
router.get("/fish-kill/from/:fromDate/to/:toDate",historyController.getByDateRange);
router.get("/fish-kill/after/:date",historyController.getAfterDate);
router.get("/fish-kill/before/:date",historyController.getBeforeDate);
router.get("/fish-kill/latest",historyController.getLatestFishKill);
export default router;