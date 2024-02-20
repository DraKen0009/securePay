export const Button = ({label, onClick}) => {
    return (
        <>
            <button
                onClick={onClick}
                type="submit"
                className="w-full text-center p-3 rounded bg-green-600 text-white hover:bg-green-800 focus:outline-none my-1"
            >{label}
            </button>
        </>
    )
}
