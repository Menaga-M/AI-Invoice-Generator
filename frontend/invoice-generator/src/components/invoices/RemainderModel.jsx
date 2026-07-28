import { useState, useEffect } from "react";
import { Loader2, Mail, Copy, Check } from "lucide-react";
import Button from "../ui/Button";
import TextareaField from "../ui/TextareaField";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";


const RemainderModel = ({isOpen, onClose, invoiceId}) => {

  const [remainderText, setRemainderText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if(isOpen && invoiceId) {
      const generateRemainder = async() => {
        setIsLoading(true);
        setRemainderText('');
        try{
          const response = await axiosInstance.post(API_PATHS.AI.GENERATE_REMAINDER, { invoiceId });
          setRemainderText(response.data.remainderText);
        }catch(error){
          toast.error("Failed to generate reminder.");
          console.error("AI reminder error:",error);
          onClose();
        }finally{
          setIsLoading(false);
        }
      };
      generateRemainder();
    }
  }, [isOpen, invoiceId, onClose]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(remainderText);
    setHasCopied(true);
    toast.success('Reminder copied to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  }

  return (
    <div className="">
      <div className="">
        <div className="" onClick={onClose}></div>

        <div className="">
          <div className="">
            <h3 className="">
              <Mail className=""/>
              AI-Generated Reminder
            </h3>
            <button onClick={onClose} className="">&times;</button>
          </div>

          {isLoading ? (
            <div className="">
              <Loader2 className=""/>
            </div>
          ) : (
            <div className="">
              <TextareaField
                name="reminderText"
                value={remainderText}
                readOnly
                rows={10}
              />
            </div>
          )}

          <div className="">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button onClick={handleCopyToClipboard} icon={hasCopied ? Check : Copy} disabled={isLoading}>
              {hasCopied ? 'Copied!' : 'Copy Text'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemainderModel