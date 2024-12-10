import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import RefreshButton from '../components/RefreshButton'; // Import the RefreshButton component

  // Handle updating requests (e.g., fetching data)
  const handleRequestUpdate = () => {
    // Logic to fetch updated requests or trigger refresh
    console.log('Refreshing requests...');
  };

const DisplayRequests = () => {
  const { user, isAuthenticated } = useAuth0();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/customer-service/${user.sub}`);
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Failed to load your requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [isAuthenticated, user]);

  const handleRequestUpdate = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch the updated list of requests
      const response = await axios.get(`http://localhost:5000/api/customer-service/${user.sub}`);
      setRequests(response.data);  // Update state with the new data
    } catch (err) {
      console.error('Error during fetching updated requests:', err);
      setError('Failed to refresh your requests.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Group requests by category
  const groupedRequests = requests.reduce((acc, req) => {
    acc[req.category] = acc[req.category] || [];
    acc[req.category].push(req);
    return acc;
  }, {});

  return (
    <div className="requests-display">
      <h2>Your Customer Service Requests</h2>

      {/* Refresh Button */}
      <RefreshButton handleRequestUpdate={handleRequestUpdate} />

      {Object.keys(groupedRequests).length === 0 ? (
        <p>No requests found.</p>
      ) : (
        Object.entries(groupedRequests).map(([category, reqs]) => (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <ul>
              {reqs.map((req, index) => (
                <li key={index}>
                  <p><strong>Comments:</strong> {req.comments}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayRequests;
