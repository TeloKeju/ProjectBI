import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

function MyApp() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function pagesList() {
        var pages = [];
        for (var i = 1; i <= numPages; i++) {
            pages.push(<Page width={500} key={i} pageNumber={i} />);
        }
        return pages;
    }
    console.log(pagesList())

    return (
        <div>
            <Document file="http://localhost:5000/pdf/1.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <HTMLFlipBook width={500} height={707}>
                    {pagesList()}
                    {/* <Page width={500} pageNumber={1} /> */}
                    <div> akoskdoasda</div>
                    <div> akoskdoasdaamsdkamsdkas</div>
                    <div> akoskdoasdaamsdkamsdkasasndansd</div>
                    <div> akoskdoasdaamsdkamsdkasasndansdandasnd</div>
                </HTMLFlipBook>
            </Document>
        </div>
    );
}
export default MyApp;