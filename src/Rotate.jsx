import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import InputInterface from './InputInterface';

const RotatePagesExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [downloadLinkVar,setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const rotatePDF = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        page.setRotation(degrees(Number(rotationAngle)));
      });

      const rotatedPdfBytes = await pdfDoc.save();
      downloadPDF(rotatedPdfBytes, selectedFile.name.slice(0,-4)+'_rotated.pdf');
    } catch (error) {
      console.error('Error rotating PDF:', error);
    }
  };

  const downloadPDF = (pdfBytes, fileName) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    setDownloadLink(a);
    // a.click();
  };

  return (
    // <div>
    //   <input type="file" accept=".pdf" onChange={handleFileChange} />
    //   <input
    //     type="number"
    //     value={rotationAngle}
    //     onChange={(e) => setRotationAngle(e.target.value)}
    //   />
    //   <button onClick={rotatePDF}>Rotate Pages</button>
    // </div> 
    <InputInterface onChange={handleFileChange} onClick={rotatePDF} toolAddress={5} selectedFile={selectedFile} downloadLink={downloadLinkVar} angle={rotationAngle} setAngle={setRotationAngle}/>
  );
};

export default RotatePagesExample;
