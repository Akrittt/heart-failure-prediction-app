function PatientPortal(){
    return(
        <div id="PatientPortal">
            <div className="bg-gradient-to-b bg-sky-100 to-slate-50 text-center ">
                <h2 className="font-bold text-3xl pt-10">Patient Portal</h2>
            </div>
            <div className="flex flex-col lg:flex-row text-md text-blue-900  justify-center h-full mx-5">   
                <div className="basis-1/2 content-center p-6 ">
                    <p className=" text-center  ">"The Patient Portal allows you to securely view your readmission risk prediction, track patients health progress, and access personalized recommendations. Designed to help stay in control of patient's heart health."</p>
                </div>

                <div className="basis-1/2 flex flex-col gap-3 justify-center items-center py-10 w-full ">
                    <input 
                    type="text"
                    placeholder="Patient ID"
                    className="bg-gray-50 md:w-3/5  border-gray-300 border-2 text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <input 
                    type="text"
                    placeholder="Password"
                    className="bg-gray-50 md:w-3/5  border-gray-300 border-2 text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <button
                    className="bg-blue-600 text-white rounded-xl px-8 py-3 mt-3 hover:bg-blue-700"
                    >Login to your portal</button>
                </div>
            </div>
        </div>
    );
}
export default PatientPortal;