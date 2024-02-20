import {Button} from "./Button.jsx";
import {Link} from "react-router-dom";

export const Appbar = () => {

    return <div className="shadow h-14 flex justify-between bg-blue-200">
        <div className="flex flex-col justify-center h-full ml-4 text-3xl p-4 ">
            SecurePay
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 ">
                <Link to="/logout"><button className="w-full text-center p-3 rounded bg-green-600 text-white hover:bg-green-800 focus:outline-none my-1">Logout</button></Link>
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>

        </div>
    </div>
}