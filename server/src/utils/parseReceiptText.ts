import type { IReceipt } from '../models/receipts.model';

export type ParsedData = IReceipt['extractedData'];

export const parseReceiptText = (ocrText: string): ParsedData => {
  const lines = ocrText
    .split('')
    .map((l) => l.trim())
    .filter(Boolean);

  let vendor = '';
  let date = '';
  let total: any = undefined;
  const items: { name: string; price?: any }[] = [];

  const dateRegex = /\b(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\b/;
  const totalRegex =
    /\b(?:total|amount\s+due|balance)\s*[:\-]?\s*\$?\s*(\d+\.\d{2})\b/i;
  const priceRegex = /\$?(\d+\.\d{2})$/;

  if (lines.length > 0) vendor = lines[0]!;

  for (const line of lines) {
    const match = line.match(dateRegex);
    if (match) {
      date = match[1]!;
      break;
    }
  }

  for (const line of lines) {
    const match = line.match(totalRegex);
    if (match) {
      total = match[1]!;
      break;
    }
  }

  for (const line of lines) {
    const match = line.match(priceRegex);

    if (match && !/total/i.test(line)) {
      const name = line.replace(priceRegex, '').trim();
      items.push({ name, price: match[1] });
    }
  }

  return {
    vendor,
    date,
    total,
    items,
  };
};
