const { GoogleGenAI } = require("@google/genai");
const Invoice = require("../models/Invoice");

const ai = new GoogleGenAI({ apiKey : process.env.GEMINI_API_KEY});

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
            model : "gemini-2.0-flash",
            contents : prompt
        });
        
        let responseText = response.text;

        if (typeof responseText !== 'string') {
            if (typeof response.text === 'function') {
                responseText = response.text();
            } else {
                throw new Error("Could not extract text from AI response.");
            }
        }

        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const parsedData = JSON.parse(cleanedJson);
        res.status(200).json(parsedData);

    } catch (error) {
        console.error("Error parsing invoice with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    }
};

const generateRemainderEmail = async (req, res) => {
    const {invoiceId} = req.body;
    if(!invoiceId){
        return res.status(400).json({message: "Invoice ID is required"});
    }
    try {
        const invoice = await Invoice.findById(invoiceId);
        if(!invoice){
            return res.status(404).json({message: "Invoice not found"});
        }

        const prompt = `
        You are professional and polite accounting assistant. Write a friendly remainder email to a client about an overdue or upcoming invoice payments.
        
        Use the following details to personalize the email:
        - Client Name : ${invoice.billTo.clientName}
        - Invoice Number : ${invoice.invoiceNumber}
        - Amount Due: ${invoice.total.toFixed(2)}
        - Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
        
        The tone should be friendly but clear. keep it concise. Start the email with "Subject:".
        `;

        const response = await ai.models.generateContent({
            model : "gemini-2.0-flash",
            contents : prompt
        });

        res.status(200).json({remainderText: response.text});
    } catch (error) {
        console.error("Error generating remainder email with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    };
};

const getDashboardSummary = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error dashboard summary with AI:", error);
        res.status(500).json({message : "Failed to parse invoice data from text.", details: error.message});
    }
};

module.exports = {parseInvoiceFromText, generateRemainderEmail, getDashboardSummary};
