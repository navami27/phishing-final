document.getElementById('send').addEventListener('click', async () => {
  const input = document.getElementById('input').value;
  const responseDiv = document.getElementById('response');
  
  responseDiv.innerText = "Thinking...";

  // PASTE YOUR API URL BELOW
  const FLOW_URL = "http://localhost:7860/api/v1/run/68360317-0979-4519-91e4-85c3a815077c";
  
  // Optional: If you set an API key in Langflow Settings, add it here
  const API_KEY = "sk-MJb_yOHMz0ID-PY986gKhf3s9SPPqglTJrjbsJVODgs"; 

  try {
    const response = await fetch(FLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "x-api-key": API_KEY // Uncomment if using an API key
      },
      body: JSON.stringify({
        input_value: input,
        output_type: "chat",
        input_type: "chat",
        tweaks: {}
      })
    });

    const data = await response.json();
    
    // Langflow response structure is deeply nested
    // We usually find the text in outputs[0].outputs[0].results.message.text
    // You may need to inspect the console log to find the exact path for your version
    console.log(data); 
    
    const resultText = data.outputs[0].outputs[0].results.message.text;
    responseDiv.innerText = resultText;

  } catch (error) {
    console.error(error);
    responseDiv.innerText = "Error: " + error.message;
  }
});