import React, { useState } from 'react';

// Sample patient data
const patientDatabase = {
  'PAT001': {
    password: 'patient123',
    name: 'John Alexander Smith',
    dob: 'March 15, 1985',
    gender: 'Male',
    bloodType: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Oak Street, Medical City, MC 12345',
    emergencyContact: 'Jane Smith - (555) 987-6543',
    primaryDoctor: 'Dr. Sarah Johnson, MD',
    insurance: 'HealthCare Plus Premium',
    allergies: 'Penicillin, Shellfish',
    medications: 'Lisinopril 10mg, Metformin 500mg',
    height: '5\'10" (178 cm)',
    weight: '175 lbs (79 kg)',
    bmi: '25.1 (Normal)',
    lastVisit: 'July 22, 2025',
    appointments: [
      {
        date: 'August 15, 2025',
        time: '10:30 AM',
        doctor: 'Dr. Sarah Johnson',
        type: 'Annual Check-up',
        status: 'confirmed'
      },
      {
        date: 'September 3, 2025',
        time: '2:15 PM',
        doctor: 'Dr. Michael Chen',
        type: 'Cardiology Consultation',
        status: 'pending'
      }
    ]
  },
  'PAT002': {
    password: 'health456',
    name: 'Emily Rose Johnson',
    dob: 'November 8, 1992',
    gender: 'Female',
    bloodType: 'O-',
    phone: '+1 (555) 234-5678',
    email: 'emily.johnson@email.com',
    address: '456 Pine Avenue, Health City, HC 54321',
    emergencyContact: 'Michael Johnson - (555) 876-5432',
    primaryDoctor: 'Dr. Robert Williams, MD',
    insurance: 'MediCare Standard',
    allergies: 'Latex, Pollen',
    medications: 'Birth Control, Vitamin D',
    height: '5\'6" (168 cm)',
    weight: '140 lbs (64 kg)',
    bmi: '22.6 (Normal)',
    lastVisit: 'June 10, 2025',
    appointments: [
      {
        date: 'August 20, 2025',
        time: '9:00 AM',
        doctor: 'Dr. Robert Williams',
        type: 'Routine Physical',
        status: 'confirmed'
      }
    ]
  }
};

