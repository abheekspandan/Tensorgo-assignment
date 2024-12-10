import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const CustomerServiceForm = ({ onRequestUpdate }) => {
  const { user, isAuthenticated } = useAuth0();
  const [category, setCategory] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !comments) {
      alert('Please fill in both fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Submit the new request to the database
      await axios.post('http://localhost:5000/api/customer-service/save', {
        userId: user.sub,
        username: user.name,
        email: user.email,
        category,
        comments,
      });

      await axios.post('http://localhost:5000/api/customer-service', {
        category, // Pass category
        comments, // Pass comments
      });

      if (onRequestUpdate) {
        // Fetch the updated requests list and notify the parent component
        const updatedRequests = await axios.get(`http://localhost:5000/api/customer-service/${user.sub}`);
        onRequestUpdate(updatedRequests.data);
      }

      setSuccess('Your request has been successfully submitted.');
      setCategory('');
      setComments('');
    } catch (err) {
      console.error('Error during submission:', err.response?.data || err.message);
      setError('Failed to submit your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-form" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h3>Submit a Customer Service Request</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          <strong>Category:</strong>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          >
            <option value="">Select an option</option>
            <option value="generalqueries">General Queries</option>
            <option value="productpricing">Product Pricing Queries</option>
            <option value="productfeatureimplementation">Product Feature Implementation</option>
            <option value="productfeaturequeries">Product Feature Queries</option>
          </select>
        </label>

        <label>
          <strong>Comments:</strong>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
            placeholder="Enter your comments or issue here"
            style={{ width: '100%', padding: '10px', marginTop: '5px', height: '100px' }}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '15px' }}>{success}</p>}
    </div>
  );
};

CustomerServiceForm.defaultProps = {
  onRequestUpdate: () => {},
};

export default CustomerServiceForm;
