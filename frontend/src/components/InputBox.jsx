export const InputBox = ({placeholder,onChange,type="text"}) => {
    return (
        <>
            <input
                onChange={onChange}
                type={type}
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder={placeholder}/>
        </>
    )
}
