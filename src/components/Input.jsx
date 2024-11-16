import React, { useId } from 'react'

const Input = React.forwardRef(({ label, id, type = 'text', className = "", ...props }, ref) => {

    return (
        <div className='w-full'>{
            label && <label htmlFor={id} className='inline-block mb-1 pl-1' >{label}</label>
        }
            <input type={type} className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full `} ref={ref} id={id} {...props}/>
        </div>
    )
});

export default Input