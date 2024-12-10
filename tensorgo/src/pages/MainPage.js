import React, { useState ,useEffect} from 'react'; // Correctly import useState and useEffect
import '../styles.css';
import HelpCrunch from '../components/HelpCrunch';
import CustomerServiceForm from './CustomerServiceForm';
import DisplayRequests,{handleRequestUpdate,setRequests} from './CustomerServiceRequest';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { RequestsProvider } from './RequestsContext';
import LogoutButton from '../components/Logout';

const MainPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  // State to manage the list of customer service requests
  const [requests, setRequests] = useState([]);

  // Handle new request submission
  const handleNewRequest = (newRequest) => {
    console.log("New request submitted:",newRequest);
    setRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  //update the request
  const handleRequestUpdate = (updatedRequests) => {
    setRequests(updatedRequests);
  };

 // Handle authentication and redirect after login
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     loginWithRedirect();
  //   } else {
  //     navigate('/MainPage'); // Navigate to MainPage after login
  //   }
  // }, [isAuthenticated, loginWithRedirect, navigate]);

  return (
    <div className="App">
      {/* <h1>Customer Service Platform</h1> */}
      
      <main>
        <Profile/>
        <LogoutButton />  {/* Add Logout Button here */}
        <RequestsProvider>
        {/* <CustomerServiceForm onSubmit={handleNewRequest} />  */}
        <CustomerServiceForm onRequestUpdate={handleRequestUpdate} />
        <DisplayRequests requests={requests} /> {/* Pass down requests as a prop */}
        </RequestsProvider>
        <HelpCrunch/>
      </main>
    </div>
  );
};

export default MainPage;
