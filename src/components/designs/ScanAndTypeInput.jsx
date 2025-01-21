import React, {useState} from 'react';
import {Modal, Box, Stack } from "@mui/material";
import QrReader from "react-qr-barcode-scanner";
import { FaQrcode, FaWindowClose } from 'react-icons/fa';
import { Isloading } from "../designs";
import { Icon } from '@iconify-icon/react';
import { CiCircleQuestion } from "react-icons/ci";

const ScanAndTypeInput = (props) => {
    const {value, setValue, label, placeholder, processScanCode} = props;
    
    const [openScan, setOpenScan] = useState(false);
    const handleOpenScan = () => setOpenScan(true);
    const handleCloseScan = () => setOpenScan(false);
    const [processing, setProcessing] = useState(false);
    const ProcessScan1 = () =>{
        handleOpenScan();
    }
    const handleScan = (data) => {
        if (data) {
            //let intval = parseInt(data.text);
            setProcessing(true);
            try{
                processScanCode(data)
            }catch(error){
                handleCloseScan()
                setProcessing(false);
            }finally{
                handleCloseScan()
                setProcessing(false);
            }
        }
    };
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
    return (
        <div key="a" className="flex flex-row w-full justify-center items-center ">
            <div className='flex flex-col justify-center w-full'>
                <div className="flex flex-col px-1">
                <label className="flex gap-4 items-center">
                    <div className="flex border-gray-400 rounded-full border p-2">
                    <Icon icon="iconoir:coins" width="20" height="20"
                    
                />
                    </div>
                    <div className="flex gap-2">
                    <span className="text-center">
                    {label}
                    </span>
                    <CiCircleQuestion className="text-top" size={15} />
                    </div>
                </label>
                <div className="flex gap-4">
                    {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                    <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                    {/*</div>*/}
                    <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none">
                    <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold 
                        text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
                        name={label}
                        id={label}
                        placeholder={placeholder}
                        onChange={(e) => { setValue(e.target.value); }}
                        value={value}
                        maxLength={45}
                    />
                    <FaQrcode 
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => { ProcessScan1(); }} 
                        style={{ width: "5%" }}
                    />
                    {/* <button key="c" className='inline-block '  onClick={() => { ProcessScan1(); }} ></button> */}
                    <div key="d">
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
                                            
                                            {processing ? 
                                                [<Isloading key="a" />] :
                                                [
                                                <div key="b" className="flex flex-col w-full justify-center">
                                                    <QrReader
                                                        delay={500}
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
                                        </div>
                                    </div>
                                </Stack>
                            </Box>
                        </Modal>
                    </div>
                    </div>
                </div>
                </div>
                {/* <fieldset key="a" className='flex flex-row border rounded-lg p-1 border-gray-700 w-full hover:border-green-400'>
                    <legend key="a" className='ml-2 text-sm'>{label}</legend>
                    <input key="b" type="text" className='w-full rounded-lg bg-transparent font-semibold text-black focus:outline-none pl-3'
                        name={label}
                        id={label}
                        placeholder={placeholder}
                        onChange={(e) => { setValue(e.target.value); }}
                        value={value}
                        maxLength={45}
                    />
                    <button key="c" className='inline-block '  onClick={() => { ProcessScan1(); }} ><FaQrcode className="w-6 h-6 cursor-pointer" /></button>
                    <div key="d">
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
                                            
                                            {processing ? 
                                                [<Isloading key="a" />] :
                                                [
                                                <div key="b" className="flex flex-col w-full justify-center">
                                                    <QrReader
                                                        delay={500}
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
                                        </div>
                                    </div>
                                </Stack>
                            </Box>
                        </Modal>
                    </div>
                </fieldset> */}
                <div key="b" className="flex flex-row justify-end text-[9px] mt-0 font-Montserrat-ExtraBold">{value?.length}/45</div>
            </div>
        </div>
    )
}

export default ScanAndTypeInput