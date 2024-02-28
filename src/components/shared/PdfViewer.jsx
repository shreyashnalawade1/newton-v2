import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer(props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);
  const viewerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onPageLoadSuccess() {
    setPageWidth(viewerRef.current?.clientWidth || window.innerWidth);
    setLoading(false);
  }

  function goToNextPage() {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }

  function goToPreviousPage() {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  }

  useEffect(() => {
    function handleResize() {
      setPageWidth(viewerRef.current?.clientWidth || window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative block  lg:hidden mg:hiddden ">
      <Nav pageNumber={pageNumber} numPages={numPages}></Nav>
      <div
        hidden={loading}
        style={{ height: "calc(100vh - 64px)", width: "100%" }}
        className="flex items-center"
      >
        <div
          className={`flex items-center justify-between w-full absolute z-10 px-2`}
        >
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="relative px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
          </button>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="relative px-2 py-24 text-gray-400 hover:text-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="flex justify-center w-full mx-auto">
          <div ref={viewerRef} className="max-w-full overflow-hidden">
            <Document
              file={props.file}
              onLoadSuccess={onDocumentLoadSuccess}
              renderMode="canvas"
              className=""
              error=""
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onLoadSuccess={onPageLoadSuccess}
                onRenderError={() => setLoading(false)}
                width={pageWidth}
                loading=""
                renderInteractiveForms={true}
                scale={1.0} // Adjust the scale value as needed
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nav({ pageNumber, numPages }) {
  return (
    <nav className="bg-black">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <p className="text-2xl font-bold tracking-tighter text-white">
                Papermark
              </p>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              <span>{pageNumber}</span>
              <span className="text-gray-400"> / {numPages}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
