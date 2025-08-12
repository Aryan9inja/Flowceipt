import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export async function extractDataFromOCR(ocrRawText: string) {
  let response;

  try {
    response = await openai.chat.completions.create({
      model: 'openai/gpt-oss-20b:free',
      messages: [
        {
          role: 'system',
          content:
            'You will receive OCR extracted text from a receipt. Extract structured fields like vendor, date, total, and items.The items is an array of object with name and price where name is mandatory. Respond in JSON format only, without any explanations, markdown, or code fences',
        },
        {
          role: 'user',
          content: ocrRawText,
        },
      ],
      temperature: 0,
      max_tokens: 1000,
    });
  } catch (err: any) {
    console.error('AI API call failed:', err);
    throw new Error('AI API request failed');
  }

  const content = response?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    console.error('Empty AI response:', JSON.stringify(response, null, 2));
    throw new Error('AI did not return any content');
  }

  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (error: any) {
    console.error('JSON parse error:', error.message, 'Raw content:', content);
    throw new Error('AI returned invalid JSON');
  }
}
