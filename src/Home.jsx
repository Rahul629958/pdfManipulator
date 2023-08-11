import React from "react";


export default function Home(props)
{
    return <div className="container pt-4 pl-8 pr-8">
        <div className="row">
        <div className="col-md-4  h-[40vh]" onClick={(e)=>(props.setAddress(1))}>
            <div className=" m-2 bg-blue-200 w-[100%] h-[95%] cursor-pointer hover:bg-blue-400 rounded-3xl p-4 text-center  pt-[15vh]  hover:text-white text-blue-500 border border-blue-400 shadow-lg">
                <div className="font-extrabold text-5xl">Reorder Pages</div>
                <div className="mt-2">Reorder pages of PDF.</div>
                </div>
               
    
        </div>
        <div className="col-md-4  h-[40vh]" onClick={(e)=>(props.setAddress(2))}>
            <div className=" m-2 w-[100%] h-[95%]  bg-red-200 cursor-pointer hover:bg-red-400 rounded-3xl p-4 text-center pt-[15vh] hover:text-white text-red-500 border border-red-400 shadow-lg">
                <div className="font-extrabold text-5xl">Merge PDF</div>
                <div className="mt-2">Merge two or more PDF files into one PDF file.</div>
                </div>
            
        </div>
        <div className="col-md-4  h-[40vh]" onClick={(e)=>(props.setAddress(3))}>
            <div className=" m-2 w-[100%] h-[95%]  bg-green-200 cursor-pointer hover:bg-green-400 rounded-3xl p-4 text-center pt-[15vh] hover:text-white text-green-500 border border-green-400 shadow-lg">
                <div className="font-extrabold text-5xl">Split PDF</div>
                <div className="mt-2">Split each page of PDF file.</div>
                </div>
            
        </div>
        <div className="col-md-4  h-[40vh]" onClick={(e)=>(props.setAddress(4))}>
            <div className=" m-2 w-[100%] h-[95%] bg-purple-200 cursor-pointer hover:bg-purple-400 rounded-3xl p-4 text-center pt-[15vh] hover:text-white text-purple-500 border border-purple-400 shadow-lg">
                <div className="font-extrabold text-5xl">Add Watermarks</div>
                <div className="mt-2">Add watermarks to each page of PDF.</div>
                </div>
            
        </div>
        <div className="col-md-4  h-[40vh]" onClick={(e)=>(props.setAddress(5))}>
            <div className=" m-2 w-[100%] h-[95%]  bg-yellow-200 cursor-pointer hover:bg-yellow-400 rounded-3xl p-4 text-center pt-[15vh] hover:text-white text-yellow-500 border border-yellow-400 shadow-lg">
            <div className="font-extrabold text-5xl">Rotate Pages</div>
                <div className="mt-2">Rotate each page of PDF to a custom angle.</div>
                </div>
            
        </div>
        </div>
    </div>
}