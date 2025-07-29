import React from "react";
import search from "../../assets/searchassist.png"
import summarizer from "../../assets/summarizar.png";
import prediction from "../../assets/prediction.png";
import education from "../../assets/education.png";
import report from "../../assets/generator.png";
import CardSlider from "./CardSlider";

function ServicesOverview() {
    const cardData = [
        { image: search, title: "Search Assistant" },
        { image: summarizer, title: "Discharge Instruction" },
        { image: prediction, title: "Prediction" },
        { image: education, title: "Health Tips" },
        { image: report, title: "Report Generator" }
    ]
    return (
        <div id="ServicesOverview" className="bg-gradient-to-t bg-sky-50 to-slate-50 ">

            <h2 className="text-center font-bold text-3xl  pt-8">
                Services <span className="">Overview</span>
            </h2>

            <CardSlider cards={cardData} />



        </div>
    );
}
export default ServicesOverview;