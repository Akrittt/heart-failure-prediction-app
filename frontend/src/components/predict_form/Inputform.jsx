import React,{useState, useEffect} from "react";
import axios from "axios" ; 
import PredictionGauge from "./PredictionGauge.jsx"; // Adjust the import path as necessary

const Inputform = ({onClose}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(50);
  const[message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numerical inputs, ensure only valid floating-point numbers are accepted
    if (e.target.type === "number" && value !== "") {
      // Allow empty string, digits, a single decimal point, and prevent multiple decimal points
      const isValid = /^-?\d*\.?\d*$/.test(value);
      if (!isValid) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };  


  const handleSubmit = async (e) => {
  e.preventDefault(); // prevent form reload
  
  const formattedData = {
    ...formData,
      patient_name: formData.patient_name || '',
      patient_id: formData.patient_id || '',

      // Format datetime fields to "YYYY-MM-DD HH:mm:ss"
      admit_time: formData.admit_time
      ? formData.admit_time.replace('T', ' ') + ':00'
      : '',
      discharge_time: formData.discharge_time
      ? formData.discharge_time.replace('T', ' ') + ':00'
      : '',

      // Numerical values
      creatinine: parseFloat(formData.creatinine),
      urea_nitrogen: parseFloat(formData.urea_nitrogen),
      sodium: parseFloat(formData.sodium),
      potassium: parseFloat(formData.potassium),
      albumin: parseFloat(formData.albumin),
      hemoglobin: parseFloat(formData.hemoglobin),
      hematocrit: parseFloat(formData.hematocrit),
      magnesium: parseFloat(formData.magnesium),

      // Flags for each parameter
      creatinine_flag: formData.creatinine_flag || '',
      urea_nitrogen_flag: formData.urea_nitrogen_flag || '',
      sodium_flag: formData.sodium_flag || '',
      potassium_flag: formData.potassium_flag || '',
      albumin_flag: formData.albumin_flag || '',
      hemoglobin_flag: formData.hemoglobin_flag || '',
      hematocrit_flag: formData.hematocrit_flag || '',
      magnesium_flag: formData.magnesium_flag || '',

      // Additional patient metadata
      admission_type: formData.admission_type || '',
      discharge_location: formData.discharge_location || '',
      insurance: formData.insurance || ''
  };
  console.log("Sending data:", formattedData);

  
  try {
    const response = await axios.post('https://heart-failure-prediction-app.onrender.com/api/predict', formattedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

    const data = response.data;

    // You can store it in state, show modal, etc.
    setPrediction(data.probability*100);
    setMessage(data.verdict || "Prediction successful!");
    console.log("Prediction set to:", prediction);

  } catch (err) {
    console.error("Submission error:", err);
  }
  
  
};
  
  return(
    <div className="fixed inset-0 bg-gray-200/30 backdrop-blur-sm flex items-center  justify-center z-50">
      <div className="h-screen flex bg-gray-400/40 backdrop-blur-sm items-center justify-center rounded-l-2xl shadow-2xl shadow-gray-800  p-5  max-h-[95vh] relative">
        <PredictionGauge percentage={prediction} message={message} />
      </div>
        
      {/* Checkup Modal */}
      <div className="bg-gradient-to-b bg-sky-100 via-white to-sky-100 rounded-r-xl shadow-2xl shadow-gray-800  p-5 w-full max-w-lg flex flex-col max-h-[95vh] relative">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
         <div >
            <button className="absolute top-2 right-3 text-gray-500 text-3xl hover:text-sky-500" onClick={onClose}>&times;</button>
            <h2 className='text-3xl font-bold text-sky-900 pb-5'>Medical Checkup Form</h2>
         </div>
          
          <form  id="checkup-form" onSubmit={handleSubmit} className="flex flex-col justify-center">

              <div id='Essential'>
                <p className="text-center font-semibold">Essential</p>
                <div className=" border-t border-black text-center"></div>

                {/* Name */}
                <div className='flex justify-start gap-3 pb-2 '>
                <div className="basis-1/2 text-start">
                  <p className="font-semibold text-start">Full Name</p>
                  <input 
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 "
                  name="patient_name" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Name"
                  />
                </div>
                
                <div className="basis-1/2 text-start">
                  <p className="font-semibold text-start">ID</p>
                  <input 
                  type="number" 
                  name="patient_id" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter ID"
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2"
                  />
                </div>
                </div>

               {/* Creatinine */}
                <div className="font-semibold text-start pb-2">
                <p>Creatinine </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full"
                  type="number" 
                  name="creatinine" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter creatinine value"
                  min="0"
                  step="any" 
                  />

                  <select name="creatinine_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg " required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>

                {/* Urea Nitrogen */}
                <div className="font-semibold text-start pb-2">
                <p>Urea Nitogen </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="urea_nitrogen" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Urea Nitrogen value"
                  min="0"
                  step="any" 
                  />

                  <select name="urea_nitrogen_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg " required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>              

               {/* Sodium */}
              <div className="font-semibold text-start pb-2">
                <p>Sodium </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="sodium" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Sodium value"
                  min="0"
                  step="any" 
                  />

                  <select name="sodium_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg" required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>

               {/* potassium*/}
               <div className="font-semibold text-start pb-2">
                <p>Potassium </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="potassium" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Potassium value"
                  min="0"
                  step="any" 
                  />

                  <select name="potassium_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg " required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>
              
               {/* albumin*/}
              <div className="font-semibold text-start pb-2">
                <p>Albumin </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="albumin" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Albumin value"
                  min="0"
                  step="any" 
                  />

                  <select name="albumin_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg" required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
              </div>
               
               {/* Hemoglobin */}
               <div className="font-semibold text-start pb-2">
                <p>Hemoglobin </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="hemoglobin" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Hemoglobin value"
                  min="0"
                  step="any" 
                  />

                  <select name="hemoglobin_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg " required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>

               {/* Hematocrit */}
               <div className="font-semibold text-start pb-2">
                <p>Hematocrit </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="hematocrit" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Hematocrit value"
                  min="0"
                  step="any" 
                  />

                  <select name="hematocrit_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg " required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
                </div>

              {/*Magnesium */}
              <div className="font-semibold text-start pb-5">
                <p>Magnesium </p>
                <div className="flex gap-5">
                  <input
                  className="focus:outline-0 border-gray-300 border-1 rounded-lg p-2 w-full "
                  type="number" 
                  name="magnesium" 
                  required 
                  onChange={handleChange}
                  placeholder="Enter Magnesium value"
                  min="0"
                  step="any" 
                  />

                  <select name="magnesium_flag" className="focus:outline-0  border-gray-300 border-1 p-2 rounded-lg" required onChange={handleChange}>
                    <option value="" disabled selected hidden>--Select--</option>
                    <option value="normal">normal</option>
                    <option value="abnormal">abnormal</option>
                    <option value="delta">delta</option>
                  </select>
                  
                </div>
              </div>

              </div>

              {/*Additional info. */}
              <div className='non-essential'>
                <h3 className='section-heading font-semibold'>Additional Information</h3>
                <div className=" border-t border-black text-center  "></div>

              <div className="flex">
                {/* Admission Type */}
                <div className='flex gap-5 justify-center text-center p-2 items-center'>
                  <p className="font-semibold pb-2 content-center">Admission Type</p>
                    <select name="admission_type" required className="focus:outline-0 font-semibold  border-gray-300 border-1 p-2 rounded-lg " onChange={handleChange}>
                      <option value="" disabled selected hidden>--Select--</option>
                      <option value="ELECTIVE">ELECTIVE</option>
                      <option value="EMERGENCY">EMERGENCY</option>
                      <option value="URGENT">URGENT</option>
                      <option value="NEWBORN">NEWBORN</option>
                    </select>
                </div>

                {/* Insurance */}
                <div className='flex gap-5 justify-center text-center p-2 items-center'>
                  <p className="font-semibold pb-2 ">Insurance</p>
                    <select name="insurance" required className="focus:outline-0 font-semibold  border-gray-300 border-1 p-2 rounded-lg "  onChange={handleChange}>
                      <option value="" disabled selected hidden>--Select--</option>
                      <option value="Private">Private</option>
                      <option value="Self Pay">Self Pay</option>
                      <option value="Medicare">Medicare</option>
                      <option value="Medicaid">Medicaid</option>
                      <option value="Government">Government</option>
                    </select>
                </div>
              </div>
                
                {/* Date/Time */}
                <div className='flex gap-5  text-center p-2 items-center justify-center'>
                  <p className="font-semibold pb-2">Admit Date and Time</p>
                    <input 
                      className="focus:outline-0 font-semibold  border-gray-300 border-1 p-2 rounded-lg "
                      type="datetime-local" 
                      name="admit_time" 
                      required 
                      placeholder='     YYYY-MM-DD    '
                      onChange={handleChange}
                    />      
                </div>

                {/* Discharge Location */}
                <div className='flex gap-5 justify-center text-center p-2 items-center '>
                  <p className="font-semibold pb-2">Discharge Location</p>                  
                    <select name="discharge_location" required className="focus:outline-0 font-semibold  border-gray-300 border-1 p-2 rounded-lg " onChange={handleChange}>
                      <option value="" disabled selected hidden>--Select--</option>
                      <option value="HOME">HOME</option>
                      <option value="HOME HEALTH CARE">HOME HEALTH CARE</option>
                      <option value="SNF">SNF</option>
                      <option value="SHORT TERM HOSPITAL">SHORT TERM HOSPITAL</option>
                      <option value="REHAB/DISTINCT PART HOSP">REHAB/DISTINCT PART HOSP</option>
                      <option value="OTHER FACILITY">OTHER FACILITY</option>
                    </select>
                </div>
                

                {/* Discharge time */}
                <div className='flex gap-5  text-center p-2 items-center justify-center'>
                  <p className="font-semibold pb-2">Discharge Date and Time</p>
                    <input 
                      className="focus:outline-0 font-semibold  border-gray-300 border-1 p-2 rounded-lg "
                      type="datetime-local" 
                      name="discharge_time" 
                      required 
                      placeholder='YYYY-MM-DD'
                      onChange={handleChange}
                    />
                </div>
              </div>

              

              {/* Buttons */}
              <div className="flex gap-10 justify-center">
                <button type="submit" 
                  className="bg-sky-400 rounded-xl px-8 py-3 hover:bg-sky-800 text-white border-2" form="checkup-form" disabled={loading}>
                  Submit
                </button>
                <button type="button" 
                className="bg-red-700 rounded-xl px-8 py-3 hover:bg-red-900 text-white border-2"
                onClick={onClose}>
                  Cancel
                </button>
                
              </div>
          </form>

        </div>

      </div>

    </div>


    );
}

export default Inputform;