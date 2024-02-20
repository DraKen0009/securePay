// Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token"); // Remove token from local storage
        setIsAuthenticated(false); // Update isAuthenticated state
        navigate("/signin");
    }, [navigate, setIsAuthenticated]);

    return null; // No need to render anything for logout
};

export default Logout;
