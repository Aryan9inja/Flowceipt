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
            'You are a receipt data extraction API. You MUST respond with ONLY valid JSON, no explanations, no markdown, no text before or after the JSON. Extract these fields from receipt OCR text: vendor (string), date (string), total (number), items (array of objects with name, price, and quantity). If quantity is not specified for an item, default it to 1. If a field is missing, use null. Example response: {"vendor":"Store Name","date":"2024-01-01","total":100.50,"items":[{"name":"Item 1","price":25.00,"quantity":2}]}',
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
    // Try to extract JSON from mixed response
    console.log('Attempting to extract JSON from mixed response...');
    
    // Look for JSON starting with { and ending with }
    const jsonMatch = content.match(/\{[^]*\}/);
    if (jsonMatch) {
      try {
        const extracted = JSON.parse(jsonMatch[0]);
        console.log('Successfully extracted JSON from mixed response');
        return extracted;
      } catch (extractError: any) {
        console.error('Failed to parse extracted JSON:', extractError.message);
      }
    }
    
    console.error('JSON parse error:', error.message, 'Raw content:', content);
    throw new Error('AI returned invalid JSON');
  }
}
