import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import FileNamePreview from "./FileNamePreview";
import MergeFilePreview from "./MergeFilePreview";


export default function InputInterface(props) {
  const hiddenFileInput = React.useRef(null);
  const toolAddress = props.toolAddress;
  const [objArr,setObjArr]=useState([]);
  let indexList= (toolAddress===1 && props.indexList)?props.indexList:[];
  const forIndexTraversal= indexList;

 useEffect(()=>
 {
  if(props.toolAddress===3)
  {
   if(props.splitArray.length>=1)
   {  let tempArr=[];
     for(let i=0;i<props.splitArray.length;i++)
     {
         let objTemp = {index:i,link:URL.createObjectURL(props.splitArray[i])}
         tempArr.push(objTemp);
     }
     setObjArr(tempArr);
   }
  }
 },[props.splitArray])


 function handleOnClickForReorder()
 {
  let flagVal=0;
  const len= indexList.length;
  for(let i=0;i<len;i++)
  {
    if(indexList[i]<1 || indexList[i]>len )
    {
      flagVal++;
    }
  }

  if(flagVal>0)
  {
    alert(alert("One or more fields are not between 1 & "+len));
  }else{
    props.onClick(indexList);
  }
 }


  return (
    <>
      <div className="container pt-10 pl-20 pr-20">
        <div className="row">
          <div className="col-md-6 col-lg-7">
            <div className="row overflow-x-auto">
              <FileInput hiddenFileInput={hiddenFileInput} />
              {props.selectedFile != null && props.toolAddress!==2? (
                <FileNamePreview fileName={props.selectedFile.name} />
              ) : (
                ""
              )}
              {props.toolAddress===2?
              <MergeFilePreview arr={props.selectedFile} setArr={props.setSelectedFiles}/>:""}
             {props.toolAddress!==2?
              <input
                type="file"
                accept=".pdf"
                onChange={props.onChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />:
              <input
                type="file"
                accept=".pdf"
                onChange={props.onChange}
                ref={hiddenFileInput}
                style={{ display:"none" }}
                multiple
              />
              }
            </div>
            {props.toolAddress === 4 || props.toolAddress === 5 ? (
              <div className="row bg-purple-200 p-4 mt-2 mb-2 rounded-2xl">
                <span className=" select-none font-semibold text-purple-800">
                  {props.toolAddress === 4
                    ? "Enter Watermarks: "
                    : "Enter rotation angle (multiple of 90 degrees): "}
                </span>
                {props.toolAddress === 4 ? (
                  <input
                    value={props.text}
                    className=" bg-inherit rounded-lg p-2 border border-purple-400 text-cyan-700"
                    onChange={(e) => props.setText(e.target.value)}
                  />
                ) : (
                  <input
                    type="number"
                    value={props.angle}
                    className="bg-inherit rounded-lg p-2 border border-purple-400  text-cyan-700"
                    onChange={(e) => props.setAngle((e.target.value / 90) * 90)}
                  />
                )}
              </div>
            ) : (
              ""
            )}

            {props.toolAddress===1?
            <div className=" bg-blue-100 p-2 mt-4 mb-4 rounded-2xl">
              {forIndexTraversal.map((e,index)=>(
              <div key={index} className=" p-2 text-amber-800 italic font-sans">
              Enter page no. which you want to have in page <span className=" font-bold">{index+1}</span> : 
              <input type="number" placeholder={index+1} className="bg-white text-center text-blue-500 font-bold rounded-xl ml-4" onChange={(e)=>(indexList[index]=e.target.value)}/>

              </div>))}
            </div>:""}


            <div className="row">
              <div
                className="col bg-green-100 text-center p-5 font-semibold text-green-600 border border-green-300 rounded-2xl hover:text-white hover:bg-green-400 cursor-pointer"
                onClick={(e)=>(props.toolAddress===1?handleOnClickForReorder():props.onClick())}
              >
                <div>
                  {toolAddress === 1
                    ? "Reorder Pages"
                    : toolAddress === 2
                    ? "Merge PDF"
                    : toolAddress === 3
                    ? "Split PDF"
                    : toolAddress === 4
                    ? "Add Watermarks"
                    : "Rotate each page"}
                </div>
              </div>
            </div>

            {props.downloadLink ? (
              <div className="row mt-4">
                <div
                  className="col bg-cyan-100 text-center p-5 font-semibold text-cyan-600 border border-cyan-300 rounded-2xl hover:text-white hover:bg-cyan-400 cursor-pointer"
                  onClick={(e) => props.downloadLink.click()}
                >
                  <div>Download File</div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="row mt-4">
              {objArr.length>=1
                ? objArr.map((obj) => (
                    <a
                      key={obj.index}
                      href={obj.link}
                      download={`page_${obj.index + 1}.pdf`}
                      className=" col-sm-5 col-xs-12 mt-2 ml-1 mr-1 bg-cyan-100 text-center p-5 font-semibold text-cyan-600 border border-cyan-300 rounded-2xl hover:text-white hover:bg-cyan-400 cursor-pointer"
                    >
                      Download Page {obj.index + 1}
                    </a>
                  ))
                : ""}
            </div>


           
          </div>

          {objArr.length>=1 ? (
            <div className="col overflow-y-auto p-8">
              <embed
                src={objArr[0].link}
                className="w-[100%] h-[70vh]"
              />
            </div>
          ) : (
            ""
          )}

          {props.downloadLink? (
            <div className="col-md-6 col-lg-5 overflow-y-auto p-8">
              <embed
                src={props.downloadLink.href}
                className="w-[100%] h-[70vh]"
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="row">
          {objArr.length>=1
            ? objArr.map((obj) =>
                obj.index !== 0 ? (
                  <div
                    className="col-md-6 col-lg-4 overflow-y-auto p-8"
                    key={obj.index}
                  >
                    <embed
                      src={obj.link}
                      className="w-[100%] h-[70vh]"
                    />
                  </div>
                ) : (
                  ""
                )
              )
            : ""}
        </div>



      






      </div>
    </>
  );
}
