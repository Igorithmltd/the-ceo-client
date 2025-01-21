import React, {useEffect, useState} from 'react'
import { Isloading } from './';

const PrintImage = (props) => {
        const { imageUrl, ready, title } = props;
        const [file1, setFile] = useState("");

        useEffect(() => {
            if (imageUrl) {
                setFile(imageUrl);
            }
        }, [imageUrl]);
        const handlePrint = () => {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>"${title}"</title>
                    <style>
                        body, html {
                        margin: 0;
                        padding: 0;
                        text-align: center;
                        }
                        img {
                        max-width: 100%;
                        height: auto;
                        }
                    </style>                    
                </head>
                <body>
                    <img src="${file1}" style="width:100%;" onload="window.print(); window.close();">
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };    

  return (
    <>
        <button key="c1" disabled={file1 === ""} 
            className="flex items-center border-[2px] border-red-100 text-red-100 
                rounded-[60px] px-[23.7px] md:px-[32px] py-[14.07px] md:py-[19px] font-bold text-[12px] md:text-[17px]" 
            onClick={(e) => { handlePrint(); }}
        >Print</button>
        {file1 === "" && [<Isloading key="a" />]}
    </>
  )
}

export default PrintImage;