import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PredictionGauge = ({ percentage, message }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 500; // 1s
    const increment = percentage / (duration / 40);
    const timer = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        start = percentage;
        clearInterval(timer);
      }
      setDisplayValue(parseFloat(start.toFixed(1)));
    }, 1);
    return () => clearInterval(timer);
  }, [percentage]);

  // Color logic based on risk
  const getColor = () => {
    if (percentage < 15) return "text-green-500";
    if (percentage < 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-40">
        {/* Circle background */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="transparent"
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            stroke={
              percentage < 15
                ? "#22c55e"
                : percentage < 70
                ? "#eab308"
                : "#ef4444"
            }
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={
              2 * Math.PI * 70 * (1 - displayValue / 100)
            }
            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
            animate={{
              strokeDashoffset:
                2 * Math.PI * 70 * (1 - percentage / 100),
            }}
            transition={{ duration: 1 }}
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            <motion.span
              key={displayValue}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`text-4xl font-extrabold ${getColor()}`}
            >
              {displayValue}%
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-4 text-gray-900 text-md font-semibold">
        Probability of readmission : {percentage}% <br />
        {message}
      </p>

    
    </div>

    
  );
};

export default PredictionGauge;
