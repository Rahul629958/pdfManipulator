import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import InputInterface from './InputInterface';

const PDFMerger = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadLinkVar,setDownloadLink] = useState(null);

  
  // Function to handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // setSelectedFiles(files);
   let arr=[];
   for(let i=0;i<selectedFiles.length;i++)
   {
    arr.push(selectedFiles[i]);
   }
   for(let i=0;i<files.length;i++)
   {
    arr.push(files[i]);
   }
    setSelectedFiles(arr);
    // console.log(selectedFiles);
  };

  // Function to merge PDFs
  const mergePDFs = async () => {
    if (selectedFiles.length < 2) {
      alert('Please select at least two PDF files to merge.');
      return;
    }

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfBytes = new Uint8Array(arrayBuffer);

        // Load each PDF and add its pages to the merged PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF
      const mergedPdfBytes = await mergedPdf.save();

      // Create a Blob from the merged PDF bytes
      const mergedBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

      // Create a temporary link to download the merged PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(mergedBlob);
      downloadLink.download = 'merged_pdf.pdf';
      setDownloadLink(downloadLink);
      // downloadLink.click();

    } catch (error) {
      console.error('Error merging PDFs:', error);
    }
  };

  return (
    // <div>
    //   <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
    //   <button onClick={mergePDFs}>Merge PDFs</button>
    // </div>
    <InputInterface onChange={handleFileChange} onClick={mergePDFs} toolAddress={2} selectedFile={selectedFiles} setSelectedFiles={setSelectedFiles} downloadLink={downloadLinkVar}/>
  );
};

export default PDFMerger;
