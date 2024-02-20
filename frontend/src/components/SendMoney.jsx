import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // Track success state

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            <button onClick={async () => {
                                try {
                                    const response = await axios.post("http://localhost:8000/api/v1/account/transfer", {
                                        to: id,
                                        amount
                                    }, {
                                        headers: {
                                            Authorization: "Bearer " + localStorage.getItem("token")
                                        }
                                    });
                                    if (response.data.msg === "Transaction is successful") {
                                        setSuccess(true); // Set success state to true
                                    }
                                } catch (error) {
                                    // Handle errors
                                    if (error.response && error.response.data && error.response.data.msg) {
                                        setError(error.response.data.msg);
                                    } else {
                                        console.error("Error:", error.message);
                                    }
                                }
                            }}
                                    className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                                Initiate Transfer
                            </button>

                            {
                                error && <div className="text-red-400 text-xl text-center">{error}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {success && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Transaction Complete</h2>
                        <Link to="/dashboard" className="text-green-500 hover:underline">Go to Dashboard</Link>
                    </div>
                </div>
            )}
        </div>
    );
};
