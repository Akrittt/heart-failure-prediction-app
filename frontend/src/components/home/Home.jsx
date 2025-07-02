import React, { useState } from "react";
import Inputform from "../predict_form/Inputform.jsx";
import doctorImg from "../../assets/doctor.png";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Card from "./card";

function Home(){
   const [isPredictFormOpen, setIsPredictFormOpen] = useState(false);
    return(
        <div id="Home" className="grid justify-center lg:flex  md:flex-nowrap">
            <div className="flex flex-col md:basis-1/2 justify-center text-center gap-7 p-5 md:p-20  ">
                <div>
                    <h1 className="font-bold text-5xl md:text-6xl text-blue-950">Comprehensive Care For</h1>
                    <h1 className="font-bold text-5xl md:text-6xl text-blue-950">A Healthier Tommorow</h1>
                </div>
                <div>
                    <p className=" text-xl">
                        Our application offers an intelligent prediction system for heart failure patient readmission. Empowering healthcare providers with data-driven insights to improve post-discharge outcomes with AI assistant. </p>
                </div>
                <div className="flex justify-center  gap-x-4 md:gap-x-8">
                    <button 
                        onClick={() => setIsPredictFormOpen(true)}
                        className=" bg-sky-500 text-white text-xl px-14 py-2 rounded-3xl hover:bg-sky-700"
                        > Predict
                    </button>
                    {isPredictFormOpen&&(
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 overflow-auto" >
                            <Inputform onClose ={()=>setIsPredictFormOpen(false)}/>
                        </div>
                    )}

                    <div className="flex flex-row justify-center items-center ">
                        <input
                        type="text"
                        placeholder="Find a Doctor "
                        className="font-bold focus:outline-none"
                    />
                    <MagnifyingGlassIcon
                        className="h-5"    
                    />
                    </div>
                </div>
                <div className="flex justify-center  gap-6">
                    <Card count = '90%' label = 'Accuracy' />
                    <Card count = '200+' label = 'Expert Doctors' />
                </div>
            </div>
            <div className='flex justify-center basis-3/5 md:basis-1/2'>
                <img
                    src = {doctorImg}
                    className="h-100  md:h-200 " 
                    
                />
            </div>
        </div>
    );
}
export default Home;