import React, { useState } from 'react';
import { Modal, Box, Stack} from "@mui/material";
import { FaWindowClose } from 'react-icons/fa';
import ApiSetup from "../../utils/ApiSetup";
// Crop Block
import Cropblock from './crop/Cropblock';
// Is Loading
import { Isloading} from "../designs";
import toast from 'react-hot-toast';
import {baseUrl} from "../../utils/ApiSetup";

const Ordinary = props =>{
    const api = ApiSetup();
    const { des, setFormItem, setFormEdit, setFormOnePicItem, handleClose,
            processScroll,designRef } = props;

    // Record the Id to help us track it when we need
    const [fileHolder, setFileHolder] = useState(undefined);
    const [currentOnePictureId, setCurrentOnePictureId] = useState("");
    const [currentOnePictureUrl, setCurrentOnePictureUrl] = useState("");
    const [currentOnePicturetype, setCurrentOnePictureType] = useState("");
    // This controls the Modal for One Picture Edit from form.
    const [openOneP, setOpenOneP] = useState(false);
    const handleOpenOneP = () => setOpenOneP(true);
    const handleCloseOneP = () => setOpenOneP(false);

    const [openOneCrop, setOpenOneCrop] = useState(false);
    const [cropedfile, setCropedFile] = useState(undefined);
    const [rembgstate, setRembgstate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageRatio, setImageRatio] = useState(1);


    const processEditOnePicture = (idofcomp,u,typ,width,height) =>{
        setCurrentOnePictureId(idofcomp);
        setCurrentOnePictureUrl(u);
        setCurrentOnePictureType(typ);
        setImageRatio((width/height).toFixed(2));
        handleOpenOneP();
    }

    const isEditableFile = (des) => {
        let state = false;
        if ((des.url_type === "editable") && (des.content_type === "editable"||"selectableV"||"selectableH"||"selectableBg")) {
          state = true;
        }
        return state;
    }
    const isEditableText = (des) => {
        let state = false;
        if ((des.content_type === "editable") && ((des.name === "TextContainer")|| (des.name === "VRTextContainer") || (des.name === "VLTextContainer") )) {
          state = true;
        }
        return state;
    }


    const handleCrop = async () => {
        setOpenOneCrop(true);
    }
    const getExtension = (filename) => {
        return filename.split('.').pop()
    }
    const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 90) {
            setUploadProgress(percent);
          }
        }
    }  
    const resetOneP = () =>{
        handleCloseOneP();
        setOpenOneCrop(false);
        setCurrentOnePictureId("");
        setCurrentOnePictureUrl("");
        setCurrentOnePictureType("");
        setFileHolder(undefined);
        setCropedFile(undefined);
        setUploadProgress(0);
    }
    const AddOnePictureToDesign = async (file1) => {
        setLoading(true);
        setFormEdit(true);
        const formData = new FormData();
        let remstate = rembgstate ? "yes" : "no";
    
        const ext = getExtension(file1.name);
    
        formData.append("file", file1);
        formData.append("oldurl", currentOnePictureUrl);
        if (remstate === "yes") {
            if (ext === "jpg") {
                toast.error("Sorry, This is a jpeg File. We support PNG background removal for now. Your profile will be uploaded with the background");
                setFormItem(currentOnePictureId, URL.createObjectURL(file1))
                setFormOnePicItem(currentOnePictureId, "picturefile");
                setLoading(false);
            } else {
                const resp1 = await api.postFormData("returnremovedbg",
                formData,
                options );
                if(resp1?.data === "error"){
                    toast.error("Please check your network and try again");
                    setLoading(false);
                }else{
                    setFormItem(currentOnePictureId, resp1?.data);
                    setFormOnePicItem(currentOnePictureId, "pictureurl");
                    resetOneP();
                    setLoading(false);
                }
            }
        } else {
          resetOneP();
          setFormItem(currentOnePictureId, URL.createObjectURL(file1))
          setFormOnePicItem(currentOnePictureId, "picturefile");
          setLoading(false);
        }
        setUploadProgress(100);
        setUploadProgress(0);
        
    }

    const isBlob = (str)=>{
        let arr = str.split(':');
        if(arr.includes('blob')){
          return true;
        }else{
          return false;
        }
    }    
    const processPicUrl = (maxlength,ur, content) => {
        if(maxlength === " "){
            return baseUrl + ur;
        }else if(maxlength === "pictureurl"){
            return baseUrl + content;
        }else if(maxlength === "pictureurldirect"){
            return baseUrl + content;
        }else if(isBlob(content)){
            return content;
        }else{
            return baseUrl + ur;
        }
    }    
    const st1 = {
        position: 'absolute',
        top: '20%',
        width: "90%",
        height: "80%",
        margin: "auto",
        boxShadow: 24,
        backgroundColor: 'transparent',
    };
    const sty1 = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        margin: "auto",
        transform: 'translate(-50%, -50%)',
        width: "100%",
        height: "100%",
        bgcolor: 'white',
        boxShadow: 20,
        p: 2,
    }; 
    function validateData(data) {
        return data !== null && data !== undefined && data !== "" && data !== " ";
    }
    const processMaxLength = (max) =>{
        return validateData(max)?max:100
    }
    return (
        <div key="Ordinary" className='flex flex-col w-11/12' >
            <div key="a" className='flex flex-row justify-center pb-10'>
                <div key="a" className='flex flex-row justify-start w-10/12'>
                    <h1 key="a1" className='flex flex-row justify-center text-2xl pl-2 font-Montserrat-Bold font-bold text-red-700'>Fill In the details:</h1>
                </div>
            </div>
            <Stack key="b" direction="row" className="w-full h-30 flex flex-row justify-center overflow-scroll scrollbar-hide ">
                <div className='flex flex-col w-full space-y-2'>
                    {des.components.map((desig, index) => {
                        // For the Text Components
                        if (isEditableText(desig)) {
                            return (
                            <div key={index}>
                                <p key="a" className='flex flex-row justify-start pl-2 text-blue-500 font-Bebas-Neue  '>{desig.description} :</p>
                                <fieldset key="b" className='border rounded-full border-gray-700 p-2 w-full hover:border-green-400 hover:border-2'>
                                    <input key="a1" type="text" className='w-11/12 bg-transparent font-semibold text-black focus:outline-none pl-3'
                                        onChange={(e) => { setFormItem(index, e.target.value); }}
                                        value={desig.content}
                                        placeholder={desig.content}
                                        onFocus={(e) => { e.target.select() }}
                                        maxLength={processMaxLength(desig.content_max_char)}
                                    />
                                </fieldset>
                                <p key="c" className='flex flex-row text-sm font-Inter-Regular text-gray-400 justify-end '>Characters Remaining : {processMaxLength(desig.content_max_char) - desig.content.length}</p>
                            </div>
                            );
                        }
                        
                    })}
                    {des.components.map((desig, index) => {
                        if (isEditableFile(desig)) {
                            return (
                            <fieldset key={"a"+index} className='p-2 w-full hover:border-green-400 hover:border-2' >
                                <p key="a" className='flex flex-row justify-start align-center pl-2 text-blue-500 font-Bebas-Neue  '>{desig.description}</p>
                                <img key="a1" src={processPicUrl(desig.content_max_char, desig.default_url, desig.content)} alt='picture'
                                style={{maxHeight:`${desig.height}px`, width:"100%"}}
                                className='bg-fixed rounded-lg' onClick={() => { processEditOnePicture(index,desig.default_url,desig.content_type,desig.iwidth,desig.iheight); }}
                                />
                            </fieldset>
                            );
                        }
                    })}
                </div>
            </Stack>
            <Stack key="c">
                <div key="a" className='flex flex-row w-full justify-center'>
                    <button disabled={loading} className='rounded-xl m-5 p-2 cursor-pointer bg-red-500 hover:bg-red-600 font-extrabold text-white' onClick={() => { processScroll(designRef,"done"); handleClose(); }} >Done</button>
                </div>
                <div key="b" className='flex flex-row w-full justify-center'>
                    {loading && [<Isloading />]}
                </div>
            </Stack>
            
            <Modal key="d" sx={st1} open={openOneP} onClose={handleCloseOneP}>
                {/* This Handles the Editing of One Picture per Time From Form */}
                <Box key="box" className="w-11/12 mt-4">
                    <Stack key="a" sx={sty1} className="flex flex-col">
                        <div key="a" className='flex flex-col w-full'>
                            <Stack key="a" direction="row" className="bg-transparent w-full justify-end h-30 pr-5 pb-3">
                                <FaWindowClose onClick={() => { handleCloseOneP() }} className="w-12 h-6 "></FaWindowClose>
                            </Stack>
                            <div key="b" className='flex flex-row '>
                                <div key="a" className='flex flex-col w-full'>
                                    <input key='fbd' id='logo' type="file" onChange={(e) => { handleCrop(); setFormEdit(true); setFileHolder(URL.createObjectURL(e.target.files[0])) }} className='w-11/12 p-2 m-2 justify-self-center hidden' accept="image/*" />
                                    <label key='fbc' htmlFor="logo" className='flex flex-row justify-center rounded-xl bg-blue-300 cursor-pointer p-4 mb-5'>Upload</label>

                                    <label key="a" htmlFor='checkbox' className='flex flex-row justify-center text-xs'> Remove Background? &nbsp; &nbsp;
                                        <input key="checkbox" id='checkbox' type="checkbox" value={rembgstate} checked={rembgstate} onChange={(e) => { setRembgstate(!rembgstate) }} />
                                    </label>

                                    {openOneCrop && [
                                        <Cropblock  
                                            key="as" 
                                            photoURL={fileHolder} 
                                            setOpenCrop={setOpenOneCrop} 
                                            setPhotoURL={setFileHolder} 
                                            Imageratio={imageRatio}
                                            setCropedFile={setCropedFile} 
                                            setLoading={setLoading} 
                                            handleClose={handleCloseOneP} 
                                            finalFunction={AddOnePictureToDesign} />
                                    ]}
                                    {loading && [
                                        <Isloading key="c" />
                                    ]}
                                </div>
                            </div>                                    
                        </div>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}


export default Ordinary;