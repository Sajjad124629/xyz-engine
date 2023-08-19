import Chart from '../Chart/Chart';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stepTwo.css';
import Papa from 'papaparse';
import { useState } from 'react';

const StepTwo = (props) => {
    const { formData, handleInputChange, setStep, setFormData, initialFormData } = props;
    const [uploading, setUploading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const showToast = (msg, type = 'notify') => {
        toast[type](msg, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    const handleCsvUpload = async (file) => {
        setUploading(true);

        try {
            //call readFileAsText function
            const csvContent = await readFileAsText(file);
            // call parseCsvData function
            const parsedData = await parseCsvData(csvContent); 
            // call validateCsvData function for validation errors
            const validationErrors = validateCsvData(parsedData); 
            if (validationErrors.length > 0) {
                showToast(`CSV validation Errors:${validationErrors}`, 'error');
                return;
            } else {
                showToast('CSV READ SUCCESSFULLY', 'success');
                //call findMinMaxValues for get all max and min values
                const { minX, maxX, minY, maxY, minZ, maxZ } = findMinMaxValues(parsedData); 
                // Automatically fill the input fields with min-max values
                handleInputChange({ target: { name: 'min_X', value: minX } });
                handleInputChange({ target: { name: 'max_X', value: maxX } });
                handleInputChange({ target: { name: 'min_Y', value: minY } });
                handleInputChange({ target: { name: 'max_Y', value: maxY } });
                handleInputChange({ target: { name: 'min_Z', value: minZ } });
                handleInputChange({ target: { name: 'max_Z', value: maxZ } });

                if (file) {
                    // Assuming parsedData is available after uploading CSV
                    const newChartData = [];
                    // Process parsedData and skip the first row (column names)
                    for (let i = 1; i < parsedData.length; i++) {
                        const entry = parsedData[i];
                        const kp = parseFloat(entry[0]);
                        const x = parseFloat(entry[1]);

                        if (!isNaN(kp) && !isNaN(x)) {
                            newChartData.push({ kp, x });
                        }
                    }
                    // Set chart data
                    setChartData(newChartData); 
                }
            }

        } catch (error) {
            setUploading(false);
            showToast('Did Not Recognize any CSV file!', 'error');
        }

    };

    //Retrieves CSV file contents
    const readFileAsText = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };
    //Retrieves CSV file data
    const parseCsvData = (csvContent) => {
        return new Promise((resolve, reject) => {
            Papa.parse(csvContent, {
                complete: (result) => {
                    resolve(result.data);
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    };
    //find max and min value of x,y,z in csv column
    const findMinMaxValues = (parsedData) => {
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        let minZ = Infinity;
        let maxZ = -Infinity;

        parsedData.forEach((entry) => {
            // Assuming CSV format: [KP, X, Y, Z]
            // eslint-disable-next-line no-unused-vars
            const [_, x, y, z] = entry;
            if (!isNaN(parseFloat(x))) {
                minX = Math.min(minX, parseFloat(x));
                maxX = Math.max(maxX, parseFloat(x));
            }
            if (!isNaN(parseFloat(y))) {
                minY = Math.min(minY, parseFloat(y));
                maxY = Math.max(maxY, parseFloat(y));
            }
            if (!isNaN(parseFloat(z))) {
                minZ = Math.min(minZ, parseFloat(z));
                maxZ = Math.max(maxZ, parseFloat(z));
            }
        });
        return { minX, maxX, minY, maxY, minZ, maxZ };
    }
    //validation function for the csv format
    const validateCsvData = (parsedData) => {
        const validationErrors = [];

        // Validate header row
        const headerRow = parsedData[0];
        if (!headerRow || headerRow.length !== 4) {
            validationErrors.push('CSV must have exactly 4 columns: KP, X, Y, Z');
        } else {
            const [kpHeader, xHeader, yHeader, zHeader] = headerRow;
            if (kpHeader !== 'KP' || xHeader !== 'X' || yHeader !== 'Y' || zHeader !== 'Z') {
                validationErrors.push('CSV columns must be: KP, X, Y, Z');
            }
        }

        return validationErrors;
    };

    //store all the data in the formData object and upload it to the local storage
    const handleSaveFormData = () => {
        let err = '';
        let success = '';
        if (!(formData.max_X)) {
            err = 'Maximum  Value Of X Is Required!';

        }
        else if (!(formData.min_X)) {
            err = 'Minimum Value Of X Is Required!';
        }
        else if (!(formData.min_Y)) {
            err = 'Minimum  Value Of Y Is Required!';
        }
        else if (!(formData.max_Z)) {
            err = 'Maximum  Value Of Z Is Required!';
        }
        else if (!(formData.min_Z)) {
            err = 'Minimum  Value Of Z Is Required!';
        }
        else {

            success = 'Successfully Uploaded';
            const saveData = JSON.parse(localStorage.getItem('formData')) || [];
            saveData.push(formData);
            localStorage.setItem('formData', JSON.stringify(saveData));
            // set initial form data
            setFormData(initialFormData)
            //go back to step 1
            setStep(1);
            // set upload progress to false when form is uploaded successfully in local storage
            setUploading(false)
        }

        if (err !== '') showToast(err, 'error');
        else showToast(success, 'success');
        return;

    }

    return (
        <>
            <div className="flex flex-col justify-center md:justify-center">
                <div className="custom-responsive sm:ml-20 sm:justify-center sm:align-middle mb-10 mt-10  sm:grid lg:grid-cols-4  md:grid-cols-2 lg:ml-0 md:ml-28 lg:flex">
                    <div className="form-control w-full max-w-xs pr-8 ">
                        <label className="label">
                            <span className="label-text">Project Name</span>
                        </label>
                        <input type="text" disabled name="projectNameDisabled" value={formData.projectName} placeholder="Project Name" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Project Description</span>
                        </label>
                        <input type="text" disabled name="projectDescriptionDisabled" value={formData.projectDescription} placeholder="Project Description" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>

                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Client</span>
                        </label>
                        <input type="text" disabled name="clientDisabled" value={formData.client} placeholder="Client" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs pr-8">
                        <label className="label">
                            <span className="label-text">Contractor</span>
                        </label>
                        <input type="text" disabled name="contractorDisabled" value={formData.contractor} placeholder="Contractor" className="input input-bordered input-primary w-full max-w-xs" />
                    </div>
                </div>
                <div className="flex justify-center mt-10 mb-10">
                    <label className="label">
                        {
                            uploading == false && <span className="label-text text-red-500">Upload CSV Or Do The Input Manually</span>
                        }
                        {
                            uploading == true && <span className="label-text text-green-500">Uploaded</span>
                        }

                    </label>
                    <input type="file" accept=".csv" className="file-input file-input-bordered file-input-accent w-full max-w-xs" onChange={(e) => handleCsvUpload(e.target.files[0])} />

                </div>
                {
                    uploading == true && <div className='flex justify-center mt-10 mb-10'><Chart data={chartData} /></div>
                }

                <div className="flex flex-col justify-center custom-responsive-for-max-min">
                    <div className="sm:ml-20 sm:justify-center sm:align-middle  mt-10  sm:flex">
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Maximum  Value Of X<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.max_X} name="max_X" placeholder="Maximum  Value Of X" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Minimum Value Of X<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.min_X} name="min_X" placeholder="Minimum Value Of X" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="sm:ml-20 sm:justify-center sm:align-middle  mt-10  sm:flex">
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Maximum  Value Of Y<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.max_Y} name="max_Y" placeholder="Maximum  Value Of Y" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Minimum Value Of Y<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.min_Y} name="min_Y" placeholder="Minimum Value Of Y" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="sm:ml-20 sm:justify-center sm:align-middle  mt-10 sm:flex">
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Maximum  Value Of Z<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.max_Z} name="max_Z" placeholder="Maximum  Value Of Z" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs pr-8">
                            <label className="label">
                                <span className="label-text">Minimum Value Of Z<span className="text-red-500">*</span></span>
                            </label>
                            <input type="number" onChange={handleInputChange} value={formData.min_Z} name="min_Z" placeholder="Minimum Value Of Z" className="input input-bordered input-primary w-full max-w-xs" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-10 mb-10">
                    <button onClick={handleSaveFormData} className="btn btn-outline btn-accent btn-sm">Submit</button>
                </div>
            </div>

        </>
    );
};
StepTwo.propTypes = {
    formData: PropTypes.object,
    initialFormData: PropTypes.object,
    handleInputChange: PropTypes.func,
    setFormData: PropTypes.func,
    setStep: PropTypes.func,
}
export default StepTwo;