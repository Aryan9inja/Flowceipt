import Tesseract from 'tesseract.js';

export const runOCR = async (buffer: Buffer): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(buffer, 'eng', {
      logger: (m) => console.log(m),
    });

    return data.text;
  } catch (error) {
    console.error('OCR failed: ', error);
    throw new Error('Failed to perform OCR');
  }
};
