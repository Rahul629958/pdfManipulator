import React, { useState } from "react";
import Reorder from "./Reorder"
import Merge from "./Merge"
import Split from "./Split"
import AddWatermarks from "./AddWatermarks";
import Home from "./Home";
import Rotate from "./Rotate";
import Navbar from "./Navbar";


export default function App()
{
  const [isAddress,setAddress] = useState(0);
  return (<>
    <Navbar setAddress={setAddress}/>
    <div>
    {
    
      isAddress===0?
      <div>
        <Home setAddress={setAddress}/>
      </div>
      :
      isAddress===1?
      <div ><Reorder /></div>
      :
      isAddress===2?
      <div ><Merge /></div>
      :
      isAddress===3?
      <div ><Split /></div>
      :
      isAddress===4?
      <div ><AddWatermarks /></div>
      :
      <div ><Rotate /></div>
  
   
   
    

}
    </div>

    </>
  );
}