
import React, {useState, useCallback, useContext } from 'react';
import { Modal, Box} from "@mui/material";
import { FaWindowClose } from 'react-icons/fa';
import { Isloading, ScanAndTypeInput, ValidatorListDropdown} from '../designs';
import { useNavigate } from "react-router-dom";
import {Redirector} from '../designs/ConstantFunctions';
import ApiSetup from "../../utils/ApiSetup";
import toast from 'react-hot-toast';
import { useDesign } from "../../context/DesignContext";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ScanSoldProducts = (props) => {
    const { setCurrentPage, currentPage, setLastnavigated, setIdToDownload, 
        setReceiptType, setSalesData } =  useDesign();
    const {userData} = props;
    const [openSoldProducts, setOpenSoldProducts] = useState(false);
    const handleOpenSoldProducts = () => setOpenSoldProducts(true);
    const handleCloseSoldProducts = () => setOpenSoldProducts(false);
    const navigate = useNavigate();
    const api = ApiSetup();

    // Variables to hold value for operations
    const [scanCode, setScanCode] = useState('');
    const [soldProduct, setSoldProduct] = useState(null);
    const [receiptData, setReceiptData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(false);

    // This function fetches the sold products that are related to this QR code.
    const fetchSoldProduct = useCallback(async function(code){
        setLoading(true);
        try{
            const datas = {
                user_id:userData?.masked_id,
                qrcode:scanCode
            }
            const resp = await api.post('fetchsoldproductsbyclients',
                datas);
            if(resp?.data.message === "success"){
                console.log("fetchsoldproductsbyclients", resp?.data)
                setSoldProduct(resp?.data.soldproducts);
                setReceiptData(resp?.data.receiptdata);
                setLoading(false);
            }else{
                console.log("fetchsoldproductsbyclients",resp?.data)
                setLoading(false);
            }
        }catch (error){
            setLoading(false);
        }
    })

    async function validateAsSupplied(value){
        // Then we validate all the goods and maybe process the receipt
        // Else we validate if it is a digit and validate only the product
        setValidating(true);
        try{
            const datas = {
                user_id:userData?.masked_id,
                qrcode:scanCode,
                value:value
            }
            const resp = await api.post('validatesoldproductsbyclients',
                datas );
            if(resp?.data.message === "success"){
                setSoldProduct(resp?.data.soldproducts);
                toast.success("Set as correct order");
                setValidating(false);
            }else{
                setValidating(false);
            }
        }catch (error){
            setValidating(false);
        }

    }

    function processReceipt(){
        setReceiptType("sales");
        setSalesData(receiptData)
        setIdToDownload(receiptData.design_id);
        Redirector(currentPage,"/Download",setLastnavigated,navigate);
        handleCloseSoldProducts();
    }
    
    const st = {
        marginTop: 13,
        position: 'absolute',
        width: "100%",
        height: "100%",
        boxShadow: 24,
        backgroundColor: 'white',
    };
    const sty = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        height: "90%",
        bgcolor: 'white',
        boxShadow: 24,
        p: 3,
    };
    return (
        <div className='flex flex-row justify-center items-center'>
            {/* <button style={{ width: "200px" }} 
                className='rounded-xl border-2 border-black pr-4 pl-4 p-2 mb-1 cursor-pointer hover:bg-gray-200 font-extrabold bg-white opacity-100 text-black' 
                onClick={() => { handleOpenSoldProducts(); }} >Validate Purchase</button> */}
            <button 
                onClick={() => { handleOpenSoldProducts(); }}
                className="text-red py-4 my-2 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3 w-full"
            >
                Validate Purchase
            </button>

            <Modal key="c" sx={st} open={openSoldProducts} className="-pt-4" onClose={handleCloseSoldProducts} >
                <Box className="w-full mt-4 overflow-y-scroll scrollbar-hide" sx={sty}>
                    <div key="a1" className="flex flex-row w-full justify-end items-end h-30 pb-3">
                        {/* <div key="b" className="flex flex-row justify-end w-1/6 pr-2">
                            <FaWindowClose onClick={() => { handleCloseSoldProducts(); }} className="w-12 h-6 " ></FaWindowClose>
                        </div> */}
                        <div>
                            <IoIosCloseCircleOutline
                            className=""
                            text-gray-400
                            size={25}
                            title="close"
                            onClick={() => { handleCloseSoldProducts(); }}
                            />
                        </div>
                    </div>
                    <div key="b" className='flex flex-col justify-start items-row pt-4'>
                        <ScanAndTypeInput value={scanCode} 
                            setValue={setScanCode} processScanCode={setScanCode} 
                            label="Scan Code" placeholder="Product code on the bar/qr code" />
                        <button 
                            onClick={() => { fetchSoldProduct(scanCode); }}
                            className="text-red py-4 my-2 px-4 border-red border-[2px] rounded-[50px] flex justify-center font-bold md:gap-3 w-full"
                        >
                            Fetch Soled Product &nbsp; {loading && <Isloading/>}
                        </button>
                        {/* <button className='rounded-xl border-2 border-black pr-4 pl-4 p-2 mb-1 cursor-pointer hover:bg-gray-200 font-extrabold bg-white opacity-100 text-black' 
                            onClick={() => { fetchSoldProduct(scanCode); }} >Fetch Soled Product &nbsp; {loading && <Isloading/>}</button> */}
                    </div>
                    {
                        soldProduct && [
                            <div key="c" className='flex flex-col w-full justify-start items-start'>
                                <div key="a" className='pt-4 flex flex-row justify-center w-full' >
                                    <button key="a" className='rounded-xl border-2 bg-green-700 text-white pr-4 pl-4 p-2 mb-1 cursor-pointer hover:bg-gray-200 font-extrabold opacity-100' 
                                        onClick={() => { validateAsSupplied("all"); }} >Validate All {validating && <Isloading />}</button>
                                    <button key="b" className='rounded-xl border-2  bg-green-700 text-white pr-4 pl-4 p-2 mb-1 cursor-pointer hover:bg-gray-200 font-extrabold opacity-100' 
                                        onClick={() => { processReceipt(); }} >PrintReceipt </button>
                                </div>
                                {soldProduct?.map((ret,index)=>{
                                    if(ret.name === ""){
                                        return(
                                            <div key={`w${index}`} className='flex flex-col w-full justify-center item-center border-blue-500 p-2 border-2'>
                                                Your participants were not successfully recorded. But your payment is secured. Please contact the Admin to rectify the issue. 
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <ValidatorListDropdown index={index} ret={ret} validate={validateAsSupplied} />
                                        )
                                    }
                                })}
                            </div>
                        ]
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default ScanSoldProducts