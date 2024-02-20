import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignUp } from "./components/SignUp.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { Dashboard } from "./components/DashBoard.jsx";
import { SendMoney } from "./components/SendMoney.jsx";
import { useState, useEffect } from "react";
import Logout from "./components/Logout.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/signup"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />}
                />
                <Route
                    path="/signin"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />}
                />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/send"
                    element={isAuthenticated ? <SendMoney /> : <Navigate to="/signin" />}
                />
                <Route
                    path="/logout"
                    element={<Logout setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated to Logout component
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
