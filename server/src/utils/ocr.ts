import Tesseract from 'tesseract.js';

export const runOCR = async (imageUrl: string): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(imageUrl, 'eng');
    return data.text;
  } catch (error) {
    console.error('OCR failed: ', error);
    throw new Error('Failed to perform OCR');
  }
};
