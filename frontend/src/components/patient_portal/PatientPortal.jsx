function PatientPortal(){
    return(
        <div id="PatientPortal">
            <div className="bg-sky-50 text-center border-y-1 border-sky-100 ">
                <h2 className="font-bold text-4xl text-sky-900 py-4">Patient Portal</h2>
            </div>
            <div className="flex flex-col lg:flex-row  justify-center h-full mx-5">   
                <div className="basis-1/2 content-center p-6 ">
                    <p className="text-lg text-center text-sky-700 ">"The Patient Portal allows you to securely view your readmission risk prediction, track your health progress, and access personalized recommendations. Designed to help you stay in control of your heart health."</p>
                </div>

                <div className="basis-1/2 flex flex-col gap-3 justify-center items-center py-10 w-full ">
                    <input 
                    type="text"
                    placeholder="Patient ID"
                    className="bg-gray-50 md:w-3/5 text-lg border-sky-500/30 border-y-2 text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <input 
                    type="text"
                    placeholder="Password"
                    className="bg-gray-50 md:w-3/5 text-lg  border-sky-500/30 border-y-2 text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <button
                    className="bg-sky-700 text-white text-lg rounded-xl px-8 py-3 mt-3 shadow-lg/50 shadow-sky-800 hover:bg-sky-900"
                    >Login to your portal</button>
                </div>
            </div>
        </div>
    );
}
export default PatientPortal;