import axios from "axios" ;  
import Checkup from "../models/Checkup.js";
import dotenv from "dotenv"
dotenv.config();
import express,{Router} from "express" ;

const router = express.Router();
router.post('/', async(req,res)=>{
  const formData = req.body;

  try {
    const apiResponse = await axios.post(
      process.env.MODEL_API_URI,
      {data:formData} 
    );

    const predictionResult = apiResponse.data;
    const newCheckup = new Checkup({ ...formData, predictionResult });
    await newCheckup.save();

    res.json({sucess:true, result:predictionResult})

  } catch (error) {
    console.error("APi called failed", error.message);
    res.status(500).json({ success: false, error: "Failed to get prediction" });
  }
})

export default router;

// const predictAndSave = async (req, res) => {
//   try {
//     const formData = req.body;

//     // Step 1: Send to ML API
//     const predictionResponse = await axios.post(
//       process.env.MODEL_API_URI,
//       formData,
//       {
//         headers: {"Content-Type": "application/json"}}
        
//     );

//     const prediction = predictionResponse.data.prediction;

//     // Step 2: Save to DB
//     const newCheckup = new Checkup({ ...formData, prediction });
//     await newCheckup.save();

//     // Step 3: Return to frontend
//     res.status(200).json({ success: true, prediction });

//   } catch (error) {
//     console.error("Prediction Error:", error);
//     res.status(500).json({ success: false, message: "Prediction failed." });
//   }
// };


