import React from "react";
import Img from "../../assets/doctor2.png";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
function AboutUs(){
    return(
        <div>
            <div className="bg-sky-50 text-center ">
                <h2 className="font-medium text-4xl text-sky-800 py-5">About Us</h2>
            </div>
            <div className="flex flex-row bg-gradient-to-b bg-sky-100 to-white">
                <div>
                    <img src = {Img}
                    className="h-150 basis-2/5 pl-10"/>
                </div>
                <div className="basis-3/5 flex flex-col items-center px-12 content-center justify-center">
                        <p className="text-blue-900 text-lg  py-8">"At HeartCare AI, we are passionate about transforming healthcare through intelligent, data-driven solutions. Our platform is designed to predict the risk of hospital readmission in patients suffering from heart failure, a critical challenge faced by both hospitals and patients around the world."<br/><br/>"Using advanced machine learning algorithms trained on real-world medical data, our system provides accurate, real-time predictions to help healthcare professionals make timely, proactive decisions. This can lead to better resource allocation, personalized treatment strategies, and most importantly—improved patient outcomes."</p>
                    <button 
                        className="flex content-center gap-3 bg-sky-600 px-15 py-2 text-white rounded-3xl hover:bg-sky-800">
                        Learn More 
                        <ArrowLongRightIcon className="h-6"/>
                    </button>
                    <div className=" flex py-8 gap-x-20">
                        <div className="basis = 1/2 text-center">
                            <h2 className="text-sky-600 text-3xl pt-1 font-bold relative z-10">90%</h2>
                            <p className="text-blue-950 font-bold text-xl relative z-10">Accuracy</p>
                        </div>
                        <div className="basis = 1/2 text-center">
                            <h2 className="text-sky-600 text-3xl pt-1 font-bold relative z-10">200+</h2>
                            <p className="text-blue-950 font-bold text-xl  relative z-10">Expert Doctors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;