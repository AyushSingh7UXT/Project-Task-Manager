import express from 'express';
import { getAnalytics, exportCSV, exportPDF } from '../controllers/reportController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/analytics', getAnalytics);
router.get('/export/pdf', authorize('admin'), exportPDF);
router.get('/export/csv', authorize('admin'), exportCSV);

export default router;
