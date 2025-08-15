import React, { useState, useEffect, useCallback } from 'react';
import { Search, UserPlus, User, Calendar, Phone, Mail, MapPin, FileText, Plus, Heart, Activity, Shield, AlertTriangle } from 'lucide-react';

// --- API Configuration ---
const API_BASE_URL = 'http://localhost:8080/api/patients';
// In a real app, this would come from an auth context or local storage
const AUTH_TOKEN = localStorage.getItem('authToken');

// --- Patient Portal Component ---
const PatientPortal = () => {
  // --- State Management ---
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState('view');
  const [searchId, setSearchId] = useState('');
  const [foundPatient, setFoundPatient] = useState(null);
  const [searchError, setSearchError] = useState('');

  const initialNewPatientState = {
    full_name: '',
    date_of_birth: '',
    gender: '',
    blood_type: '',
    phone: '',
    email: '',
    address: '',
    emergency_contact: '',
    primary_doctor: '',
    insurance: '',
    allergies: [],
    height: '',
    weight: '',
    bmi: ''
  };

  const [newPatient, setNewPatient] = useState(initialNewPatientState);

  const [allergyInput, setAllergyInput] = useState('');

  // State for API communication
  const [loading, setLoading] = useState(false); // Set to false initially
  const [error, setError] = useState(null);

  // --- Helper Functions ---
  const calculateBMI = (height, weight) => {
    if (!height || !weight) return '';
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    if (heightInMeters > 0 && weightInKg > 0) {
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '';
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getBMIStatus = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { status: 'Underweight', color: 'text-blue-600' };
    if (bmiValue < 25) return { status: 'Normal', color: 'text-green-600' };
    if (bmiValue < 30) return { status: 'Overweight', color: 'text-yellow-600' };
    return { status: 'Obese', color: 'text-red-600' };
  };

  // --- API Functions ---
  const fetchAllPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` },
      });
      if (!response.ok) throw new Error('Network response was not ok.');

      const result = await response.json();
      if (result.success) {
        setPatients(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch patients');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  if (localStorage.getItem('authToken')) {
    useEffect(() => {
      fetchAllPatients();
      setLoading(false);
    }, [fetchAllPatients]);
  }

  const handleSearchPatient = async () => {
    if (loading) return; // Prevent multiple searches while loading
    setSearchError('');
    setFoundPatient(null);
    if (!searchId.trim()) {
      setSearchError('Please enter a Patient ID');
      return;
    }

    const patient = patients.find(p => p.patient_id.toLowerCase() === searchId.toLowerCase().trim());

    if (patient) {
      setFoundPatient(patient);
    } else {
      setSearchError('Patient not found. Please check the Patient ID and try again.');
    }
  };
  async function addPatient(patientData) {
    try {
      const token = localStorage.getItem("authToken"); // JWT token from login

      const response = await fetch("http://localhost:8080/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(patientData)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Patient added successfully:", result);
      return result;

    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  }

  const handleAddPatient = () => {
    if (!newPatient.full_name || !newPatient.date_of_birth || !newPatient.gender) {
      alert('Please fill in required fields (Full Name, Date of Birth, Gender)');
      return;
    }

    const patientToAdd = {
      ...newPatient,
      patient_id: `PAT${12345 + patients.length + 1}`,
      createdDate: new Date().toISOString().split('T')[0],
      bmi: calculateBMI(newPatient.height, newPatient.weight)
    };
    addPatient(patientToAdd);
    setPatients([...patients, patientToAdd]);

    alert(`Patient added successfully! Patient ID: ${patientToAdd.patient_id}`);

    // Reset form
    setNewPatient(initialNewPatientState);
    setAllergyInput('');
    setActiveTab('view');
  };

  // --- Form Input Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'height' || name === 'weight') {
        const height = name === 'height' ? value : prev.height;
        const weight = name === 'weight' ? value : prev.weight;
        updated.bmi = calculateBMI(height, weight);
      }
      return updated;
    });
  };

  const addAllergy = () => {
    if (allergyInput.trim() && !newPatient.allergies.includes(allergyInput.trim())) {
      setNewPatient(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyInput.trim()]
      }));
      setAllergyInput('');
    }
  };

  const removeAllergy = (allergyToRemove) => {
    setNewPatient(prev => ({
      ...prev,
      allergies: prev.allergies.filter(allergy => allergy !== allergyToRemove)
    }));
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-sky-100"><p>Loading patient data...</p></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-red-100"><p className="text-red-600">Error: {error}</p></div>;
  }

  return (
    <div id="PatientPortal" className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Records</h1>
          <p className="text-gray-600">Comprehensive patient record management system</p>
          <p className="text-gray-600">Total Patients: {patients.length}</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('view')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'view'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Search className="inline-block w-4 h-4 mr-2" />
                View Patient
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'add'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <UserPlus className="inline-block w-4 h-4 mr-2" />
                Add Patient
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'view' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Patient by ID</h2>
                <div className="mb-6">
                  <div className="flex gap-4">
                    <div className="flex-1 justify-center items-center border-2 border-gray-200 px-6 py-2 rounded-lg  ">
                      <input
                        type="text"
                        placeholder="Enter Patient ID (e.g., PAT12345)"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchPatient()}
                        className="w-full focus:outline-none  "
                      />
                    </div>
                    <button
                      onClick={handleSearchPatient}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Search
                    </button><br />

                  </div>
                  <div className='items-center mt-4 text-gray-800 bg-gray-200 px-4 py-2 rounded-lg w-fit'>
                    <h3 className='font-bold'>Recent Patient IDs:</h3>
                    <p>PAT12345</p>
                    <p>PAT12347</p>
                  </div>
                </div>

                {searchError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{searchError}</p>
                  </div>
                )}

                {foundPatient && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-6">
                      <User className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {foundPatient.full_name}
                        </h3>
                        <p className="text-gray-600">Patient ID: {foundPatient.patient_id}</p>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-800 border-b pb-2">Basic Information</h4>
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Date of Birth</p>
                            <p className="font-medium">{foundPatient.date_of_birth} ({calculateAge(foundPatient.date_of_birth)} years old)</p>
                          </div>
                        </div>
                        {/* Other basic info fields... */}
                        <div className="flex items-center"><User className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Gender</p><p className="font-medium">{foundPatient.gender}</p></div></div>
                        <div className="flex items-center"><Heart className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Blood Type</p><p className="font-medium text-red-600">{foundPatient.blood_type}</p></div></div>
                        <div className="flex items-center"><Phone className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Phone</p><p className="font-medium">{foundPatient.phone}</p></div></div>
                        <div className="flex items-center"><Mail className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Email</p><p className="font-medium">{foundPatient.email}</p></div></div>
                        <div className="flex items-start"><MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" /><div><p className="text-sm text-gray-600">Address</p><p className="font-medium">{foundPatient.address}</p></div></div>
                      </div>

                      {/* Medical Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-800 border-b pb-2">Medical Information</h4>
                        <div className="flex items-center"><FileText className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Primary Doctor</p><p className="font-medium">{foundPatient.primary_doctor}</p></div></div>
                        <div className="flex items-center"><Shield className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Insurance</p><p className="font-medium">{foundPatient.insurance}</p></div></div>
                        <div className="flex items-start"><Phone className="w-5 h-5 text-gray-400 mr-3 mt-1" /><div><p className="text-sm text-gray-600">Emergency Contact</p><p className="font-medium">{foundPatient.emergency_contact}</p></div></div>
                        <div className="flex items-start"><AlertTriangle className="w-5 h-5 text-gray-400 mr-3 mt-1" /><div><p className="text-sm text-gray-600">Allergies</p><div className="flex flex-wrap gap-2 mt-1">{foundPatient.allergies.map((allergy, index) => (<span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">{allergy}</span>))}</div></div></div>
                      </div>

                      {/* Physical Stats */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-800 border-b pb-2">Physical Stats</h4>
                        <div className="flex items-center"><Activity className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Height</p><p className="font-medium">{foundPatient.height}</p></div></div>
                        <div className="flex items-center"><Activity className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">Weight</p><p className="font-medium">{foundPatient.weight}</p></div></div>
                        <div className="flex items-center"><Activity className="w-5 h-5 text-gray-400 mr-3" /><div><p className="text-sm text-gray-600">BMI</p><div className="flex items-center gap-2"><p className="font-medium">{foundPatient.bmi}</p><span className={`text-xs font-medium ${getBMIStatus(foundPatient.bmi).color}`}>({getBMIStatus(foundPatient.bmi).status})</span></div></div></div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Patient registered on: {foundPatient.createdDate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'add' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Patient</h2>
                <div className="space-y-8">
                  {/* Form sections */}
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input type="text" name="full_name" value={newPatient.full_name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                        <input type="date" name="date_of_birth" value={newPatient.date_of_birth} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                        <select name="gender" value={newPatient.gender} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                        <select name="blood_type" value={newPatient.blood_type} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select Blood Type</option>
                          <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" name="phone" value={newPatient.phone} onChange={handleInputChange} placeholder="+1234567890" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" name="email" value={newPatient.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Address</label><textarea name="address" value={newPatient.address} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label><input type="text" name="emergency_contact" value={newPatient.emergency_contact} onChange={handleInputChange} placeholder="Name, Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                    </div>
                  </div>
                  {/* Medical Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Medical Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Primary Doctor</label><input type="text" name="primary_doctor" value={newPatient.primary_doctor} onChange={handleInputChange} placeholder="Dr. Smith" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label><input type="text" name="insurance" value={newPatient.insurance} onChange={handleInputChange} placeholder="Blue Cross Blue Shield" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                        <div className="flex gap-2 mb-2">
                          <input type="text" value={allergyInput} onChange={(e) => setAllergyInput(e.target.value)} placeholder="Enter allergy" onKeyPress={(e) => e.key === 'Enter' && addAllergy()} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                          <button onClick={addAllergy} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newPatient.allergies.map((allergy, index) => (
                            <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">{allergy}<button onClick={() => removeAllergy(allergy)} className="text-red-600 hover:text-red-800">&times;</button></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Physical Stats */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Physical Stats</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label><input type="number" name="height" value={newPatient.height} onChange={handleInputChange} placeholder="175" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label><input type="number" name="weight" value={newPatient.weight} onChange={handleInputChange} placeholder="70" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">BMI (calculated)</label>
                        <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center h-[42px]">
                          <span className="text-gray-700">{newPatient.bmi || 'Auto'}</span>
                          {newPatient.bmi && (<span className={`ml-2 text-xs ${getBMIStatus(newPatient.bmi).color}`}>({getBMIStatus(newPatient.bmi).status})</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button onClick={handleAddPatient} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-lg">
                      <Plus className="w-5 h-5" />
                      Add Patient
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;