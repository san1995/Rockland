import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout action here
    
    localStorage.clear();
    navigate('/HomePage'); // Redirect to the login page after logout
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <h1>Logging Out...</h1>
      {/* You can optionally show a loading indicator or message here */}
    </div>
  );
};

export default LogoutPage;