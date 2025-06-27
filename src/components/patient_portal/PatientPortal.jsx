function PatientPortal(){
    return(
        <div>
            <div className="bg-sky-50 text-center ">
                <h2 className="font-medium text-4xl text-sky-800 py-4">Patient Portal</h2>
            </div>
            <div className="flex flex-row bg-sky-100/70 h-80">
                <div className="flex flex-col gap-3 basis-1/2 justify-center items-center pl-10  ">
                    <input 
                    type="text"
                    placeholder="Patient ID"
                    className="bg-gray-50 w-3/5 text-lg  text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <input 
                    type="text"
                    placeholder="Password"
                    className="bg-gray-50 w-3/5 text-lg  text-gray-900 font-medium p-3.5 rounded-xl focus:outline-none shadow-lg/20"
                    />
                    <button
                    className="bg-sky-500 text-white text-lg rounded-3xl px-8 py-3 mt-3 shadow-lg/50 shadow-sky-500 hover:bg-sky-700"
                    >Login to your portal</button>
                </div>
                <div className="grid place-items-center basis-1/2 p-10">
                    <p className="text-lg  text-center text-sky-700 pr-40 pb-15 ">"The Patient Portal allows you to securely view your readmission risk prediction, track your health progress, and access personalized recommendations. Designed to help you stay in control of your heart health."</p>
                </div>
            </div>
        </div>
    );
}
export default PatientPortal;