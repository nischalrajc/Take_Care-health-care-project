import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PDFviewer() {

     
     // Get the query parameter 'pdf' from the URL
  const location = useLocation();
  const pdfPath = new URLSearchParams(location.search).get('pdf');

  // Log the PDF path to the console
  console.log(pdfPath);

  useEffect(() => {
    // Open the PDF in a new tab
    if (pdfPath) {
      window.open(pdfPath, '_blank');
    }
  }, [pdfPath]);

  return (
    <div>
      {/* You can add additional content or styling for the PdfViewer if needed */}
      <h1>PDF Viewer</h1>
      {/* You might want to display a loading indicator or message here */}
    </div>
  );

}

export default PDFviewer
