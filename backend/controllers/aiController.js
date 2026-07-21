const { GoogleGenAi } = require("@google/genai");
const Invoice = require("../models/Invoice");

const ai = new GoogleGenAi({ apiKey : process.env.GEMINI_API_KEY});

const parseInvoiceFromText = async(req,res) => {
    const { text } = req.body;
     
    if(!text){
        return res.status(404).json({message : "Text is required"});
    }

    try{
        const prompt = 
        `You are an expert invoice data extraction AI. Analyze the following text and extract the relevant information to create an invoice.
        The output MUST be a valid JSON object.
        
        the JSON object should have the following structure:
        {
          "clientName" : "String",
          "email" : "String (if available)",
          "address" : "String (if available)",
          "items" : [
            {
                "name" : "String",
                "quantity" : "number",
                "unitPrice" : "number"
            }
            ]
        }
        Here is the text to parse:
        --- TEXT START ---
        ${text}
        --- TEXT END ---
        
        Extract the data and provide only the JSON object.`;
        const response = await ai.models.generateContent({
            model : "gemini-2.0-flash-latest",
            contents : prompt
        });
        
        const responseText = response.text;

        if(typeof responseText !== 'string'){
            if(typeof response.text === 'function'){
                responseText = response.text();
            }else{
                throw new Error("Could not extract text from AI response.");
            }
        }

        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(cleanedJson);
        res.status(200).json(parsedData);
        
    }catch{
        console.error("Error parsing invoice with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    }
};

module.exports = {parseInvoiceFromText};

const generateRemainderEmail = async (req, res) => {
    try{

    }catch{
        console.error("Error generating remainder email with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    }
};

module.exports = {parseInvoiceFromText, generateRemainderEmail};

const getDashboardSummary = async (req, res) => {
    try{

    }catch{
        console.error("Error dashboard summary with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    }
};

module.exports = {parseInvoiceFromText, generateRemainderEmail, getDashboardSummary};
