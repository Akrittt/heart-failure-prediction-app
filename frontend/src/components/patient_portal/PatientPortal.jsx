function PatientPortal(){
    return(
        <div id="PatientPortal">
            <div className="bg-sky-50 text-center border-y-1 border-gray-200/50 ">
                <h2 className="font-medium text-4xl text-sky-800 py-4">Patient Portal</h2>
            </div>
            <div className="flex flex-wrap md:flex-wrap-reverse justify-center  h-full">
                
                <div className="content-center md:basis-1/2 p-6 md:p-12">
                    <p className="text-lg text-center text-sky-700 ">"The Patient Portal allows you to securely view your readmission risk prediction, track your health progress, and access personalized recommendations. Designed to help you stay in control of your heart health."</p>
                </div>

                <div className="flex flex-col gap-3 md:basis-1/2 justify-center items-center pb-10 md:p-12 ">
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
                    className="bg-sky-500 text-white text-lg rounded-3xl px-8 py-3 mt-3 shadow-lg/50 shadow-sky-500 hover:bg-sky-700"
                    >Login to your portal</button>
                </div>
            </div>
        </div>
    );
}
export default PatientPortal;