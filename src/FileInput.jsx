import React from "react";

export default function(props)
{
    
    return (<>
    <div className="col-md-4 h-[40vh] w-[20rem] bg-blue-100 m-4  text-blue-500 hover:text-white hover:bg-blue-300 rounded-2xl text-center pt-[15vh] cursor-pointer" onClick={(e)=>(props.hiddenFileInput.current.click())}>
     <div className=" font-semibold text-6xl">+</div>
     <div>Upload file</div>
    </div>
    </>);
}