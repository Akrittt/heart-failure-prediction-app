import React from "react";
import Img from "../../assets/doctor2.png";
import { MoveRight } from 'lucide-react';
function AboutUs() {
    return (
        <div id="AboutUs" className="bg-gradient-to-l bg-sky-100 to-slate-50">

            <h2 className="font-bold text-center text-3xl pt-10">About Us</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center px-10 text-md ">
                
                    <img src={Img}
                        className="lg:h-auto h-80 hidden lg:block" />
    
                <div className="flex flex-col items-center xl:px-20 pl-10 content-center justify-center ">
                    <p className=" text-gray-500 md:py-4 lg:py-8">"At HeartCare AI, we are passionate about transforming healthcare through intelligent, data-driven solutions. Our platform is designed to predict the risk of hospital readmission in patients suffering from heart failure, a critical challenge faced by both hospitals and patients around the world."<br /><br />"Using advanced machine learning algorithms trained on real-world medical data, our system provides accurate, real-time predictions to help healthcare professionals make timely, proactive decisions. This can lead to better resource allocation, personalized treatment strategies, and most importantly—improved patient outcomes."</p>
                    <button
                        className="flex content-center gap-3 bg-sky-600 px-8 py-2 text-white rounded-xl hover:bg-sky-800 mx-auto">
                        Learn More
                        <MoveRight className="size-6" />
                    </button>
                    <div className=" py-8 gap-x-20 flex lg:hidden mx-auto">
                        <div className="basis = 1/2 text-center">
                            <h2 className="text-sky-600 text-2xl pt-1 font-bold relative z-10">200+</h2>
                            <p className="text-blue-950 font-bold text-xl  relative z-10">Expert Doctors</p>
                        </div>
                        <div className="basis = 1/2 text-center">
                            <h2 className="text-sky-600 text-2xl pt-1 font-bold relative z-10">90%</h2>
                            <p className="text-blue-950 font-bold text-xl relative z-10">Accuracy</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;