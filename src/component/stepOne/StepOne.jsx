import PropTypes from 'prop-types';
import  './stepOne.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const StepOne = (props) => {
    const {handleInputChange, formData,setStep} = props;
      //function for next  step then user click next button
  const handleNextStep = () => {
    if (!(formData.projectName)) {
      return toast.error('Project Name Is Required!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (!(formData.projectDescription)) {
      return toast.error('Project Description  Is Required!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (!(formData.client)) {
      return toast.error('Client Name Is Required!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    if (!(formData.contractor)) {
      return toast.error('Contractor Name Is Required!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setStep(2);
  }
    return (
        <>
            <div className="flex flex-col justify-center sm:ml-10 md:ml-0 custom-margin">
              
                
                <div className="flex justify-center align-middle mb-10 mt-10">
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Project Name<span className="text-red-500">*</span></span>
                        </label>
                        <input type="text" onChange={handleInputChange} value={formData.projectName} name="projectName" placeholder="Project Name" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Project Description<span className="text-red-500">*</span></span>
                        </label>
                        <input type="text" onChange={handleInputChange} value={formData.projectDescription} name="projectDescription" placeholder="Project Description" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className="flex justify-center align-middle">
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Client<span className="text-red-500">*</span></span>
                        </label>
                        <input type="text" onChange={handleInputChange} value={formData.client} name="client" placeholder="Client" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Contractor<span className="text-red-500">*</span></span>
                        </label>
                        <input type="text" onChange={handleInputChange} value={formData.contractor} name="contractor" placeholder="Contractor" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className="flex justify-center mt-10 mb-10">
                    <button onClick={handleNextStep} className="btn btn-outline btn-accent btn-sm">Next</button>
                </div>
            </div>
           
        </>
    );
};
StepOne.propTypes = {
   
    handleInputChange: PropTypes.func,
    setStep: PropTypes.func,
    formData: PropTypes.object,
}
export default StepOne;