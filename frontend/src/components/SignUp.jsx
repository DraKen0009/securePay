import {Heading} from "./Heading.jsx";
import {SubHeading} from "./SubHeading.jsx";
import {InputBox} from "./InputBox.jsx";
import {Button} from "./Button.jsx";
import {BottomWarning} from "./BottomWarning.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSignup = async () => {
        const requestData = {
            username,
            firstName,
            lastName,
            password
        };
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/signup", requestData)
            const data = response.data;

            if (response.status === 201) {
                localStorage.setItem("token", data.token);
                navigate("/dashboard");

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                setError(error.response.data.msg);
            } else {
                console.error("Error:", error.message);
            }
        }
    }

    const handleChange = (e, setValue) => {
        setValue(e.target.value);
    }
    return (
        <>
            <div className="bg-slate-100 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <Heading label="Sign Up"/>
                        <SubHeading label="Enter your Information to sign up"/>
                        <InputBox placeholder="First Name" onChange={(e) => {
                            handleChange(e, setFirstName);
                        }}/>
                        <InputBox placeholder="Last Name" onChange={(e) => {
                            handleChange(e, setLastName);
                        }}/>
                        <InputBox placeholder="Username" onChange={(e) => {
                            handleChange(e, setUsername);
                        }}/>
                        <InputBox placeholder="Password" type="password" onChange={(e) => {
                            handleChange(e, setPassword);
                        }}/>

                        <Button label="Sign Up" onClick={handleSignup}/>
                        {
                            error ? <div className="text-red-400 text-xl text-center">{error}
                            </div> : <></>
                        }
                    </div>

                    <div className="text-grey-dark mt-6">
                        <BottomWarning label="Sign In" desc="Already have an account?" to="/signin"/>
                    </div>
                </div>
            </div>
        </>
    )
}