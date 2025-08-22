import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';
import {
  extractReceiptData,
  getReceiptById,
  getReceipts,
  processReceipt,
  receiptDashboardData,
  searchReceiptsByVender,
  updateReceiptMetaData,
  uploadReceipt,
} from '../controllers/receipt.controller';

const router: Router = Router();

router.post('/upload', verifyJWT, upload.single('receipt'), uploadReceipt);
router.post('/process', verifyJWT, processReceipt);
router.post('/extract', verifyJWT, extractReceiptData);
router.get('/', verifyJWT, getReceipts);
router.get('/dashboard', verifyJWT, receiptDashboardData);
router.post('/meta', verifyJWT, updateReceiptMetaData);
router.get('/search', verifyJWT, searchReceiptsByVender);
router.get('/:id', verifyJWT, getReceiptById);

export default router;
