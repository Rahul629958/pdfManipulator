import React from "react"


export default function Navbar(props){

    return (
        <nav className="navbar navbar-light bg-[#e3f2fd]">
            <div className="row pt-2 pb-2">
                <div className="col-xs-1"></div>
                <div className="col-sm-2 ">
                <div className="text-[3rem] font-bold text-purple-700 cursor-pointer group" onClick={(e)=>(window.location.reload(true))}>
                    
                    <span className=" text-blue-600 group-hover:text-blue-700">B</span>
                    <span className=" text-red-600 group-hover:text-red-700">l</span>
                    <span className=" text-green-600 group-hover:text-green-700">e</span>
                    <span className=" text-purple-600 group-hover:text-purple-700">n</span>
                    <span className=" text-yellow-500 group-hover:text-yellow-600">d</span>
                    <span className=" text-cyan-500 group-hover:text-cyan-700">PDF</span>
                    </div>
                    </div>
                    <div className="col-sm-7"></div>
                <div className="col text-[2rem] pt-2 text-right text-cyan-500 "><span className="mr-[5%] cursor-pointer hover:text-cyan-700" onClick={(e)=>(window.location.reload(true))}>Home</span></div>
            </div>
      
      </nav>
    );

}