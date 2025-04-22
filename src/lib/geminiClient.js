const API_KEYS = [
  process.env.GEMINI_API_KEY1,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
  process.env.GEMINI_API_KEY4,
  process.env.GEMINI_API_KEY5,
  process.env.GEMINI_API_KEY6,
  process.env.GEMINI_API_KEY7,
  process.env.GEMINI_API_KEY8,
  process.env.GEMINI_API_KEY9,
  process.env.GEMINI_API_KEY10
].filter(Boolean); // Remove any undefined keys

let currentKeyIndex = 0;

export async function callGeminiAPI({ userInput }) {
  if (API_KEYS.length === 0) {
    console.error('No valid API keys found');
    return "Sorry, the chatbot is currently unavailable. Please try again later.";
  }

  for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
    try {
      const apiKey = API_KEYS[currentKeyIndex];
      console.log('Using API Key:', apiKey.slice(0, 5) + '...'); // Log partial key for security

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: userInput
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        throw new Error('Invalid response structure from API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed with key ${currentKeyIndex + 1}:`, error);
      // Rotate to next key
      currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    }
  }

  console.error('All API keys failed');
  return "Sorry, I'm having trouble connecting to the server. Please try again later.";
}