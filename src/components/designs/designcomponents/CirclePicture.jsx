import React, { useContext, useState, useRef } from 'react';
import { Modal, Box, Stack } from "@mui/material";
import { FaWindowClose } from 'react-icons/fa';
import "./index.css"
import Cropblock from '../crop/Cropblock';
import { Isloading, DesignImageTrabed } from "../../designs";
import ApiSetup from "../../../utils/ApiSetup";
import {baseUrl} from "../../../utils/ApiSetup";
import toast from 'react-hot-toast';
import { useDesign } from "../../../context/DesignContext";


const CirclePicture = props => {
  
  const api = ApiSetup();

  const { x, y, containerStyle, selfStyle, url_type, userData, url, Alt, iwidth, iheight ,
    formEdit, setFormEdit, content, index, setFormOnePicItem, setFormItem, maxLength } = props;
  const [file, setFile] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [cropedfile, setCropedFile] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageRatio, setImageRatio] = useState(1);


  const { initials, defaultDatas} = useDesign();

  const [uploadProgress, setUploadProgress] = useState(0);
  const progressRef = useRef();
  const [rembgstate, setRembgstate] = useState(false);

  const [newurl, setNewurl] = useState(undefined);

  //Update the Global CordinateContext

  //////////////////////////////////////////////////////////////////
  //###############################################################
  const handleCrop = async () => {
    setOpenCrop(true);
    //handleClose();
  }

  const st = {
    position: 'absolute',
    top: '20%',
    width: "90%",
    height: "80%",
    margin: "auto",
    boxShadow: 24,
    backgroundColor: 'transparent',
  };
  const sty = {
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


  const styles = {
    top: y,
    left: x
  }
  //#######################################################################
  /////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////
  // Get file after removing password. 
  //#####################################################################################

  const options = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 90) {
        setUploadProgress(percent);
      }
    }
  }
  const getExtension = (filename) => {
    return filename.split('.').pop()
  }
  const ProcessRemovebg = async (file1) => {
    const formData = new FormData();
    let remstate = rembgstate ? "yes" : "no";

    const ext = getExtension(file1.name);

    formData.append("file", file1);
    formData.append("oldurl", content);
    if (remstate === "yes") {
      if (ext === "jpg") {
        toast("Sorry, This is a jpeg File. We support PNG background removal for now. Your profile will be uploaded with the background");
        setFile(URL.createObjectURL(file1))
        setFormItem(index, file1);
        setFormOnePicItem(index, "picturefile");
        setNewurl(undefined);
      } else {
        setOpenCrop(false);
        setFile(undefined);
        handleClose();
        const resp1 = await api.postFormData("returnremovedbg",
          formData,
          options );
        setNewurl(resp1?.data)
        setFormItem(index, resp1?.data);
        setFormOnePicItem(index, "pictureurldirect");
      }
    } else {
      setNewurl(undefined);
      setFile(URL.createObjectURL(file1))
      setFormItem(index, URL.createObjectURL(file1));
      setFormOnePicItem(index, "picturefile");
    }
    setUploadProgress(100);
    
      setUploadProgress(0);
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  // Process the Url to Show
  //#####################################################################################
  const isBlob = (str)=>{
    let arr = str.split(':');
    if(arr.includes('blob')){
      return true;
    }else{
      return false;
    }
  }
  // defaultDatas
  const processur = () => {
    if (url_type === "logo") {
      return baseUrl + userData.logo;
    } else if (url_type === "signature") {
      return baseUrl + userData.signature;
    } else if (url_type === "editable") {
      if(formEdit){
        if(maxLength === "pictureurl"){
          return baseUrl + content;
        }else if(maxLength === "pictureurldirect"){
          return baseUrl + content;
        }else if(isBlob(content)){
          return content;
        }else{
          return baseUrl + url;
        }
      }else{
        if(url.length <= 5){
          return defaultDatas.editable
        }
        if (file !== undefined) {
          return file;
        } else if (newurl !== undefined) {
          return baseUrl + newurl;
        } else {
          return baseUrl + url;
        }
      }
    } else {
      if(url.length <= 5){
        return defaultDatas.editable
      }else{
        return baseUrl + url;
      }
    }
  }
  const uploadBarStyle = {
    position: 'absolute',
    width: "50%",
    height: "50%",
    border: '0px',
    top: "50%",
    boxShadow: 2,
    p: 1,
    background: 'transparent',
  }
  //#########################################################################################
  ///////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div key={url}
      style={styles}
      className={`absolute z-20  ${containerStyle}`}
    >
    
      {( url_type === "logo" && (userData.logo === null || userData.logo === "" )) ? [
        <p key="a1" className={`bg-fixed flex flex-row justify-center items-center font-Montserrat-ExtraBold rounded-full ${selfStyle}`} 
          style={{ fontSize: `${iwidth/1.8}px`,height:`${iheight}px`, width:`${iwidth}px`, 
            color:userData.maincolor, rotate:`${props.degree}deg`, 
              opacity: (uploadProgress > 0) ? 0.3 : `${props.opacity}%`}}>
            {initials}
        </p>
      ] : [
        <DesignImageTrabed key="a" src={processur()} alt={`${Alt}`}
          className={`bg-fixed rounded-full ${selfStyle}`}
          style={{ width: `${iwidth}px`,height: `${iheight}px`,rotate:`${props.degree}deg`, 
            opacity: (uploadProgress > 0) ? 0.3 : `${props.opacity}%`}}
          onClick={() => { setImageRatio((iwidth/iheight).toFixed(2)); handleOpen(); }}
        />
      ]}
      {(uploadProgress > 0) && [
        <label key="b" style={uploadBarStyle} className=" w-5/12" >
          <progress ref={progressRef} value={uploadProgress} max="100" className='w-full rounded-lg' />
        </label>
      ]}

      <Modal key="c" sx={st} open={open} onClose={handleClose} >
        <Box className="w-11/12 mt-4">
          <Stack sx={sty} className='flex flex-col'>
            <div className='flex flex-col w-full'>
              <Stack key="b" direction="row" className="bg-transparent w-full justify-end h-30 pr-5 pb-3">
                <FaWindowClose onClick={() => { handleClose() }} className="w-12 h-6 "></FaWindowClose>
              </Stack>
              <Stack key="a" direction="row" className=" w-full h-30 flex flex-row justify-center">
                {(url_type !== "editable") ? [
                  <div key="a">
                    <p>Sorry, you can't change this.</p>
                  </div>
                ] : [
                  <div key="b" className='flex flex-row '>
                    <div className="flex flex-col w-full">
                      <input key='fbd' id='logo' type="file" onChange={(e) => { setFormEdit(false); setFile(URL.createObjectURL(e.target.files[0])); handleCrop(); }} className='w-11/12 p-2 m-2 justify-self-center hidden' accept="image/*" />
                      <label key='fbc' htmlFor="logo" className='flex flex-row justify-center  rounded-xl bg-blue-300 cursor-pointer p-4 mb-5'>Upload</label>

                      <label key="a" htmlFor='checkbox' className='flex flex-row justify-center text-xs'> Remove Background? &nbsp; &nbsp;
                        <input key="checkbox" id='checkbox' type="checkbox" value={rembgstate} checked={rembgstate} onChange={(e) => { setRembgstate(!rembgstate) }} />
                      </label>

                      {openCrop && [
                        <Cropblock key="as" photoURL={file} setOpenCrop={setOpenCrop} setPhotoURL={setFile} Imageratio={imageRatio}
                          setCropedFile={setCropedFile} setLoading={setLoading} handleClose={handleClose} finalFunction={ProcessRemovebg} />
                      ]}
                      {loading && [
                        <Isloading />
                      ]}
                    </div>
                  </div>
                ]}
              </Stack>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}

export default CirclePicture;
