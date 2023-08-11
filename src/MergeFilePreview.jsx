import React from "react";
import FileNamePreview from "./FileNamePreview";


export default function MergeFilePreview(props)
{

    function handleDeleteClick(index)
    {
        let tempArr=[];
        for(let i=0;i<props.arr.length;i++)
        {
            if(i!==index){
             tempArr.push(props.arr[i]);
            }
        }

        props.setArr(tempArr);

    }


    return (<>
    {props.arr.map((file,index)=>(
        <FileNamePreview key={index} fileName={file.name} toolAddress={2} index={index} delete={handleDeleteClick}/>
    ))}
     
    </>)
}