// Login Form Component
const LoginForm = ({ onLogin, error }) => {
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onLogin(patientId, password);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Patient Portal</h1>
        <p className="text-gray-600 text-center mb-8">Secure access to your health information</p>
        
        {/* Login Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Patient ID</label>
            <input 
              type="text" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter your Patient ID" 
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white/90 hover:-translate-y-0.5"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-300 bg-white/90 hover:-translate-y-0.5"
            />
          </div>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            Sign In
          </button>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="text-red-700">
                <p className="font-medium">Invalid Patient ID or password. Please try again.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <div className="text-sm text-blue-800 space-y-1">
            <p>ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded">PAT001</span>, Password: <span className="font-mono bg-blue-100 px-2 py-1 rounded">patient123</span></p>
            <p>ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded">PAT002</span>, Password: <span className="font-mono bg-blue-100 px-2 py-1 rounded">health456</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Section Component
const InfoSection = ({ title, icon, bgColor, borderColor, children }) => (
  <div className={`${bgColor} p-6 rounded-2xl border-l-4 ${borderColor} hover:shadow-lg transition-shadow duration-300`}>
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      {title}
    </h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

// Info Item Component
const InfoItem = ({ label, value, valueClassName = "font-bold text-gray-800" }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200/50 last:border-b-0">
    <span className="font-semibold text-gray-600">{label}:</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

// Appointment Card Component
const AppointmentCard = ({ appointment }) => {
  const statusClass = appointment.status === 'confirmed' 
    ? 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold'
    : 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold';

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-gray-800 text-lg">{appointment.date} at {appointment.time}</div>
          <div className="text-gray-600 mt-1">{appointment.type} with {appointment.doctor}</div>
        </div>
        <span className={statusClass}>{appointment.status.toUpperCase()}</span>
      </div>
    </div>
  );
};

// Dashboard Header Component
const DashboardHeader = ({ patientName, onLogout }) => (
  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center relative">
    <h1 className="text-3xl font-bold mb-2">Welcome back, {patientName.split(' ')[0]}!</h1>
    <p className="text-blue-100">Your health information dashboard</p>
    <button 
      onClick={onLogout}
      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:ring-4 focus:ring-red-200 active:scale-95"
    >
      Sign Out
    </button>
  </div>
);

// Patient Dashboard Component
const PatientDashboard = ({ patient, patientId, onLogout }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        <DashboardHeader patientName={patient.name} onLogout={onLogout} />
        
        <div className="p-8">
          {/* Patient Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Personal Information */}
            <InfoSection 
              title="Personal Information" 
              icon="👤" 
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
              borderColor="border-blue-500"
            >
              <InfoItem label="Full Name" value={patient.name} />
              <InfoItem 
                label="Patient ID" 
                value={patientId} 
                valueClassName="font-mono font-bold text-gray-800 bg-blue-200 px-2 py-1 rounded"
              />
              <InfoItem label="Date of Birth" value={patient.dob} />
              <InfoItem label="Gender" value={patient.gender} />
              <InfoItem 
                label="Blood Type" 
                value={patient.bloodType} 
                valueClassName="font-bold text-red-600 bg-red-100 px-2 py-1 rounded"
              />
            </InfoSection>
            
            {/* Contact Information */}
            <InfoSection 
              title="Contact Information" 
              icon="📧" 
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
              borderColor="border-green-500"
            >
              <InfoItem label="Phone" value={patient.phone} />
              <InfoItem label="Email" value={patient.email} />
              <InfoItem label="Address" value={patient.address} />
              <InfoItem label="Emergency Contact" value={patient.emergencyContact} />
            </InfoSection>
            
            {/* Medical Information */}
            <InfoSection 
              title="Medical Information" 
              icon="🏥" 
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
              borderColor="border-purple-500"
            >
              <InfoItem label="Primary Doctor" value={patient.primaryDoctor} />
              <InfoItem label="Insurance" value={patient.insurance} />
              <InfoItem 
                label="Allergies" 
                value={patient.allergies} 
                valueClassName="font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded"
              />
              <InfoItem label="Medications" value={patient.medications} />
            </InfoSection>
            
            {/* Health Metrics */}
            <InfoSection 
              title="Health Metrics" 
              icon="📊" 
              bgColor="bg-gradient-to-br from-indigo-50 to-indigo-100"
              borderColor="border-indigo-500"
            >
              <InfoItem label="Height" value={patient.height} />
              <InfoItem label="Weight" value={patient.weight} />
              <InfoItem 
                label="BMI" 
                value={patient.bmi} 
                valueClassName="font-bold text-green-600 bg-green-100 px-2 py-1 rounded"
              />
              <InfoItem label="Last Visit" value={patient.lastVisit} />
            </InfoSection>
          </div>
          
          {/* Appointments Section */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border-l-4 border-amber-500 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Upcoming Appointments
            </h3>
            <div className="space-y-3">
              {patient.appointments && patient.appointments.length > 0 ? (
                patient.appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No upcoming appointments scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Patient Portal Component
const PatientPortal = () => {
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentPatientId, setCurrentPatientId] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (patientId, password) => {
    if (patientDatabase[patientId] && patientDatabase[patientId].password === password) {
      setCurrentPatient(patientDatabase[patientId]);
      setCurrentPatientId(patientId);
      setError(false);
    } else {
      setError(true);
      setCurrentPatient(null);
    }
  };

  const handleLogout = () => {
    setCurrentPatient(null);
    setCurrentPatientId('');
    setError(false);
  };

  return (
    <div id="PatientPortal" className="my-10 border-b-2 border-sky-100 flex items-center justify-center p-4">
      {!currentPatient ? (
        <LoginForm onLogin={handleLogin} error={error} />
      ) : (
        <PatientDashboard 
          patient={currentPatient} 
          patientId={currentPatientId} 
          onLogout={handleLogout} 
        />
      )}
    </div>
  );
};

export default PatientPortal;