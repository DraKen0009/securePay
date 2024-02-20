import {Appbar} from "./Appbar.jsx";
import {Balance} from "./Balance.jsx";
import {Users} from "./Users.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

export const Dashboard = () => {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("Token not found in localStorage.");
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get("http://localhost:8000/api/v1/account/balance", config);
                setAmount(response.data.balance)

            } catch (error) {
                // Handle errors
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={amount} />
                <Users />
            </div>
        </div>
    );
};
