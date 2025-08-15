import React, { useState, useEffect } from "react";
import Inputform from "../predict_form/Inputform.jsx";
import doctorImg from "../../assets/doctor.png";
import { UserSearch } from "lucide-react";
import Card from "./Card.jsx";

function Home() {
    const [isPredictFormOpen, setIsPredictFormOpen] = useState(false);
    useEffect(() => {
        if (isPredictFormOpen) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = "auto"; // Enable scroll
        }
    }, [isPredictFormOpen]);
    return (
        <section id="Home" className="grid justify-center lg:flex  md:flex-nowrap ">
            <div className="flex flex-col justify-center text-center gap-7 p-5 md:p-20 ">
                <h1 className="font-bold text-4xl md:text-5xl text-gray-800 ">
                    Heart<span className="text-sky-500">Care.ai</span>
                </h1>
                <h1 className="font-bold text-4xl md:text-5xl text-gray-800 ">
                    Comprehensive Care for a Healthier Tomorow
                </h1>
                <p className=" text-lg text-gray-600">
                    HeartCare.ai provides AI-powered predictions for heart failure readmission, empowering healthcare providers with actionable insights to improve post-discharge outcomes.
                </p>
                <div className="flex justify-center gap-x-4 md:gap-x-2">
                    <button
                        onClick={() => setIsPredictFormOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-7 py-2 rounded-lg font-medium transition-colors duration-200 mr-4"
                    > Predict
                    </button>
                    {isPredictFormOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 overflow-auto" >
                            <Inputform onClose={() => setIsPredictFormOpen(false)} />
                        </div>
                    )}

                    <div className="flex flex-row justify-center items-center border-2 border-gray-200 px-6 py-2 rounded-lg ">
                        <input
                            type="text"
                            placeholder="Find a Doctor "
                            className="font-bold focus:outline-none"
                        />
                        <UserSearch
                            className="h-5"
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-x-6">
                    <Card count='90%' label='Accuracy' />
                    <Card count='200+' label='Expert Doctors' />
                </div>
            </div>
            <div className='flex justify-center'>
                <img
                    src={doctorImg}
                    className="h-150 md:h-200 lg:h-auto lg:w-auto mx-auto"

                />
            </div>
        </section>
    );
}
export default Home;