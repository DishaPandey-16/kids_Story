const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyBAAaviC-hJ5W6nH3cwBJrzVB8eXPT39jE";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // There isn't a direct listModels on the instance in some versions,
    // but let's try to just run a simple generation to see if it works.
    // Or we can try to use the model manager if available.

    console.log("Testing gemini-1.5-flash...");
    const result = await model.generateContent("Hello");
    console.log("gemini-1.5-flash works!");
    console.log(result.response.text());
  } catch (error) {
    console.error("gemini-1.5-flash failed:", error.message);

    try {
      console.log("Testing gemini-pro...");
      const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
      const resultPro = await modelPro.generateContent("Hello");
      console.log("gemini-pro works!");
    } catch (e) {
      console.error("gemini-pro failed:", e.message);
    }
  }
}

listModels();
