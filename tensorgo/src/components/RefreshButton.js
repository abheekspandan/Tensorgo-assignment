import React from 'react';
import './refresh-button.css'; // Import your custom CSS file for styling

const RefreshButton = ({ handleRequestUpdate }) => {
  return (
    <button onClick={handleRequestUpdate} className="refresh-button">
      {/* FontAwesome refresh icon */}
      <i className="fa fa-refresh"></i>
    </button>
  );
};

export default RefreshButton;