import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import InputInterface from './InputInterface';

const PDFSplitter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to split PDF into pages
  const splitPDF = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
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

      setSplitPages(splitPagesArray);

    } catch (error) {
      console.error('Error splitting the PDF:', error);
    }
  };

  return ( 
    // <div>
    //   <input type="file" accept=".pdf" onChange={handleFileChange} />
    //   <button onClick={splitPDF}>Split PDF</button>
    //   {splitPages.map((page, index) => (
    //     <div key={index}>
    //       <a href={URL.createObjectURL(page)} download={`page_${index + 1}.pdf`}>
    //         Download Page {index + 1}
    //       </a>
    //     </div> 
    //   ))}
    // </div>

    <InputInterface onChange={handleFileChange} onClick={splitPDF} toolAddress={3} selectedFile={selectedFile} splitArray={splitPages}/>
  );
};

export default PDFSplitter;
