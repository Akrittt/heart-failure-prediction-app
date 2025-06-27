import React from "react";
import CardService from "./CardService";
import search from "../../assets/searchassist.png"
import summarizer from "../../assets/summarizar.png";
import prediction from "../../assets/prediction.png";
import chatbox from "../../assets/chatbox.png";
import education from "../../assets/education.png";
import report from "../../assets/generator.png";
import CardSlider from "./CardSlider";

function ServicesOverview(){
    const cardData = [
        {image:search,title:"Search Assistant"},
        {image:summarizer,title:"Discharge Instruction"},
        {image:prediction,title:"Prediction"},
        {image:chatbox,title:"Patient Chatbox"},
        {image:education,title:"Health Tips"},
        {image:report,title:"Report Generator"}
    ]
    return(
    <div className="">
        <div className="bg-white text-center ">
            <h2 className="font-medium text-4xl text-sky-800 py-5">
                Services Overview
            </h2>
        </div>
        
        <CardSlider cards={cardData}/>

    </div>
    );
}
export default ServicesOverview;