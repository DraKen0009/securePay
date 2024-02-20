import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {SubHeading} from "./SubHeading.jsx";
import {Heading} from "./Heading.jsx";
import {InputBox} from "./InputBox.jsx";
import {Button} from "./Button.jsx";
import {BottomWarning} from "./BottomWarning.jsx";

export const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        if (!username || !password) {
            setError("Please provide both username and password.");
            return;
        }

        const requestData = {
            username,
            password
        };

        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/signin", requestData);
            const data = response.data;

            if (response.status >= 200 && response.status < 300) {
                localStorage.setItem("token", data.token);
                setError(""); // Clear any previous errors
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred during sign-in. Please try again.");
        }
    };

    const handleChange = (e, setValue) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div className="bg-slate-100 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <Heading label="Sign In"/>
                        <SubHeading label="Enter your Information to signin"/>
                        <InputBox placeholder="Username" onChange={(e) => handleChange(e, setUsername)}/>
                        <InputBox placeholder="Password" type="password" onChange={(e) => handleChange(e, setPassword)}/>

                        <Button label="Sign In" onClick={handleSignin}/>

                        {
                            error && <div className="text-red-400 text-xl text-center">{error}</div>
                        }
                    </div>

                    <div className="text-grey-dark mt-6">
                        <BottomWarning label="Sign Up" desc="Don't have an account?" to="/signup"/>
                    </div>
                </div>
            </div>
        </>
    )
}
