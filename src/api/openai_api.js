const url = "https://api.chatgptid.net/v1/chat/completions"
const daodaoKey = import.meta.env.VITE_DAODAO_KEY

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${daodaoKey}`
};
  

export const fetchFromOpenAI = async (userInput = "Hello, can you give me a random word?") => {


const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": `${userInput}`}],
    temperature: 0.7,
    max_tokens: 150,
};
        
const requestOptions =  {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(requestBody)
};

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};
