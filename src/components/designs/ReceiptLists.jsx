import React from 'react'
import { FaWindowClose } from 'react-icons/fa';
import { DesignSingleObject} from "../designs";
const ReceiptLists = (props) => {
    const { designs,  handleCloseReceiptSelect, handleOpenReceiptSelect,  
        openReceiptSelect, userData, loggedIn, addedProduct, addedService, balance, 
        advance, total, NumericFormat, generateNewDimention, windowSize, generateExpandibleheight, 
        isExpandable, downloadable, generateNewPosition, productcurrency, formEdit, setFormEdit, 
        recalculate, setFormItem, setFormOnePicItem, datestamp, daystamp, monthstamp, yearstamp,
        processDownloadReceipt
    } = props;
   
    return (
        <div>
            <div key="a1" className="flex flex-row w-full justify-end items-end h-30 pb-3">
                <div key="b" className="flex flex-row justify-end w-1/6 pr-2">
                    <FaWindowClose onClick={() => { handleCloseReceiptSelect(); }} className="w-12 h-6 " ></FaWindowClose>
                </div>
            </div>
            <div key="b" className='flex flex-row justify-start w-full overflow-scroll scrollbar-hide'>
                <div className="flex flex-row justify-center items-center scrollbar-hide pl-2 pr-2" >
                    {
                        designs.map((des,index)=>{
                            return(
                                <div className='flex relative'>
                                    <DesignSingleObject 
                                        des={des[0]}
                                        userData={userData}
                                        addedProduct={addedProduct} addedService={addedService} 
                                        balance={balance} paid={advance} total={total} NumericFormat={NumericFormat} 
                                        generateNewDimention={generateNewDimention} windowSize={windowSize} 
                                        generateExpandibleheight={generateExpandibleheight} isExpandable={isExpandable} 
                                        downloadable={downloadable} generateNewPosition={generateNewPosition}
                                        currency={productcurrency} formEdit={formEdit} setFormEdit={setFormEdit} recalculate={recalculate} 
                                        setFormItem={setFormItem} setFormOnePicItem={setFormOnePicItem} datestamp={datestamp} 
                                        daystamp={daystamp} monthstamp={monthstamp} yearstamp={yearstamp}/>
                                        <div className="z-35 w-full h-full p-4 flex justify-center items-center 
                                            absolute bg-[#687aed]  text-white text-sm font-Montserrat-ExtraBold opacity-40"
                                            onClick={()=>{processDownloadReceipt(des[0])}}
                                            >
                                            Click to Select
                                        </div> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default ReceiptLists