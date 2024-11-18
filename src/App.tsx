import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaUser, FaHeartbeat, FaWeightHanging, FaChartBar, FaGenderless, FaRunning, FaMedkit } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Loading from './components/Loading';

import { MdSpeed, MdAccessTime } from 'react-icons/md';

interface FormData {
  age: string;
  sex: string;
  cp: string;
  trestbps: string;
  chol: string;
  fbs: string;
  restecg: string;
  thalach: string;
  exang: string;
  oldpeak: string;
  slope: string;
  ca: string;
  thal: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [loading, setLoading]  = useState<boolean>(false);
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send the data to the backend (Flask or FastAPI)
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log(data);
    setPrediction(data.prediction);
    setAccuracy(data.accuracy);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 py-4">
      {loading && <Loading />}
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Heart Disease Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 ">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaGenderless className="absolute left-3 top-3 text-gray-400" />
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Sex</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </div>
            <div className="relative">
              <FaHeartbeat className="absolute left-3 top-3 text-gray-400" />
              <select
                name="cp"
                value={formData.cp}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Chest Pain Type</option>
                <option value="0">Typical Angina</option>
                <option value="1">Atypical Angina</option>
                <option value="2">Non-anginal Pain</option>
                <option value="3">Asymptomatic</option>
              </select>
            </div>
            <div className="relative">
              <MdSpeed className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="trestbps"
                placeholder="Resting Blood Pressure (mm Hg)"
                value={formData.trestbps}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaChartBar className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="chol"
                placeholder="Serum Cholesterol (mg/dl)"
                value={formData.chol}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaMedkit className="absolute left-3 top-3 text-gray-400" />
              <select
                name="fbs"
                value={formData.fbs}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Fasting Blood Sugar</option>
                <option value="0">Normal (&lt;= 120 mg/dl)</option>
                <option value="1">High (&gt; 120 mg/dl)</option>
              </select>
            </div>
            <div className="relative">
              <MdAccessTime className="absolute left-3 top-3 text-gray-400" />
              <select
                name="restecg"
                value={formData.restecg}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Resting ECG</option>
                <option value="0">Normal</option>
                <option value="1">ST-T Wave Abnormality</option>
                <option value="2">Possible/Definite Left Ventricular Hypertrophy</option>
              </select>
            </div>
            <div className="relative">
              <FaRunning className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="thalach"
                placeholder="Max Heart Rate Achieved"
                value={formData.thalach}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaHeartbeat className="absolute left-3 top-3 text-gray-400" />
              <select
                name="exang"
                value={formData.exang}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Exercise Angina</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            <div className="relative">
              <FaWeightHanging className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                step="any"
                name="oldpeak"
                placeholder="Oldpeak"
                value={formData.oldpeak}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaHeartbeat className="absolute left-3 top-3 text-gray-400" />
              <select
                name="slope"
                value={formData.slope}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Slope</option>
                <option value="0">Upward Sloping</option>
                <option value="1">Flat</option>
                <option value="2">Downward Sloping</option>
              </select>
            </div>
            <div className="relative">
              <FaHeartbeat className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="ca"
                placeholder="Number of Major Vessels Colored by Fluoroscopy"
                value={formData.ca}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <FaHeartbeat className="absolute left-3 top-3 text-gray-400" />
              <select
                name="thal"
                value={formData.thal}
                onChange={handleChange}
                className="w-full pl-10 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Thalassemia</option>
                <option value="3">Normal</option>
                <option value="6">Fixed Defect</option>
                <option value="7">Reversable Defect</option>
              </select>
            </div>
          </div>

          { prediction !== null && (
      <div className="mt-4 flex items-center justify-center flex-col">
        <div><p>Model used: <span className='font-bold'>Random Forest Classifier</span></p> </div>
        {/* Heart Disease Prediction */}
        {prediction === 1 ? (
          <div className="text-red-600 flex items-center space-x-2">
            <FaHeart size={30}  />
            <h2 className="text-xl font-semibold">Heart Disease</h2>
          </div>
        ) : (
          <div className="text-green-600 flex items-center space-x-2">
            <FaRegHeart size={30} color="green" />
            <h2 className="text-xl font-semibold">No Heart Disease</h2>
          </div>
        )}
        <p>Prediction Accuracy: {accuracy ? accuracy.toFixed(2) : 'N/A'}%</p>
      </div>
    )}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Predict
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
  <p className="font-semibold text-lg">Made By: Team 6</p>
  <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
    {/* Creator 1 */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
        D
      </div>
      <span className="mt-2 font-medium text-gray-700">Devansh </span>
    </div>
    {/* Creator 2 */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
        M
      </div>
      <span className="mt-2 font-medium text-gray-700">Manish Prasad</span>
    </div>
    {/* Creator 3 */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
        J
      </div>
      <span className="mt-2 font-medium text-gray-700">Jayant</span>
    </div>
    {/* Creator 4 */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
        A
      </div>
      <span className="mt-2 font-medium text-gray-700">Abhijeet</span>
    </div>
  </div>
</div>

       
      </div>
    </div>
  );
};

export default App;
