import React from "react";

export default function FileNamePreview(props)
{

  

   return (
    <>
    
     <div className=" col-md-4 w-[20rem] bg-red-100 m-4 hover:text-red-700 hover:bg-red-200 rounded-2xl text-center pt-[10vh] cursor-pointer" style={props.toolAddress===2?{height:"fit-content"}:{height:"40vh"}} >
     
     <img src="https://www.freeiconspng.com/uploads/red-pdf-logo-33.png" alt="pdf" className="ml-[1rem] mt-[-3rem]" height={150}></img>
     <div className="mt-8 inline-block w-[100%] overflow-x-auto">{props.fileName}</div>
    {props.toolAddress===2? <div className="row">
      {/* <div className="col-xs-3 bg-green-300 h-[3.5vh] rounded-bl-lg hover:bg-green-400" onClick={(e)=>(props.leftClick(props.index))}>↤</div> */}
      <div className="col bg-red-300 h-[3.5vh] hover:bg-red-500 hover:text-white rounded-b-lg" onClick={(e)=>(props.delete(props.index))}>Delete</div>
      {/* <div className="col-xs-3 bg-green-300 h-[3.5vh] rounded-br-lg hover:bg-green-400" onClick={(e)=>(props.rightClick(props.index))}>↦</div> */}
     </div>:""}
    </div>
    </>
   )
}