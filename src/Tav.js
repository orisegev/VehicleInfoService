import React, { useState } from 'react';
import axios from 'axios'; // You can also use fetch if you prefer

function Tav() {
  // State variables
  const [carNumber, setCarNumber] = useState('');  // To store the car number
  const [carData, setCarData] = useState(null);    // To store fetched data
  const [loading, setLoading] = useState(false);   // To track loading status
  const [error, setError] = useState(null);        // To track errors

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    if (!carNumber) return; // Do nothing if no car number is provided

    setLoading(true); // Start loading
    setError(null);    // Clear previous errors

    try {
      // Replace with your API endpoint
      const response = await axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=${carNumber}`);
      setCarData(response.data.result.records);
    } catch (err) {
      setError('Error fetching car data'); // Set error message if the API call fails
      console.error('Error fetching data:', err); // Log the error
    } finally {
      setLoading(false); // Stop loading after the API call finishes
    }
  };

  return (
    <div className="form-container">
      <h1>בדיקת תו נכה</h1>

      {/* Input form */}
      <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)} // Update the car number state
            placeholder="הקלידו מספר רכב"
          />
        
        <button type="submit">בדיקה</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {carData && carData.length > 0 ? (
        <div>
          {carData.map((car, index) => (
            <div key={index}>
              <p><strong>מספר רכב: </strong> {car['MISPAR RECHEV']}</p>
              <p><strong>תאריך הפקת תו: </strong> {car['TAARICH HAFAKAT TAG']}</p>
              <p><strong>סוג תו: </strong> {car['SUG TAV']}</p>
              <p><strong>דרגה: </strong> {car['rank']}</p>
            </div>
          ))}
        </div>
      ) : (
        carData && <p>לרכב זה אין תו נכה</p>
      )}
    </div>
  );
};

export default Tav;
