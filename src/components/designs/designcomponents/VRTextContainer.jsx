import React, { useEffect, useState, useContext } from 'react'
import { Modal, Box, Stack} from "@mui/material";
import { FaWindowClose} from 'react-icons/fa';
import { useDesign } from "../../../context/DesignContext";

const VRTextContainer = props => {
  const { x, y, containerStyle, selfStyle, content, content_type, userData,
    iwidth, iheight, name, maxLength, index, setFormItem, recalculate,datestamp ,daystamp,monthstamp,yearstamp} = props;

  const [text, setText] = useState(content);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [description, setDescription] = useState("");
  const { receipttype } = useDesign();



  //////////////////////////////////////////////////////////////////
  //###############################################################
  const st = {
    position: 'absolute',
    width: "100%",
    height: "100%",
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
    //backgroundColor: '#F5F5F5',
    backgroundColor: 'rgba(0,0,0,0.5)',
  };

  const sty = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const setTempText = (e) => {
    if(receipttype ==="new"){
      setFormItem(index, e)
      if (name.includes("quantity")) {
        recalculate("quantity", e);
      }
      if (name.includes("unitprice")) {
        recalculate("unitprice", e);
      }
    }
  }
  const changeText = async () => {
    if (content === "" || content === null) {
      //swal("sorry you can't change to an empty value");
      handleClose();
    } else {
      setText(content);
      handleClose();
    }
  }

  useEffect(() => {
    setText(content)
  }, [content])


  const processInstruction = () => {
    if (content_type === "Static" || content_type === "company_name" || content_type === "slogan") {
      return "Sorry, this value can't be changed";
    } else if (content_type === "Editable") {
      return "This can only contain the Length of the Original text";
    } else if (content_type === "service1" || content_type === "service2" || content_type === "service3" ||
      content_type === "all_services") {
      return "Please Add the major summery of your services.";
    } else if (content_type === "phone1" || content_type === "whatsapp") {
      return "Do well to add the phone in the right format";
    } else {
      return "Please make sure that the Information you are inputing sutes well into the Box."
    }
  }
  const loadDescription = async () => {
    if (content_type === "editable") {
      setDescription("Customizable");
    } else if (content_type === "static") {
      setDescription("Static");
    } else if (content_type === "formdata") {
      setDescription("Product/ Sales");
    } else if (content_type === "company_name") {
      setDescription("Company Name");
    } else if (content_type === "slogan") {
      setDescription("Slogan");
    } else if (content_type === "address") {
      setDescription("Address");
    } else if (content_type === "service1") {
      setDescription("Service 1");
    } else if (content_type === "service2") {
      setDescription("Service 2");
    } else if (content_type === "service3") {
      setDescription("Service 3");
    } else if (content_type === "all_services") {
      setDescription("Services");
    } else if (content_type === "phone1") {
      setDescription("Mobile Number");
    } else if (content_type === "whatsapp") {
      setDescription("Whatsapp Number");
    } else if (content_type === "all_contacts") {
      setDescription("Contacts");
    } else if (content_type === "instagram") {
      setDescription("instagram");
    } else if (content_type === "facebook") {
      setDescription("facebook");
    } else if (content_type === "website") {
      setDescription("Website");
    } else if (content_type === "email") {
      setDescription("email");
    }else if (content_type === "amountinword") {
      setDescription("amountinword");
    }
  }
  useEffect(() => {
    loadDescription();
  }, [])

  const SelfColorCode = selfStyle.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/gi);
  const ContainerColorCode = containerStyle.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/gi);

  const styles = {
    top: y,
    left: x,
    backgroundColor: `${ContainerColorCode}`,
    width: `${parseFloat(iwidth)}px`,
    height: `${parseFloat(iheight)}px`
    // width: `${parseFloat(iwidth) + 6.0}px`,
    // height: `${parseFloat(iheight) + 20.0}px`
  }

  const a = selfStyle.split(" ");
  let i = 0;
  let ai = "";
  for (i = 0; i < a.length; i++) {
    ai = ai + String(a[i]) + " "
  }

  const generateSpace = (val, num) => {
    let i = 0;
    let a = " ";
    for (i = 0; i < num; i++) {
      a += val;
    }
    return a;
  }


  //#######################################################################
  /////////////////////////////////////////////////////////////////////////

  return (
    <div
      style={styles}
      className={` absolute z-30 break-words ${containerStyle}`}
    >
      <p key="a" className={`bg-transparent verticalR ${selfStyle}`}
        style={{rotate:`${props.degree}deg`,opacity:`${props.opacity}%`, fontSize: `${iwidth}px`, color: `${SelfColorCode}`, 
        letterSpacing:`${props.letterspace}px`,lineHeight:`${props.lineheight}`, borderRadius:`${props.tl}px ${props.tr}px ${props.br}px ${props.bl}px` }}
        onClick={() => { handleOpen(); }}
        disabled={receipttype==="new"?false:true}
        >

        {(content_type === "static") && [content]}
        {(content_type === "editable") && [
          (text === "" || text === " ") ? [
            generateSpace(" ", maxLength)
          ]
            :
            text
        ]}
        {(content_type === "formdata" || content_type === "productname") && [
          (text === "" || text === " ") ? [
            generateSpace(" ", maxLength)
          ]
            :
            text
        ]}
        {(content_type === "amountinword") && [
          (text === "" || text === " ") ? [
            generateSpace(" ", maxLength)
          ]
            :
            text
        ]}

        {(content_type === "company_name") && [
          (userData.companyname === null || userData.companyname === "") ?
            content
            :
            userData.companyname
        ]}

        {(content_type === "slogan") && [
          (userData.slogan === null || userData.slogan === "") ?
            content
            :
            userData.slogan

        ]}
        {(content_type === "address") && [
          (userData.address === null || userData.address === "") ?
            content
            :
            userData.address
        ]}

        {(content_type === "service1") && [
          (userData.offer1 === null || userData.offer1 === "") ?
            content
            :
            userData.offer1
        ]}

        {(content_type === "service2") && [
          (userData.offer2 === null || userData.offer2 === "") ?
            content
            :
            userData.offer2
        ]}

        {(content_type === "service3") && [
          (userData.offer3 === null || userData.offer3 === "") ?
            content
            :
            userData.offer3
        ]}

        {(content_type === "service4") && [
          (userData.offer4 === null || userData.offer4 === "") ?
            content
            :
            userData.offer4
        ]}
        {(content_type === "service5") && [
          (userData.offer5 === null || userData.offer5 === "") ?
            content
            :
            userData.offer5
        ]}
        {(content_type === "service6") && [
          (userData.offer6 === null || userData.offer6 === "") ?
            content
            :
            userData.offer6
        ]}
        {(content_type === "all_services") && [
          (userData.offer1 === "" && userData.offer2 === "" && userData.offer3 === "") ?
            content
            :
            (userData.offer1 !== "" ? userData.offer1 : "") + (userData.offer2 !== "" ? "|" + userData.offer2 : "") +
            (userData.offer3 !== "" ? "|" + userData.offer3 : "")
        ]}

        {(content_type === "phone1") && [
          (userData.phone1 === null || userData.phone1 === "") ?
            userData.phone
            :
            userData.phone1
        ]}
        {(content_type === "whatsapp") && [
          (userData.whatsapp === null || userData.whatsapp === "") ?
            userData.phone
            :
            userData.whatsapp
        ]}
        {(content_type === "all_contacts") && [
          (userData.phone1 === "" && userData.whatsapp === "") ?
            (userData.phone + " | " + userData.phone)
            :
            (userData.phone1 !== " " && (userData.phone1 + (userData.whatsapp !== " " && "|"))) +
            (userData.whatsapp !== " " && " " + userData.whatsapp)
        ]}
        {(content_type === "instagram") && [
          (userData.instagram === null || userData.instagram === "") ?
            " "
            :
            userData.instagram
        ]}
        {(content_type === "facebook") && [
          (userData.facebook === null || userData.facebook === "") ?
            " "
            :
            userData.facebook
        ]}
        {(content_type === "website") && [
          (userData.website === null || userData.website === "") ?
            " "
            :
            userData.website
        ]}
        {(content_type === "email") && [
          (userData.email === null || userData.email === "") ?
            " "
            :
            userData.email
        ]}
        {(content_type === "datestamp") && [
          (datestamp === null || datestamp === "") ?
            "2024"
            :
            datestamp
        ]}
        {(content_type === "yearstamp") && [
          (yearstamp === null || yearstamp === "") ?
            "2024"
            :
            yearstamp
        ]}
        {(content_type === "monthstamp") && [
          (monthstamp === null || monthstamp === "") ?
            "2024"
            :
            monthstamp
        ]}
        {(content_type === "daystamp") && [
          (daystamp === null || daystamp === "") ?
            "2024"
            :
            daystamp
        ]}
        {(content_type === "salesagent") && [
          (userData.agentfullname === null || userData.agentfullname === "") ?
            "-"
            :
            userData.agentfullname
        ]}
      </p>
      <Modal key="b" sx={st} open={open} onClose={handleClose} transparent={true} animationType="fade" >
        <Box className="w-11/12">
          <Stack sx={sty} className="flex flex-row">
            <div className='flex flex-col w-full'>
              <legend key="f" className='-mt-8  text-blue-600 flex justify-center uppercase underline underline-offset-4 font-bold'>{description}</legend>
              <Stack key="fbd" className="flex flex-row bg-transparent w-full justify-end h-30 pr-1 pb-3">
                <FaWindowClose onClick={() => { handleClose() }} className="w-12 h-6 "></FaWindowClose>
              </Stack>
              <Stack key="g" className="flex flex-row w-full h-30">
                <fieldset className='border w-full mb-5 pr-4'>
                  <legend key="fbd2">{name}</legend>
                  {(content_type === "static" || content_type === "company_name" || content_type === "slogan") ? [
                    <div  key="a">
                      <p>Sorry, you can't change this.</p>
                    </div>
                  ] : [
                    <input key='fbd' type="text" maxLength={`${maxLength}`} onChange={(e) => { setTempText(e.target.value) }}
                      onFocus={(e) => { e.target.select() }}
                      value={content}
                      className='w-full p-2 m-2 bg-slate-200 justify-self-center' placeholder={content} />
                  ]}
                  <p key="fbd1" className='text-sm font-Inter-Regular text-gray-400'>Characters Remaining : {maxLength - content?.length}</p>
                </fieldset>
              </Stack>
              <Stack key="h" className="flex flex-row bg-transparent w-full h-30">
                <input type="button" className='p-2 bg-blue-400 w-full rounded-lg' value="SET" onClick={() => { changeText(); }} />
              </Stack>
              <Stack key="i" className="flex flex-col bg-transparent w-full">
                <i key="a" className='flex flex-row w-full justify-end font-extrabold text-sm' onClick={() => { setShowInstruction(!showInstruction); }} >i {showInstruction ? "(Hide)" : "(Show)"}</i>
                {showInstruction && [
                  <span key="b" className='flex flex-row w-full font-extrabold text-sm italic text-red-500'>
                    {processInstruction()}
                  </span>
                ]}
              </Stack>
            </div>
          </Stack>
        </Box>
      </Modal>
    </div >
  )
}

export default VRTextContainer;