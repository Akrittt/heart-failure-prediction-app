import React from "react";
import doctorImg from "../../assets/doctor.png";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Card from "./card";

function Home(){
    return(
        <div className="flex flex-row">
            <div className="flex flex-col basis-3/5 justify-center gap-7 pl-13 ">
                <div>
                    <h1 className="font-bold text-6xl text-blue-950">Comprehensive Care For</h1>
                    <h1 className="font-bold text-6xl text-blue-950">A Healthier Tommorow</h1>
                </div>
                <div>
                    <p className=" text-xl">
                        Our application offers an intelligent prediction system for heart failure patient readmission. Empowering healthcare providers with data-driven insights to improve post-discharge outcomes with AI assistant. </p>
                </div>
                <div className="flex flex-row gap-x-6">
                    <button 
                        className=" bg-sky-500 text-white text-xl px-5 py-2 rounded-3xl"
                        > Predict
                    </button>
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
                <div className="flex gap-6">
                    <Card count = '90%' label = 'Accuracy' />
                    <Card count = '200+' label = 'Expert Doctors' />
                </div>
            </div>
            <div className=''>
                <img
                    src = {doctorImg}
                    className="h-150 w-160 " 
                    
                />
            </div>
        </div>
    );
}
export default Home;