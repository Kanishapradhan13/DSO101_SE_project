// File: frontend/src/components/BMICalculator.tsx

import React, { useState, useEffect } from 'react';
import './BMICalculator.scss'; // or .css if you prefer

interface BMIFormData {
  user_id: string;
  height: string;
  weight: string;
  age: string;
}

interface BMIResult {
  id: number;
  user_id: string;
  height: number;
  weight: number;
  age: number;
  bmi: number;
  category: string;
  created_at: string;
  updated_at: string;
}

const BMICalculator: React.FC = () => {
  const [formData, setFormData] = useState<BMIFormData>({
    user_id: '',
    height: '',
    weight: '',
    age: ''
  });
  const [result, setResult] = useState<BMIResult | null>(null);
  const [history, setHistory] = useState<BMIResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const calculateBMI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://bmi-backend-65dc.onrender.com/api/bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        fetchHistory(formData.user_id);
        // Reset form but keep user_id
        setFormData({
          user_id: formData.user_id,
          height: '',
          weight: '',
          age: ''
        });
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (userId: string) => {
    if (!userId) return;

    try {
      const response = await fetch(`https://bmi-backend-65dc.onrender.com/api/bmi${userId}`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return '#3498db'; // Blue for underweight
    if (bmi < 25) return '#2ecc71'; // Green for normal
    if (bmi < 30) return '#f39c12'; // Orange for overweight
    return '#e74c3c'; // Red for obese
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI} className="bmi-form">
        <div className="form-group">
          <label htmlFor="user_id">User ID:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
            placeholder="Enter your user ID"
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            required
            min="1"
            step="0.1"
            placeholder="e.g., 175"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
            min="1"
            step="0.1"
            placeholder="e.g., 70"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            min="1"
            max="120"
            placeholder="e.g., 25"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading} className="calculate-btn">
          {loading ? 'Calculating...' : 'Calculate BMI'}
        </button>
      </form>

      {result && (
        <div className="bmi-result">
          <h3>Your BMI Result</h3>
          <div className="result-display">
            <div className="bmi-value"
              style={{ color: getBMIColor(result.bmi) }}
            >
              {result.bmi}
            </div>
            <div className="bmi-category">
              Category: <span style={{ color: getBMIColor(result.bmi) }}>
                {result.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {formData.user_id && (
        <button onClick={() => fetchHistory(formData.user_id)}
          className="history-btn"
        >
          View History
        </button>
      )}

      {history.length > 0 && (
        <div className="bmi-history">
          <h3>BMI History</h3>
          <div className="history-list">
            {history.map((record) => (
              <div key={record.id} className="history-item">
                <div className="history-date">
                  {new Date(record.created_at).toLocaleDateString()}
                </div>
                <div className="history-details">
                  <span>BMI: {record.bmi}</span>
                  <span>Category: {record.category}</span>
                  <span>H: {record.height}cm, W: {record.weight}kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;