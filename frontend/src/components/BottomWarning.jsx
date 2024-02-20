import {Link} from "react-router-dom";

export const BottomWarning = ({label,desc ,to}) => {
    return (
        <>
            <div className="text-grey-dark mt-6">
                {desc}
                <Link className="no-underline border-b border-blue text-blue ml-2 hover:text-green-400" to={to} >
                    {label}
                </Link>.
            </div>
        </>
    )
}
