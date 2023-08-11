import {PDFDocument} from "pdf-lib";
import InputInterface from "./InputInterface";
import { useState } from "react";


async function MergePDF(PageList,setDownloadLink){
 
  if (PageList.length < 1) {
    return;
  }
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of PageList) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);

      // Load each PDF and add its pages to the merged PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    // Create a Blob from the merged PDF bytes
    const mergedBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });

    // Create a temporary link to download the merged PDF
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(mergedBlob);
    downloadLink.download = "Reordered.pdf";
    setDownloadLink(downloadLink);
    return ;
    // downloadLink.click();
  } catch (error) {
    console.error("Error merging PDFs:", error);
    return;
  }
};

async function SplitPDF(file)
{
    if (!file) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfBytes = new Uint8Array(arrayBuffer);

      // Load the PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Extract individual pages and save them
      const pages = pdfDoc.getPages();
      const splitPagesArray = [];

      for (let i = 0; i < pages.length; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        const splitPdfBytes = await newPdf.save();

        splitPagesArray.push(new Blob([splitPdfBytes], { type: 'application/pdf' }));
      }


      return splitPagesArray;

    } catch (error) {
      console.error('Error splitting the PDF:', error);
    }
  };

function reorderPages(pageList,indexList)
{
  let tempArr=[];
  for(let i=0;i<pageList.length;i++)
  {
    tempArr.push(pageList[indexList[i]-1]);
  }
  return tempArr;
}




export default function()
{

  const [selectedFile,setSelectedFile] = useState(null);
  const [downloadLinkVar, setDownloadLink] = useState(null);
  const [pdfList,setPdfList] = useState([]);
  const [indexList,setIndexList] = useState([]);
  

  function handleFileChange(event)
  {
    const file = event.target.files[0];
    setSelectedFile(file);
    SplitPDF(file)
    .then((response)=>{setPdfList(response);setDownloadLink({href:URL.createObjectURL(file)});setIndexList(Array.from({length: response.length}, (_, index) => index + 1))})
    .catch((error)=>(console.error("error in file handling")))
  }

  function handleClick(newIndexList)
  {
   MergePDF(reorderPages(pdfList,newIndexList),setDownloadLink)
  }

  console.log("This is downloadLinkVar: ",downloadLinkVar);
  return (
  <InputInterface 
  onChange={handleFileChange}
  onClick={handleClick}
  toolAddress={1}
  selectedFile={selectedFile}
  downloadLink ={downloadLinkVar}
  indexList={indexList}
  />);
}