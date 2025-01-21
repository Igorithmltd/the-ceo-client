import React, {useState} from 'react'

import {Modal, Box, Stack } from "@mui/material";
import { FaWindowClose, FaQrcode } from 'react-icons/fa';
import QrReader from "react-qr-barcode-scanner";

import { NumericFormat } from 'react-number-format';

import { Isloading } from "../designs";
import swal from 'sweetalert';


const ScanProduct = (props) => {

    const {ProcessScan, allusersalesitems, count, leng } = props;
    const [openScan, setOpenScan] = useState(false);
    const handleOpenScan = () => setOpenScan(true);
    const handleCloseScan = () => setOpenScan(false);
    const [processing, setProcessing] = useState(false);
    const [processed, setProcessed] = useState(false);

    const [scantype, setScantype] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [servicename, setServiceName] = useState("");
    const [initialamount, setInitialAmount] = useState("");
    const [capacity, setCapacity] = useState("");
    /// For product details 
    //prod=[productId,productname,unitrate,unitcostprice,quantity,amount]
    const [files, setFiles] = useState(undefined);
    const [productId, setProductId] = useState("");
    const [productname, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [stock, setStock] = useState("");
    const [unitSellingPrice, setUnitSellingPrice] = useState("");
    const [unitCostPrice, setUnitCostPrice] = useState("");
    const [compiledSales, setCompiledSales] = useState([]);
    const [quantity, setQuantity] = useState("");

    const ProcessScan1 = () =>{
        handleOpenScan();
    }
    const setDefault = () =>{
        setFiles("");
        setProductId("");
        setProductName("");
        setProductDescription("");
        setStock("");
        setUnitSellingPrice("");
        setUnitCostPrice("");
        setQuantity("");
        setProcessing(false);
        setProcessed(false);
    }
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#|%]/g, '\\$&');
    }

    const handleScan = (data) => {
        if (data) {
            //let intval = parseInt(data.text);
            setProcessing(true);
            try{
                let rets = data.text.split("_#$%")
                const filteredProduct = allusersalesitems.filter(prod =>
                    prod.qrdata.toString().match(new RegExp(escapeRegex(data.text), "i"))
                );
                setScantype(rets[0])
                if(rets[0] === "service"){
                    setServiceId(filteredProduct[0].id);
                    setServiceName(filteredProduct[0].name);
                    setInitialAmount(filteredProduct[0].amount);
                    setCapacity(filteredProduct[0].capacity);
                    setFiles(filteredProduct[0].url);
                    setProcessed(true);
                    setProcessing(false);
                }else if(rets[0] === "product"){
                    setProductId(filteredProduct[0].id);
                    setProductName(filteredProduct[0].name);
                    //setProductDescription(filteredProduct[0][2]);
                    setUnitSellingPrice(filteredProduct[0].unitsellingprice);
                    setStock(filteredProduct[0].stock);
                    setUnitCostPrice(filteredProduct[0].unitcostprice);
                    setFiles(filteredProduct[0].url);
                    setProcessed(true);
                    setProcessing(false);
                }
            }catch(error){
                setProcessed(false);
                setProcessing(false);
            }finally{
                setProcessed(true);
                setProcessing(false);
            }
        }
    };
    const enforceNumber = (e,callback) => {
        const newValue = e.replace(/\D/g, '');
        callback(newValue);
    };
    const addtolist = () =>{
        if(leng +1  > count ){
            swal("Max space for input reached.");
        }else if (scantype ==="product" && productname === ""){
            setDefault();
            swal("Unknown product");
        }else if (scantype ==="service" && servicename === ""){
            setDefault();
            swal("Unknown Service");
        }else if(quantity === ""){
            swal("Please add quantity");
        }else{
            try{
                if(scantype === "product"){
                    if(productname !==""){
                        let amount = unitSellingPrice * quantity;
                        setCompiledSales((oldData) => [...oldData,
                            {
                                scantype: scantype,
                                productId: productId,
                                productname: productname,
                                quantity: quantity,
                                unitSellingPrice: unitSellingPrice,
                                unitCostPrice: unitCostPrice,
                                amount: amount,
                                files:files,
                            },
                        ]);
                    }else{
                        swal("Unknown Product");
                        setProcessed(false);
                        setProcessing(false);
                    }
                    setDefault();
                }
                else if(scantype === "service"){
                    if(servicename !==""){
                        let amount = initialamount * quantity;
                        setCompiledSales((oldData) => [...oldData,
                            {
                                scantype: scantype,
                                serviceId: serviceId,
                                servicename: servicename,
                                quantity: quantity,
                                initialamount: initialamount,
                                amount: amount,
                                files:files,
                            },
                        ]);
                    }else{
                        swal("Unknown Product");
                        setProcessed(false);
                        setProcessing(false);
                    }
                    setDefault();
                }
            }catch(e){
                console.log(e)
            }
        }
    }

    const st1 = {
        position: 'absolute',
        width: "96%",
        height: "96%",
        margin: "auto",
        boxShadow: 24,
        backgroundColor: 'transparent',
    };
    const sty1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: "auto",
        transform: 'translate(-50%, -50%)',
        width: "100%",
        bgcolor: 'white',
        boxShadow: 20,
        p: 2,
    };    
    const finalize = () =>{
        if (compiledSales.length === 0){
            setProcessing(false);
            setProcessed(false);
            swal("Nothing to Process");
        }else{
            ProcessScan(compiledSales);
            handleCloseScan();
            setCompiledSales([]);
            setDefault();
        }
    }

    return (
        <>
            <button key="awe" style={{ width: "96px" }} 
                className='flex  flex-row justify-center items-center rounded-xl border-2
                    border-black pr-4 pl-4 p-2 mb-1 cursor-pointer bg-[#ff0000] opacity-100 hover:bg-[#721b1b] 
                    text-base font-extrabold text-black' onClick={() => { ProcessScan1(); }} >
                        Scan 
                        <FaQrcode className="w-6 h-6 ml-[5px]"  />
            </button>
            {/* {scanResult ==="" && [<div id='reader'></div>]} */}

            <Modal key="d" sx={st1} open={openScan} onClose={handleCloseScan} >
                <Box className="w-11/12 mt-2">
                    <Stack  sx={sty1} className="rounded-md">
                        <div className="flex flex-col w-full justify-center item-center">
                            <Stack key="a" className="bg-transparent flex flex-row w-full justify-between items-end h-30 pb-3">
                                <div key="b" className="flex flex-row justify-end pr-2">
                                    <FaWindowClose onClick={() => { handleCloseScan() }} className="w-12 h-6 " ></FaWindowClose>
                                </div>
                            </Stack>
                            <div key="b"  className="flex flex-col w-full justify-center ">
                                
                                {processed ?[
                                    <div key="a" className="flex flex-row w-full justify-center space-x-2">
                                        <div key="a" className="flex flex-row w-1/3 justify-left">
                                            <img src={process.env.REACT_APP_BASE_URL + files} alt="logo" className="rounded-lg w-full " />
                                        </div>
                                        <div key="b" className="flex flex-col w-2/3 justify-left">
                                            <p key="a">Procuct Name : {productname}</p>
                                            <p key="b">Selling Price : {unitSellingPrice}</p>
                                            <fieldset key="c" className='border rounded-lg border-gray-700 w-2/3 hover:border-green-400'>
                                                <legend key="a" className='ml-2 text-[12px]'>Quantity</legend>
                                                <NumericFormat
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-semibold text-black focus:outline-none pl-3'
                                                    name="unitsellingprice"
                                                    id="unitsellingprice"
                                                    onChange={(e)=>{ enforceNumber(e.target.value,setQuantity) }}
                                                    displayType = "Text"
                                                    value={quantity}
                                                    key="b"
                                                />
                                            </fieldset>
                                            <input key="d" onClick={() => addtolist()}
                                                className='rounded-lg p-2 mt-3 text-white font-extrabold text-lg cursor-pointer w-11/12 hover:bg-red-600' type="submit" value={quantity ===""?"Clear":[(productname===""||servicename==="") ? "Clear":"Add"]} 
                                                style={{backgroundColor:"blue"}}
                                                />
                                        </div>
                                    </div>
                                ]: processing ? 
                                    [<Isloading key="c" />] :
                                    [
                                    <div key="b" className="flex flex-col w-full justify-center">
                                       
                                        <QrReader
                                            delay={500}
                                            key="c"
                                            onError={(error)=>{console.log(error)}}
                                            style={{ width: '600px', height: '600px' }}
                                            onUpdate={(err, result) => {
                                                if (result) handleScan(result.text);
                                            }}
                                            torch = {false}
                                            videoConstraints={{
                                                aspectRatio: 1,
                                                frameRate: 30,
                                                facingMode: 'environment',
                                                autoGainControl: true,
                                                echoCancellation: true,
                                                noiseSuppression: true,
                                                sampleRate: 48000,
                                                sampleSize: 16,
                                            }}
                                        />
                                    </div>
                                ]}

                                <div key="d" className="flex flex-col w-full justify-center items-center space-y-1 overflow-scroll scrollbar-hide py-[10px] ">
                                    <div key="a" className='flex flex-col h-[200px] max-h-[200px] overflow-scroll scrollbar-hide'>
                                        <div key="a" className='flex flex-row justify-center items-center font-extrabold text-center'>Scanned Items</div>
                                        {compiledSales?.map((ret,index)=>{
                                            if(ret.scantype === "product"){
                                                return(
                                                    <div key={`e${index}`} className='flex flex-row justify-start items-center p-1 space-x-2 '>
                                                        <img key="a" src={process.env.REACT_APP_BASE_URL + ret.files} alt="logo" className="rounded-lg w-[40px]" />
                                                        <div key="b" className="flex flex-row justify-start"> {ret.quantity} {ret.productname} = {ret.amount}</div>
                                                    </div>
                                                );
                                            }else if (ret.scantype === "service"){
                                                return(
                                                
                                                    <div key={`s${index}`} className='flex flex-row justify-start items-center p-1 space-x-2 '>
                                                        <img key="a" src={process.env.REACT_APP_BASE_URL + ret.files} alt="logo" className="rounded-lg w-[40px]" />
                                                        <div key="b" className="flex flex-row justify-start"> {ret.quantity} {ret.servicename} = {ret.amount}</div>
                                                    </div>
                                                );

                                            }
                                        })}
                                    </div>
                                    <div key="b" className='flex flex-row w-full justify-center items-center'>
                                        <input onClick={() => {finalize()}}
                                            className='rounded-lg p-2 text-white font-extrabold text-lg cursor-pointer w-full hover:bg-red-600' type="submit" value="Process" 
                                            style={{backgroundColor:"red"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default ScanProduct;