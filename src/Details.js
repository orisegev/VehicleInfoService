import React, { useState } from 'react';
import axios from 'axios'; // You can also use fetch if you prefer

function Details() {
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
      const response = await axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${carNumber}`);
      const records = response.data.result.records; // Assuming the structure is like this
      setCarData(records); // Set the fetched data in the state
    } catch (err) {
      setError('Error fetching car data'); // Set error message if the API call fails
    } finally {
      setLoading(false); // Stop loading after the API call finishes
    }
  };

  return (
    <div className="form-container">
      <h1>מידע אודות רכב</h1>

      {/* Input form */}
      <form onSubmit={handleSubmit}>

          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)} // Update the car number state
            placeholder="הקלידו מספר רכב"
          />
        
        <button type="submit">מצא רכב</button>
      </form>

      {/* Display loading status */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display fetched car data */}
      {carData && carData.length > 0 ? (
        <div>
          <h2>פרטים:</h2>
          <p><strong>מספר רכב:</strong> {carData[0]?.mispar_rechev}</p>
          <p><strong>שנת יצור:</strong> {carData[0]?.shnat_yitzur}</p>
          <p><strong>עליה לכביש:</strong> {carData[0]?.moed_aliya_lakvish}</p>
          <p><strong>יצרן:</strong> {carData[0].tozeret_nm}</p>
          <p><strong>צבע:</strong> {carData[0].tzeva_rechev}</p>
          <p><strong>כינוי מסחרי:</strong> {carData[0].kinuy_mishari}</p>
          <p><strong>רמת גימור:</strong> {carData[0].ramat_gimur}</p>
          <p><strong>בעלות:</strong> {carData[0].baalut}</p>
          <p><strong>צמיג קדמי:</strong> {carData[0].zmig_kidmi}</p>
          <p><strong>צמיג אחורי:</strong> {carData[0].zmig_ahori}</p>
          <p><strong>סוג דלק:</strong> {carData[0].sug_delek_nm}</p>
          <p><strong>דגם מנוע:</strong> {carData[0].degem_manoa}</p>
          <p><strong>מספר שלדה:</strong> {carData[0].misgeret}</p>
          <p><strong>טסט אחרון:</strong> {carData[0].mivchan_acharon_dt}</p>
        </div>
      ) : (
        carData && <p>לא נמצא מידע</p>
      )}
    </div>
  );
};

export default Details;
