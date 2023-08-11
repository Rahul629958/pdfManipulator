import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import InputInterface from './InputInterface';

const AddWatermarkExample = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [watermarkText,setWatermarkText] = useState("Watermark text");
  const [downloadLinkVar,setDownloadLink] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const addWatermark = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
    //   const watermarkText = 'Confidential';
      const watermarkSize = 72;

      const font = await pdfDoc.embedFont('Helvetica');
      const textWidth = font.widthOfTextAtSize(watermarkText, watermarkSize);
      const textHeight = font.heightAtSize(watermarkSize);

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const xPos = (width - textWidth) / 2;
        const yPos = (height - textHeight) / 2;

        page.drawText(watermarkText, {
          x: xPos,
          y: yPos,
          size: watermarkSize,
          color: rgb(0.5, 0.5, 0.5), // Light gray color for watermark
          font: font,
          opacity:0.5
        });
      });

      const watermarkedPdfBytes = await pdfDoc.save();
      downloadPDF(watermarkedPdfBytes, selectedFile.name.slice(0,-4)+'_watermarked.pdf');
    } catch (error) {
      console.error('Error adding watermark:', error);
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
    //   <input type='text' onChange={(e)=>(setWatermarkText(e.target.value))} value={watermarkText}/>
    //   <button onClick={addWatermark}>Add Watermark</button>
    // </div>
 
    <InputInterface onChange={handleFileChange} onClick={addWatermark} toolAddress={4} selectedFile={selectedFile} downloadLink={downloadLinkVar} text={watermarkText} setText={setWatermarkText}/>
  );
};

export default AddWatermarkExample;
