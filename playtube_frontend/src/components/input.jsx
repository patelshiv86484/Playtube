import React,{useId} from "react";

const Input=React.forwardRef( function input({
    type="text",
    label="",
    className,
    ...props
},reff){
  const id=useId();
        return (
        <div>
          { label && <label htmlFor={id} className='inline-block mb-1 pl-1'>
               {label}
                </label>}
                <input 
                 type={type}
                 id={id} 
                 ref={reff} 
                 className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props} />
        </div>
        )
}
)
export default Input