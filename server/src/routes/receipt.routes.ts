import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';
import {
  extractReceiptData,
  getReceiptById,
  getReceipts,
  processReceipt,
  receiptDashboardData,
  reviewReceipt,
  searchReceiptsByVendor,
  uploadReceipt,
} from '../controllers/receipt.controller';

const router: Router = Router();

router.post('/upload', verifyJWT, upload.single('receipt'), uploadReceipt);
router.post('/process', verifyJWT, processReceipt);
router.post('/extract', verifyJWT, extractReceiptData);
router.get('/', verifyJWT, getReceipts);
router.get('/dashboard', verifyJWT, receiptDashboardData);
router.post('/review', verifyJWT, reviewReceipt);
router.get('/search', verifyJWT, searchReceiptsByVendor);
router.get('/:id', verifyJWT, getReceiptById);

export default router;
