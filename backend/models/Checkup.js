import mongoose from "mongoose";

const checkupSchema = new mongoose.Schema({
  patient_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  patient_id: {
    type: Number,
    required: true
  },
  
  admit_time: {
    type: Date,
    required: true
  },
  discharge_time: {
    type: Date,
    required: true
  },

  // Lab values (all integers, as per your API expectation)
  creatinine: { type: Number, required: true },
  urea_nitrogen: { type: Number, required: true },
  sodium: { type: Number, required: true },
  potassium: { type: Number, required: true },
  albumin: { type: Number, required: true },
  hemoglobin: { type: Number, required: true },
  hematocrit: { type: Number, required: true },
  magnesium: { type: Number, required: true },

  // Flags (normal/abnormal/delta)
  creatinine_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  urea_nitrogen_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  sodium_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  potassium_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  albumin_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  hemoglobin_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  hematocrit_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },
  magnesium_flag: { type: String, enum: ["normal", "abnormal", "delta"], required: true },

  // Patient metadata
  admission_type: {
    type: String,
    enum: ["ELECTIVE", "EMERGENCY", "URGENT", "NEWBORN"],
    required: true
  },
  discharge_location: {
    type: String,
    enum: [
      "HOME",
      "HOME HEALTH CARE",
      "SNF",
      "SHORT TERM HOSPITAL",
      "REHAB/DISTINCT PART HOSP",
      "OTHER FACILITY"
    ],
    required: true
  },
  insurance: {
    type: String,
    enum: ["Private", "Self Pay", "Medicare", "Medicaid", "Government"],
    required: true
  },

  // Prediction result (optional, if saving)
  prediction: {
    type: String
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

const Checkup = mongoose.model("Checkup", checkupSchema);
export default Checkup;
