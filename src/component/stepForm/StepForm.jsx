import { useState } from "react";
import StepOne from "../stepOne/StepOne";
import StepTwo from "../stepTwo/StepTwo";
const StepForm = () => {
  const [step, setStep] = useState(1);
  const initialFormData = {
    projectName: '',
    projectDescription: '',
    client: '',
    contractor: '',
    max_X: '',
    min_X: '',
    max_Y: '',
    min_Y: '',
    max_Z: '',
    min_Z: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  //function for onchange input field then field  value is change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }



  return (
    <>
      <div className="container">
        {
          step === 1 && <StepOne  setStep={setStep} handleInputChange={handleInputChange} formData={formData} />
        }
        {
          step === 2 && <StepTwo  initialFormData = {initialFormData} setFormData={setFormData} setStep={setStep}  formData={formData}  handleInputChange={handleInputChange} />
        }
      </div>
     
    </>
  );
};

export default StepForm;