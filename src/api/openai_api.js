const url = "https://api.chatgptid.net/v1/chat/completions"
const daodaoKey = import.meta.env.VITE_DAODAO_KEY

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${daodaoKey}`
};
  


/*export const fetchFromOpenAI = async (userInput = "Hello, can you give me a random word?") => {

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


export const fetchSqlFromOpenAI = async (database = "", query="hello") => {
  
      const requestBody = {
          model: "gpt-3.5-turbo",
          messages: [{"role": "system", "content": `Given the following SQL tables, your job is to write queries given a user’s request.\n + ${database}`},
                     {"role": "user", "content": `${query}`}],
          temperature: 0.3,
          max_tokens: 150,
          top_p: 1,
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
}*/


export const fetchFromOpenAI2 = async (sysMessage="", userMessgae="Hello, give me a random word please", options={}) => {

    let messages = [];
    if (sysMessage !== "") {
      messages.push({"role": "system", "content": `${sysMessage}`})
    }
    messages.push({"role": "user", "content": `${userMessgae}`})

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: messages,
      ...options
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

}