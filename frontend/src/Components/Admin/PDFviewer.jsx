import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PDFviewer() {

  const location = useLocation();
  const pdfPath = new URLSearchParams(location.search).get('pdf');

  useEffect(() => {
    // Open the PDF in a new tab
    if (pdfPath) {
      window.open(pdfPath, '_blank');
    }
  }, [pdfPath]);

  return (
    <div>
      <h1>PDF Viewer</h1>
    </div>
  );

}

export default PDFviewer
