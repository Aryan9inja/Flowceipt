import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';
import {
  extractReceiptData,
  getReceiptById,
  getReceipts,
  processReceipt,
  updateReceiptMetaData,
  uploadReceipt,
} from '../controllers/receipt.controller';

const router: Router = Router();

router.post('/upload', verifyJWT, upload.single('receipt'), uploadReceipt);
router.post('/process', verifyJWT, processReceipt);
router.post('/extract', verifyJWT, extractReceiptData);
router.get('/', verifyJWT, getReceipts);
router.get('/:id', verifyJWT, getReceiptById);
router.post('/meta', verifyJWT, updateReceiptMetaData);

export default router;
