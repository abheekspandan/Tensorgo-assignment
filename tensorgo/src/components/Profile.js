import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./Profile.css"; // Assuming the CSS is saved in a separate file

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-card">
        <img src={user.picture} alt={user.name} />
        <h1>Welcome User</h1>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
