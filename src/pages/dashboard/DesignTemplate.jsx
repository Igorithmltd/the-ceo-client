/* eslint-disable react/jsx-key */
import React, { useState, useCallback, useEffect, useRef } from "react";

import SearchInput from "../../components/SearchInput";
import {Link, useNavigate} from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import { BiDownload } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { useDesign } from "../../context/DesignContext";
import ApiSetup from "../../utils/ApiSetup";
import {baseUrl} from "../../utils/ApiSetup";
import {ShareButtons, PrintImage, DesignSingleObject, CategoryImageSelect,Isloading, ReceiptForm, 
  Invoice, Ordinary, Loadingbutton, ScanProduct }from "../../components/designs";
import {isEmpty }from "../../components/designs/ConstantFunctions";
import { Stack} from "@mui/material";
import { NumericFormat } from 'react-number-format';
import * as htmlToImage from "html-to-image";
import * as htmlToImageIOS from "html-to-image/lib/index.js";
import jsPDF from 'jspdf';
import swal from 'sweetalert';
import download from "downloadjs";
import { Icon } from '@iconify-icon/react';


const DesignTemplate = () => {
  const {userInfo} = useAuth();
  const api = ApiSetup();

  const designParentContainerRef = useRef(null)
  const [designParentContainerWidth, setDesignParentContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = ()=>{
      if(designParentContainerRef.current){
        setDesignParentContainerWidth(designParentContainerRef.current.offsetWidth)
      }
    }
    updateWidth()

    window.addEventListener('resize', updateWidth)

    return ()=> {
      window.removeEventListener('resize', updateWidth)
    }
  }, []);
  // To load other Requirements

  const { design, setDesign, setOldDesign,onlyreceipt,setOnlyReceipt , 
    loggedIn, processInitial, idToDownload, windowSize, receipttype, salesdata, currentPage, 
    setLastnavigated } =  useDesign();
  const [downloading, setDownloading] = useState(false);

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  /////////////////////////////////////////////////////////////////
  //#############################################################
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const isSafari =  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const hasSafariFeatures = 'ontouchend' in document && (!window.MSStream || !window.MSStream.wma);


  const downloadable = useRef();

  const [downloadstage,setDownloadStage]= useState(0);
  const [toRegenerate, setToRegenerate]= useState(false);


  //////////////////////////////////////////////////////////////
  /// Category Images
  /////////////////////////////////////////////////////////////
  const [verticalimg,setVerticalimg] = useState([]);
  const [horizontalimg,setHorizontalimg] = useState([]);
  const [backgimg,setBackgimg] = useState([]);


  //////////////////////////////////////////////////////////////
  // For Invoice
  ////////////////////////////////////////////////////////////////
  const [accountname, setAccountName] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [bankname, setBankName] = useState("");
  const [changebankdetails, setChangebankdetails] = useState(false);
  const [invoicenumber, setInvoiceNumber] = useState("");
  
  
  const [termsandcondition, setTermsAndCondition] = useState("");
  const [productcurrency, setProductCurrency] = useState("");
  ///////////////////////////////////////////////////////////
  // // // Search Product From database.
  ///////////////////////////////////////////////////////////////
  const [stock, setStock] = useState(0);
  const [url, setUrl] = useState("");
  const [unitsellingprice, setUnitsellingprice] = useState(0);
  const [unitcostprice, setUnitCostPrice] = useState(0);
  const [nameinlist, setNameInList] = useState(false);

  ///////////////////////////////////////////////////
  // Totals
  /////////////////////////////////////////////////
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paid, setPaid] = useState(0);


  /////////////////////////////////////////////////////////////////////////
  /// Products
  /////////////////////////////////////////////////////////////////////////
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitrate, setUnitrate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [productSearchMode, setProductSearchMode] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const [addedProduct, setAddedProduct] = useState([]);
  const [addedService, setAddedService] = useState([]);
  const [amountinword, setAmountInWord] = useState("");
  const [receipt_number, setReceiptNumber] = useState(""); 


  /////////////////////////////////////////////////////////////////////////
  // Lets work on the Form
  //#######################################################################
  const [receiptdate, setReceiptDate] = useState(new Date());
  const [registeredUser, setRegisteredUser] = useState("no");
  const [cid, setCid] = useState("new");
  const [caddress, setCaddress] = useState("");
  const [customer, setCustomer] = useState([]); //This will be fetched and filtered from the database.
  
  const [customerSearchMode, setCustomerSearchMode] = useState(false);
  const [cname, setCname] = useState("");
  
  //#######################################################################
  //#######################################################################
  const [cphoneSearchMode, setCphoneSearchMode] = useState(false);
  const [cphone, setCphone] = useState("");
  //#######################################################################
  //#######################################################################
  const [cemailSearchMode, setCemailSearchMode] = useState(false);
  const [cemail, setCemail] = useState("");

  
  /////////////////////////////////////////////////////////////////////////
  // Lets check if the item is a Receipt or just a design
  //#######################################################################
  const [isreceipt, setIsreceipt] = useState(false);
  const [isinvoice, setIsInvoice] = useState(false);
  const [isquotation, setIsQuotation] = useState(false);

  //###########################################################################################################
  //  FORM FUNCTIONS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [formEdit, setFormEdit] = useState(false);
  
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  
  
  
  
  //###########################################################################################################
  //  Date times
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [datestamp, setDatestamp] = useState("");
  const [daystamp, setDaystamp] = useState("");
  const [monthstamp, setMonthstamp] = useState("");
  const [yearstamp, setYearstamp] = useState("");


  //////////////////////////////////////////////////////////
  // Image Memory for download
  ///////////////////////////////////////////////////////
  const [imageurl, setImageUrl] = useState("");
  const [ready, setReady] = useState(false);

  const Preload = useCallback(async function(){
    setDownloadStage(0);
    if(downloadable.current){
      setToRegenerate(false);
      setReady(false);
      let level=1;
      const interv = setInterval(function(){
        if(level <= 80){
          setDownloadStage(level+3);
        }
        level+=3;
      }, 1000);
      try{
        //console.log("Downloadable:", downloadable.current);
        await htmlToImage.toPng(downloadable.current).then(function (dataUrl){
          setTimeout(function(){
            setDownloadStage(86);
            setImageUrl(dataUrl);
            setDownloadStage(100);
            setReady(true);
            clearInterval(interv);
            return dataUrl;
          },250);
          console.log("finished")
        })
      }catch(e){
        console.error("Error generating PNG:", e);
        setReady(true);
        clearInterval(interv);
        return false
      }
    }else{
      const timeout = setTimeout(function(){
        Preload();
        clearTimeout(timeout);
      },250);
    }
  },[])

  async function generateImg (element,interv){
    const options = {
      method: 'GET',
      cacheBust: true,
      fetchRequestInit: {
        mode: 'cors', // Set the CORS mode
        credentials: 'include', // Include credentials (cookies) in the request
        crossOrigin: 'anonymous', // Set cross-origin attribute
      },
      headers: {
        'sec-fetch-site': 'same-site',
        'sec-fetch-dest': 'image',
        'Cache-Control': 'no-cache',
        'connection': 'keep-alive',
        'accept-encoding': 'gzip, deflate, br',
      },
    };


    await htmlToImageIOS.toPng(element,options).then(function(dataUrl){
      const timeout2 = setTimeout(function(){
        if(dataUrl.length >= 50000){
          setDownloadStage(86);
          setReady(true);
          clearInterval(interv);
          setImageUrl(dataUrl);
          setDownloadStage(100);
          clearTimeout(timeout2);
        }else{
          generateImg(element,interv);
        }
      },250);
    });
  }


  const SafariPreload = async function(){
    setDownloadStage(0);
    if(downloadable.current){
      setToRegenerate(false);
      setReady(false);
      let level=1;
      const interv = setInterval(function(){
        if(level <= 80){
          setDownloadStage(level+3);
        }
        level+=3;
      }, 1000);
      try{
        generateImg(downloadable.current,interv);
        return true
      }catch(e){
        setReady(true);
        clearInterval(interv);
        return false
      }
    }else{
      const timeout = setTimeout(function(){
        clearTimeout(timeout);
        SafariPreload();
      },2500);
    }
  }

  useEffect(function(){
    if(isIOS || isMac){
      SafariPreload();
    }else{
      Preload();
    }
  },[]);


  async function IosDownloadImage(){
    let level=1
    if(downloadable.current){
      const interv = setInterval(function(){
        if(level <= 80){
          setDownloadStage(level+5);
        }
        level+=5;
      }, 1000);
      try{
        if(imageurl !== ""){
          let ran =  randomNumberInRange(0,999);
          download(imageurl, 'The_Ceo'+ran+'.png');
          return "success";
        }else{
          SafariPreload.then(function(){
            IosDownloadImage();
          });
        }
      }catch(e){
        console.log(e);
      }finally{
        clearInterval(interv);
      }
    }
    else{
      IosDownloadImage();
    }
  }

  const handlePdfDownload = (imageUrl) => {
    const pdf = new jsPDF();
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imageUrl, 'PNG', 0, 0, imgWidth,imgHeight);
    pdf.save('sales.pdf');
  };

  const DownloadImage = async () => {
    setDownloadStage(1);
    let level=1
    const interv = setInterval(() => {
      if(level <= 80){
        setDownloadStage(level+5);
      }
      level+=5;
    }, 1000);
    try{
      if(imageurl !== ""){
        if(isExpandable(design[0])){
          handlePdfDownload(imageurl);
          return "success"
        }else{
          let ran =  randomNumberInRange(0,999);
          download(imageurl, 'The_Ceo'+ran+'.png');
          return "success"
        }
      }else{
        Preload.then(function(){
          DownloadImage();
        })
      }
    }catch(e){
      console.log(e)
    }finally{
      clearInterval(interv);
    }
  }


  //################################################################
  //////////////////////////////////////////////////////////////////
  const formRef = useRef();
  const designRef = useRef();
  const processScroll = (refs,action) => {
    if(action === 'done'){
      isIOS?SafariPreload():Preload();
    }
    refs.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(()=>{
    processInitial(userInfo.companyname);
  },[userInfo])

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///         THIS IS THE FUNCTION THAT WILL HELP RECALCULATE THE WIDTH AND HEIGHT OF THE ITEMS.
  ///         width and height is for the item to be regenerated   screenWidth is the current width of the screen.
  ///         type is  to check if its an item or the main div
  ///         return is to make choice what to return from the calculation. either 'width' or 'height'
  ///         generateNewDimention(600,600,500,600,'width')    // this will be a sample for div
  //#######################################################################################################
  function generateNewDimention(width, height, screenWidth, divWidth, type, ret){
    const htwRatio = height / width;   // HEIGHT TO WIDTH RATIO
    const itcRatio = width / divWidth; // ITEM TO CONTAINER RATION
    let newHeight = height;
    let newWidth = width;
    let newDivWidth = divWidth;
    if (screenWidth <= divWidth) {
      newDivWidth = screenWidth - 20
    } else {
      if (divWidth > 600) {
        newDivWidth = 400;
      } else {
        newDivWidth = divWidth - 200;
      }
    }

    if (type === "item") {
      newWidth = itcRatio * newDivWidth;
      newHeight = htwRatio * newWidth;
    } else {
      newWidth = newDivWidth;
      newHeight = htwRatio * newWidth;
    }
    if (ret === "width") {
      return newWidth;
    } else {
      return newHeight;
    }
  }

  function generateNewPosition(old_width, new_width, old_height, new_height, old_x, old_y, type){
    let new_x = 10;
    let new_y = 10;
    if (type === "x") {
      new_x = (old_x * new_width) / old_width;
      return new_x;
    }
    if (type === "y") {
      new_y = (old_y * new_height) / old_height;
      return new_y;
    }
  }
  //###########################################################################################################
  //  FORM FUNCTIONS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const processFormModal = async () => {
    handleOpenForm();
    setFormEdit(true);
  }

  const setFormItem = (index, value) => {
    setToRegenerate(true);
    setDesign((design) => {
      return design.map((item, itemIndex) => {
        if (itemIndex === 0) {
          return {
            ...item,
            components: item.components.map((component, componentIndex) => {
              if (componentIndex === index) {
                return { ...component, content: value };
              }
              return component;
            }),
          };
        }
        return item;
      });
    });    
    
    
  }
  const fetchtype = ()=>{
    let productnumber = addedProduct.length;
    let servicenumber = addedService.length;
    if(productnumber > 0 && servicenumber > 0){
      return "both";
    }else if (productnumber > 0){
      return "product";
    }else if (servicenumber > 0){
      return "service";
    }else{
      return "none";
    }
  }
  function setDefaultCustomers(){
    setCname("");
    setCid("new");
    setCaddress("");
    setCphone("");
    setCemail("");
    setCustomerSearchMode(false);
  }

  function startformdownload(){
    swal("Download will start Now.");
    handleCloseForm();
    preview();
    const ret = isIOS ? IosDownloadImage() : DownloadImage();
    ret.then((data)=>{
      setDownloadStage(100);
      setTimeout(() => {
        if (data === "success"){
          setDownloading(false);
          swal("successful");
        }else if (data === "out of memory"){
          setDownloading(false);
          swal("out of memory");
        }else{
          setDownloading(false);
        }
      }, 1000);
    });
    setDefaultProduct();
    setDefaultCustomers();
    setAddedProduct([]);
    setAddedService([]);
  }
  const sendToDatabase = async () => {
    const maindesign = design[0];
    const formattedDate = receiptdate.getFullYear() + "-" + (receiptdate.getMonth() + 1) + "-" + receiptdate.getDate();
    if(receipttype === "sales"){
      startformdownload();
    }else if (addedProduct.length > 0 && total >= 0 ) {
      if(registeredUser === "yes" && (cname === "" && cphone === "" && cemail === "" && caddress === "")){
        swal("Some needed data missing");
      }else{
        const datas = {
          "user_id": userInfo?.masked_id,
          "design": maindesign.id,
          "addedProduct": addedProduct,
          "addedService": addedService,
          "receipt_type": fetchtype(),
          "total": total,
          "advance": advance,
          "balance": balance,
          "date": formattedDate,
          "registereduser": registeredUser, // This will be used to record the sales without adding a new customer.
          "cid": cid,
          "cname": cname,
          "cemail": cemail,
          "cphone": cphone,
          "caddress": caddress,
          "amountinword": amountinword,
          "addedby": userInfo.agentfullname,
          "agentid": userInfo.agentid,
        }
        const resp = await api.post('receiptdata', datas );
        if (resp?.data.message === "Success") {
          startformdownload();
        } else {
          setDownloading(false);
          swal(resp?.data.message);
        }
      }
    } else {
      setDownloading(false);
      swal("Please fill in the needed information");
    }
  }


  //////////////////////////////////////////////////////////////////
  // GET THE DESIGNS
  //###############################################################



  const getDesign = async (id,idToD) => {
    if (idToD !== "") {
      const datas = JSON.stringify({
        id: idToD,
        u_id:id
      });
      try {
        const resp1 = await api.post('getuserdesign',
          datas,
        );
        setDatestamp(resp1?.data.datestamp.datestamp);
        setYearstamp(resp1?.data.datestamp.yearstamp);
        setMonthstamp(resp1?.data.datestamp.monthstamp);
        setDaystamp(resp1?.data.datestamp.daystamp);
        if (!formEdit) {
          setDesign(resp1?.data.design);
          setOldDesign(resp1?.data.design);
        }
      } catch (error) {
        let tod = localStorage.getItem('idToDownload');
        console.log(error)
      }
    } else {
      toast("The Design to Preview Not Set");
      navigate("/Dashboard/Designs");
    }
  }

  const populateAddedProduct = (element) => {
    //["id","receiptid","productid","productname","quantity","unitprice","unitcostprice","amount"]
    let id = addedProduct.length
    element.forEach((product) => {
      setAddedProduct((oldData) => [...oldData,
        {
          id: id,
          productId: product.productid,
          productname: product.productname,
          quantity: product.quantity,
          unitprice: product.unitprice,
          costprice: product.unitcostprice,
          amount: product.amount,
        },
      ]);
    })
    preview();
  }
  const populateAddedService = (element) => {
    //["id","receiptid","serviceid","servicename","initial_amount","final_amount","state"]
    let id = addedService.length
    element.forEach((service) => {
      setAddedService((oldData) => [...oldData,
        {
          id: id,
          serviceId: service.serviceid,
          servicename: service.servicename,
          quantity: parseFloat(service.final_amount/service.initial_amount).toFixed(2),
          initial_amount: service.initial_amount,
          final_amount: service.final_amount,
          state: service.state,
        },
      ]);
    })
    preview();
  }

  
  const checkReceiptType = async () =>{
    // this will check if it is a sales, then populate the page with its datas
   // ["id","user_id","design_id","cid","total","advance","balance","amountinword",
            //"formatteddate","date"],name,url,soldproducts
    if(receipttype === "sales" || receipttype === "newsales"){
      /// Reset the Added product and services
      setAddedProduct([]);
      setAddedService([]);
      // Set the sales data
      setTotal(salesdata?.total);
      setAdvance(salesdata?.advance);
      setBalance(salesdata?.balance);
      setAmountInWord(salesdata?.amountinword);
      setInvoiceNumber(salesdata?.invoicenumber);
      setRegisteredUser(salesdata?.registereduser);
      populateAddedProduct(salesdata?.soldproducts);
      populateAddedService(salesdata?.soldservices);
      // Set the customer details if exists
      for (let a = 0; a < customer.length; a++) {
        const element = customer[a];
        if (parseInt(element.id) === parseInt(salesdata.cid) ) {
          setCid(element?.id);
          setCname(element?.name);
          setCphone(element?.phone);
          setCaddress(element?.address);
          setCemail(element?.email);
        }else{
          if(!isEmpty(salesdata?.cname) && salesdata?.registereduser === "yes"){
            setCid(salesdata?.cid);
            setCname(salesdata?.cname);
            setCphone(salesdata?.cphone);
            setCaddress(salesdata?.caddress);
            setCemail(salesdata?.cemail);
          }
          if(registeredUser === "yes"){
            swal("please add a new customer or set as a one time customer");
          }
        }
      }
    }

  }

  /////////////////////////////////////////////////////////////////////////
  // Lets check if the has selectables in it
  //#######################################################################

  const Indesign = (des) => {
    let state = false;
    des?.components?.forEach(element => {
      if (element.content_type === "editable"||"selectableV"||"selectableH"||"selectableBg") {
        state = true;
      }
    });
    return state;
  }


  /////////////////////////////////////////////////////////////////////////
  // Lets check if the item is a Receipt or just a design
  //#######################################################################

  const isReceipt = (desig) => {
    
    desig.map((des) => {
      if(des.category === "1 Receipts"){
        setIsreceipt(true);
      }
      return(<></>);
    })
  }
  const isInvoice = (desig) => {
    desig.map((des) => {
      if(des.category === "2 Invoice"){
        setIsInvoice(true);
      }
      return(<></>);
    })
  }
  const isQuotation = (desig) => {
    desig.map((des) => {
      if(des.category === "3 Quotations"){
        setIsQuotation(true);
      }
      return(<></>);
    })
  }
  useEffect(() => {
    isReceipt(design);
    isInvoice(design);
    isQuotation(design);
    // Indesign(design);
  }, [design])


  /////////////////////////////////////////////////////////////////////////
  // Lets work on the Form
  //#######################################################################

  //###################################################################################
  // Get list of customers
  //###################################################################################
  async function getCustomers(id){
    const datas = JSON.stringify({
      u_id:id
    });
    try {
      const resp1 = await api.post('getcustomersforreceipt',datas);
      if (resp1.data.message === "success") {
        setCustomer(resp1?.data.customersdata);
      }
    } catch (error) {
      getCustomers(id);
    }
  }

  //###################################################################################
  // Searching the Customer name
  //###################################################################################
  const filteredCustomerList = customer?.filter(cList =>
    cList.name.match(new RegExp(cname, "i"))
  );

  const customerSearchSelectionHandler = (cname) => {
    // This will set the information of the customer into the Receipt
    customer.map((items) => {
      if (items.name === cname) {
        setCid(items.id);
        setCname(items.name);
        setCphone(items.phone);
        setCaddress(items.address);
        setCemail(items.email);
        setCustomerSearchMode(false);
      }
      return(<></>);
    })
  }
  const customerSearchFunction = async (value) => {
    setCustomerSearchMode(true);
    setCname(value);
  }
  /////////////////////////////////////////////////////////////////////////
  /// Products 
  /////////////////////////////////////////////////////////////////////////
  // AND 
  ///////////////////////////////////////////////////
  // Totals 
  /////////////////////////////////////////////////
  const getTotal = () => {
    let sum = 0;
    for (let i = 0; i < addedProduct.length; i++) {
      sum += parseFloat(addedProduct[i].amount)
    }
    for (let i = 0; i < addedService.length; i++) {
      sum += parseFloat(addedService[i].final_amount)
    }
    setTotal(sum);
    return sum;
  }

  const resolvePaid = (e) => {
    setFormEdit(true);
    getTotal();
    if (e >= total) {
      setPaid(total);
      setBalance(0);
      setAdvance(total);
    } else if (e < total) {
      setBalance(total - e);
      setPaid(e);
      setAdvance(e);
    } 
  }
  const recalculate = (forr, e) => {
    if (forr === "quantity") {
      setQuantity(e);
      setAmount(e * unitrate);
    } else if (forr === "unitprice") {
      setUnitrate(e);
      setAmount(quantity * e);
    }
  }


  const fetchbankdetails = async (id) => {
    try{
      const datas = {
        "method":"id",
        "user_id": id,
        "action":"fetchaccountdetails"
      }
      const resp1 = await api.post('fetchaccountdetails', datas);
      if(resp1?.data.message === "Success"){
        setAccountName(resp1?.data.details[0].accountname);
        setAccountNumber(resp1?.data.details[0].accountname);
        setBankName(resp1?.data.details[0].bankname);
        setTermsAndCondition(resp1?.data.termsandcondition);
        setProductCurrency(resp1?.data.details[0].productcurrency);
      }else{
        console.log("Error fetching Bank details")
      }
    }catch(error){
      fetchbankdetails(id);
    }
  }

  const updatebankdetails = async () => {
    if(changebankdetails){
      if(accountnumber !=="" && accountname !== "" && bankname !== ""){
        try{
          const datas = {
            "user_id": userInfo.masked_id,
            "action":"updateaccount",
            "accountname": accountname,
            "accountnumber": accountnumber,
            "bankname": bankname,
            "termsandcondition":termsandcondition
          }
          const resp1 = await api.post('updateaccountdetails', datas);
          if(resp1?.data.message === "Success"){
            swal("Updated Successfully")
            setAccountName(resp1?.data.details.accountname);
            setAccountNumber(resp1?.data.details.accountnumber);
            setBankName(resp1?.data.details.bankname);
            setTermsAndCondition(resp1?.data.details.termsandcondition);
          }else{
            updatebankdetails();
          }
        }catch(error){
          updatebankdetails();
        }
      }else{
        swal("Required Details not seen");
      }
    }
  }

  //////////////////////////////////////////////////////////////
  // To get all the products
  ////////////////////////////////////////////////////////////////
  
  const getAllProducts = async (id) => {
    const datas = JSON.stringify({
      u_id: id
    });
    try {
      const resp1 = await api.post('getallproductsforreceipt', datas );
      if (resp1.data.message === "success"){
        setAllproducts(resp1?.data.products);
        setReceiptNumber(resp1.data.last_receipt_number);
        setInvoiceNumber("SO_" + parseInt(resp1.data.last_receipt_number)+1);
      }
    } catch (error) {
      getAllProducts(id);
    }
  }

  const [allusersalesitems, setAllUserSalesItems] = useState("");
  const getSalesItems = async (id) => {
    const datas = { "type": "ALL", "u_id": id }
    const resp = await api.post('getallsalesqritems', datas);
    setAllUserSalesItems(resp.data.items);
  }


  const filteredProductList = allproducts.filter(cList =>
    cList.name.match(new RegExp(productname, "i"))
  );

  const setDefaultProduct = () => {
    setProductname("");
    setQuantity(0);
    setUnitrate(0);
    setUnitCostPrice(0);
    setUnitsellingprice(0);
    setAmount(0);
    setProductSearchMode(false);
    //setTotal(0);
    //setPaid(0);
    //setAdvance(0);
    //setBalance(0);
    setAmountInWord("");
  }


  const [justAdded, setJustAdded] = useState("");
  const countindesign = (content_type) => {
    if(isExpandable(design[0])){
      return 10000
    }else{
      let num = 0;
      design.map((des) => {
        des.components.forEach(element => {
          if (element.content_type === content_type){
            num += 1;
          }
        });
        return(<></>);
      });
      return parseInt(num);
    }
  }

  const ProcessScan = (itemsdata)=>{
    let count1 = 0;
    let count2 = 0;
    if(receipttype === "sales"){
      swal("Sorry you cannot add new items on an already generated transaction");
    }else{
      itemsdata.map((item ,index) =>{
        if(item.scantype === 'product'){
          let id = addedProduct.length;
          let num = id + count1;
          count1 += 1;
          setTotal(item.amount + getTotal());
          //add all the information about the Product I need for the                      
          setAddedProduct((oldData) => [...oldData,
            {
              id: num,
              productId: item.productId,
              productname: item.productname,
              quantity: item.quantity,
              unitprice: item.unitSellingPrice,
              costprice: item.unitCostPrice,
              amount: item.amount,
            },
          ]);
          setJustAdded(item.productname);
  
        }else if(item.scantype === 'service'){
          let id = addedService.length;
          let num = id + count2;
          count2 += 1;
          setAddedService((oldData) => [...oldData,
            {
              id: num,
              serviceId: item.serviceId,
              servicename: item.servicename,
              quantity: item.quantity,
              initial_amount: item.initialamount,
              final_amount: parseFloat(item.quantity * item.initialamount).toFixed(2),
              state: "incomplete",
            },
          ]);
        }
      })
    }
  }

  const isTagged = (data,tobecheck) =>{
    if(data !== null && data !== " "){
      let arr1 = data.split(" ");
      let arr = arr1.map(item => item.toUpperCase());
      if(arr.includes(tobecheck.toUpperCase())){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  function validateData(data) {
    return data !== null && data !== undefined && data !== "" && data !== " ";
  }
  const isExpandable = (des) =>{
    let ret = false;
    des?.components?.forEach(element => {
      if(validateData(element.description)){
        if (isTagged(element.description , "expandable")) { ret = true}
      }
    });
    return ret
  }
  const generateExpandibleheight = (width, height, screenWidth, divWidth, type, ret) =>{
    let header = generateNewDimention(width, height, screenWidth, divWidth, type, ret);
    const itemcount = addedProduct.length + addedService.length
    const heigh = 20 * parseInt(itemcount)
    return parseInt(header) + parseInt(itemcount) + heigh + 325;
  }

  const addProductToQueue = () => {
    setJustAdded("");
    // This will Add the product to the array of selected products
    // ["id","name","stock","unitsellingprice","unitcostprice","url"]
    let inlist = false;
    const count = countindesign("productname");
    const leng = addedProduct.length + addedService.length;
    if((leng >= count) && !isExpandable(design[0])){
      swal("Max Space for this Receipt Reached");
    }else{
      allproducts.map((items) => {
        if (items.name === productname) {
          inlist = true
          setTotal((quantity * unitrate) + getTotal());
          //add all the information about the Product I need for the
          let id = addedProduct.length
          setAddedProduct((oldData) => [...oldData,
          {
            id: id,
            productId: items.id,
            productname: productname,
            quantity: quantity,
            unitprice: unitrate,
            costprice: unitcostprice,
            amount: amount,
          },
          ]);
          setJustAdded(productname);
          setDefaultProduct();
        }
      })
      if (!inlist) {
        //add all the information about the Product I need for the
        if(productname !== "" || quantity !== 0 || unitrate !== 0 || unitcostprice !==0){
          setTotal((quantity * unitrate) + getTotal());
          let id = addedProduct.length
          setAddedProduct((oldData) => [...oldData,
          {
            id: id,
            productId: "new",
            productname: productname,
            quantity: quantity,
            unitprice: unitrate,
            costprice: unitcostprice,
            amount: amount,
          },
          ]);
          setDefaultProduct();
        }else{
          swal("Full Details needed.");
        }
      }
    }
  }

  const preview = () => {
    // This function will loop through the items in the design and fill in the data as needed.
    if ((addedProduct.length + addedService.length) < 1) {
      if(receipttype !=="sales" && receipttype !=="newsales"){
        swal("Sorry, No Product added");
      }
    } else {
      const count = countindesign("productname");
      const formattedDate = receiptdate.getFullYear() + "-" + (receiptdate.getMonth() + 1) + "-" + receiptdate.getDate();
      const maindesign = design[0];
      maindesign?.components?.forEach((element,index) => {
          
          let i = index; 
          let productlength = addedProduct.length 
          let servicelength = addedService.length
          for (let a = 0; a < count; a++) {
            if((productlength >= 1 ) && (a < productlength)){
              let b = a + 1;
              if (isTagged(element.description , "productname" + b)) { setFormItem(i, addedProduct[a].productname) }
              if (isTagged(element.description , "unitprice" + b)) { setFormItem(i, addedProduct[a].unitprice) }
              if (isTagged(element.description , "quantity" + b)) { setFormItem(i, addedProduct[a].quantity) }
              if (isTagged(element.description , "amount" + b)) { setFormItem(i, addedProduct[a].amount) }
            }
            if((servicelength > 0) && (a >= productlength ) && (a < productlength + servicelength)) {
              let b = a + 1;
              if (isTagged(element.description , "productname" + b)) { setFormItem(i, addedService[a].servicename) }
              if (isTagged(element.description , "unitprice" + b)) { setFormItem(i, addedService[a].initial_amount) }
              if (isTagged(element.description , "quantity" + b)) { setFormItem(i, addedService[a].quantity) }
              if (isTagged(element.description , "amount" + b)) { setFormItem(i, addedService[a].final_amount) }
            }
          }
          if (isTagged(element.description , "total")) { setFormItem(i, total) }
          if (isTagged(element.description , "advance")) { setFormItem(i, advance) }
          if (isTagged(element.description , "balance")) { setFormItem(i, balance) }
          if (isTagged(element.description , "date")) { setFormItem(i, formattedDate) }
          if (isTagged(element.description , "cname")) { setFormItem(i, cname) }
          if (isTagged(element.description , "cemail")) { setFormItem(i, cemail) }
          if (isTagged(element.description , "cphone")) { setFormItem(i, cphone) }
          if (isTagged(element.description , "caddress")) { setFormItem(i, caddress) }
          if (isTagged(element.description , "amountinword1")) { setFormItem(i, amountinword) }
          // For invoice
          if (isTagged(element.description , "subtotal")) { setFormItem(i, total) }
          if (isTagged(element.description , "discount")) { setFormItem(i, advance) }
          if (isTagged(element.description , "total") && isinvoice) { setFormItem(i, balance) }
          if (isTagged(element.description , "accountnumber")) { setFormItem(i, accountnumber) }
          if (isTagged(element.description , "accountname")) { setFormItem(i, accountname) }
          if (isTagged(element.description , "bankname")) { setFormItem(i, bankname) }
          if (isTagged(element.description , "termsandcondition")) { setFormItem(i, termsandcondition) }
          if (isTagged(element.description , "invoicenumber")) { setFormItem(i, invoicenumber) }
          if (isTagged(element.description , "receiptnumber")) { setFormItem(i, invoicenumber) }
          if (isTagged(element.description , "currencytype")) { setFormItem(i, productcurrency) }
      });

    }
  }

  const onlyPreview = () => {
    setToRegenerate(true);
    setFormEdit(true);
    handleCloseForm();
    preview();
    //To regenerate the Image;
    isIOS ?SafariPreload():Preload();
  }

  const regularDownload = async () => {
    setDownloading(true);
    setDownloadStage(0);
    try{
      const datas = {
        "user_id": userInfo.masked_id,
        "action":"download"
      }
      const resp1 = await api.post('checkdownloadtimes', datas );
      if (resp1.data.message === "success") {
        if(resp1?.data.action === "complete"){
          swal("You have completed your allowed maximum download times.");
        }else if (resp1?.data.action === "onlyreceipt"){
          if(isreceipt || isinvoice){
            const ret = isIOS ? IosDownloadImage() : DownloadImage();
            //const ret = IosDownloadImage();//: DownloadImage();
            ret.then((data)=>{
              setDownloadStage(100);
              setTimeout(() => {
                if (data === "success"){
                  setDownloading(false);
                  swal("successful");
                }else if (data === "out of memory"){
                  setDownloading(false);
                  swal("out of memory");
                }else{
                  setDownloading(false);
                }
              }, 1000);
            });
          }else{
            setDownloading(false);
            swal("Number of downloads exceeded");
          }
          setOnlyReceipt(true);
        }else if (resp1?.data.action === "error"){
          setDownloading(false);
          swal("Please try again");
        }else{
          const ret = isIOS ? IosDownloadImage() : DownloadImage();
          //const ret = IosDownloadImage(); //: DownloadImage();
          ret.then((data)=>{
            setDownloadStage(100);
            setTimeout(() => {
              if (data === "success"){
                setDownloading(false);
                swal("successful");
              }else if (data === "out of memory"){
                setDownloading(false);
                swal("out of memory");
              }else{
                setDownloading(false);
              }
            }, 1000);
          });
        }
      }
    }catch(error){
      setDownloading(false);
    }
  }

  const RecordanddownloadImage = async () => {
    setDownloading(true);
    setDownloadStage(0);

    if(toRegenerate){
      await (isIOS?SafariPreload():Preload());
    }
    if(isreceipt){ 
      const d = await swal({
        title: "Confirm Record ",
        text: "The Receipt data will be stored for your business history",
        icon: "success",
        closeOnClickOutside: false,
        buttons: [true, "Record and Download"],
        dangerMode: false,
      });
      if (d) {
        sendToDatabase();
      }else{
        setDownloading(false);
      }
    }else{
      regularDownload();
    }
    
  }

  //////////////////////////////////////////////////////////////
  /// Category Images
  /////////////////////////////////////////////////////////////
  const fetchcategoryimages =async (id) => {
    const datas = JSON.stringify({
      "user_id":id,
      "limit":1000,
    });
    try {
      const resp1 = await api.post('usergetbcategimages',  datas );
      if (resp1?.data.message === "success") {
        setVerticalimg(resp1?.data.verticalimg);
        setHorizontalimg(resp1?.data.horizontalimg);
        setBackgimg(resp1?.data.backgimg);
      }
    } catch (error) {
      fetchcategoryimages(id);
    }
  }

  const setFormOnePicItem = (index, value) => {
    setToRegenerate(true);

    setDesign((design) => {
      return design.map((item, itemIndex) => {
        if (itemIndex === 0) {
          return {
            ...item,
            components: item.components.map((component, componentIndex) => {
              if (componentIndex === index) {
                return { ...component, content_max_char: value };
              }
              return component;
            }),
          };
        }
        return item;
      });
    });  
  }
  


  const productSearchSelectionHandler = (prodname) => {
    let inlist = false;
    allproducts.map((items) => {
      if (items.name === prodname) {
        inlist = true;
        setProductname(items.name);
        setStock(items.stock);
        setUnitCostPrice(items.unitcostprice);
        setUrl(items.url);
        setUnitrate(items.unitcostprice);
        setUnitsellingprice(items.unitsellingprice);
        setProductSearchMode(false);
      }
      return(<></>);
    })
    if (!inlist) {
      // This Product is not in the List
      swal("This product is not in the list");
    }
  }

  const productSearchFunction = (value) => {
    setProductSearchMode(true);
    setProductname(value);
    for (let a = 0; a < allproducts.length; a++) {
      const element = allproducts[a];
      if (element[1] === productname) {
        setNameInList(true);
        break
      }
    }
  }


  useEffect(() => {
    setAmount(quantity * unitrate);
  }, [quantity, unitrate])

  useEffect(()=>{
    checkReceiptType();
  },[customer,receipttype,salesdata,allproducts]);
  useEffect(() => {
      let tod = localStorage.getItem('idToDownload');
      getDesign(userInfo?.masked_id,tod);
  }, []);
  useEffect(() => {
      fetchcategoryimages(userInfo?.masked_id)
      getCustomers(userInfo?.masked_id);
      getAllProducts(userInfo?.masked_id);
      fetchbankdetails(userInfo?.masked_id);
      getSalesItems(userInfo?.masked_id);
  }, []);


  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">Designs</span>
      </header>
      <section className="p-6 flex flex-col gap-4 mb-[70px]">
        <article className="md:hidden">
          <SearchInput />
        </article>
        <article className="flex gap-4">
          <div className="w-full md:w-[70%] flex flex-col gap-4">
            <div className="flex md:px-6 py-2 items-center gap-4">
                <Link to='/dashboard/designs'>
                <FaAngleLeft />
                </Link>
              <h1>Book Poster Template</h1>
            </div>
            {/* <div className="flex-col gap-x-10 flex md:flex-row bg-blue-300"> */}
            <div className="py-5 md:px-6">
                <div className="flex flex-col md:gap-y-0 gap-y-4">
                    {/* <div className="h-full max-h-[300px] md:max-h-[750px] w-full "> */}
                    <div className="h-full w-full flex justify-center relative">
                    <div className="h-full w-full flex justify-center justify-self-center" ref={designParentContainerRef}>
                        <DesignSingleObject 
                          des={design[0]}
                          userData={userInfo}
                          addedProduct={addedProduct} addedService={addedService} 
                          balance={balance} paid={advance} total={total} NumericFormat={NumericFormat} 
                          designParentContainerWidth={designParentContainerWidth}
                          generateNewDimention={generateNewDimention} windowSize={windowSize} 
                          generateExpandibleheight={generateExpandibleheight} isExpandable={isExpandable} 
                          downloadable={downloadable} generateNewPosition={generateNewPosition}
                          currency={productcurrency} formEdit={formEdit} setFormEdit={setFormEdit} recalculate={recalculate} 
                          setFormItem={setFormItem} setFormOnePicItem={setFormOnePicItem} datestamp={datestamp} 
                          daystamp={daystamp} monthstamp={monthstamp} yearstamp={yearstamp}
                        /> 
                    </div>
                    <div key="b1" className="flex justify-end absolute z-[10] bg-transparent bottom-[10px] right-[10px]"
                      // style={{
                      //   margin:0,
                      //   top:'auto',
                      //   right:20,
                      //   bottom:60,
                      //   left:"auto",
                      //   position:"fixed" }}
                    >
                      <div key="c" className='flex w-full bg-transparent justify-center'>
                        {(receipttype === "new" || receipttype === "newsales") &&[<button style={{ width: "96px" }} 
                          className='rounded-[45px] border-[1.5px] border-white px-[24px] py-[14.25px] cursor-pointer   
                          hover:bg-gray-500 font-bold bg-[#000000] opacity-40 text-white' 
                          onClick={() => { processScroll(formRef,"edit"); handleClose(); processFormModal(); }} >Edit</button>]}
                      </div>
                      {(isreceipt || isinvoice || isquotation) && [
                        <>
                          <div key="a" className='flex flex-row w-full justify-center opacity-90'>
                            <button 
                              className='rounded-[45px] border-[1.5px] border-white px-[24px] py-[14.25px] cursor-pointer   
                              hover:bg-gray-500 font-bold bg-[#000000] opacity-40 text-white' 
                              onClick={() => { onlyPreview(); processScroll(designRef,"done"); }} 
                            >Preview</button>
                          </div>
                          {/* <div key="b" className="flex flex-row justify-center opacity-100">
                            <ScanProduct ProcessScan={ProcessScan} allusersalesitems={allusersalesitems} count = {countindesign("productname")} leng = {addedProduct.length + addedService.length} />
                          </div> */}
                        </>
                      ]}
                    </div>
                    </div>
                    
                    {!(onlyreceipt && (design[0].category !== "1 Receipts" || design[0].category !== "2 Invoices" || design[0].category !== "3 Quotation")) &&[
                      <div key="c" className='flex flex-col justify-center items-center pt-4 bg-transparent w-full'>
                        {
                          (isIOS && isSafari && hasSafariFeatures) &&[
                            <div className="flex flex-row w-11/12 bg-transparent justify-center items-center text-red-400 text-sm">
                              For better experience with download, we would suggest you make use of other browsers like Chrome or Brave.
                            </div>
                          ]
                        }
                        <div key="a" className='flex flex-row w-full bg-transparent justify-center'>
                            {downloading ?[
                              <Loadingbutton key="a" color="red" percentage={downloadstage} />
                            ]:[
                              // toRegenerate ? [
                              //   <button key="b" className='rounded-xl text-sm pr-4 pl-4 p-2 mb-1 cursor-pointer   hover:bg-red-600 font-extrabold bg-black opacity-100 text-white' onClick={(e) => { isIOS?SafariPreload():Preload(); }} >Process Changes</button>
                              // ]:[
                                <div key="c" className='flex flex-1 w-full items-center justify-between mt-2'>
                                  <div className="flex gap-4">
                                    <PrintImage key="a" RecordanddownloadImage={RecordanddownloadImage} imageUrl={imageurl && imageurl} ready={ready} title={userInfo?.companyname}/>
                                    <ShareButtons key="b" RecordanddownloadImage={RecordanddownloadImage} imageUrl={imageurl && imageurl} ready={ready}/>
                                  </div>
                                  
                                  <button key="c3" 
                                    className="flex gap-1 md:gap-4 items-center bg-gradient-to-r from-red-700 to-red-600 text-white 
                                      rounded-[60px]  px-[23.7px] md:px-[32px] py-[14.07px] md:py-[19px] font-bold text-[12px] md:text-[17px]"
                                    onClick={(e) => { RecordanddownloadImage(e); }}
                                  >
                                    {(ready)?[ <>Download <Icon icon="octicon:download-24" width="22" height="22" 
                                    /> </>]:[<><Isloading />{(downloadstage >= 82)?"Finalyzing...":downloadstage}</>]}
                                  </button>
                                </div>
                              //]
                            ]}
                        </div>
                      </div>
                    ]}
                    {
                        (Indesign(design[0])) ? [
                        <CategoryImageSelect key="a" des={design[0]} backgimg={backgimg} horizontalimg={horizontalimg} verticalimg={verticalimg}
                          setFormItem={setFormItem} setFormOnePicItem={setFormOnePicItem} setFormEdit={setFormEdit}/>
                      ]: [ ]
                    }
                    <Stack key="a" ref={formRef} className="flex flex-col w-full justify-start items-center overflow-y-scroll scrollbar-hide pb-[48px]">
                      {
                        ( isreceipt ) ? [

                          <ReceiptForm
                            addProductToQueue={addProductToQueue} getTotal={getTotal} resolvePaid={resolvePaid} 
                            justAdded={justAdded} cemail={cemail} setCemail={setCemail}
                            cemailSearchMode={cemailSearchMode} setCemailSearchMode={setCemailSearchMode} 
                            cphone={cphone} setCphone={setCphone} cphoneSearchMode={cphoneSearchMode} setCphoneSearchMode={setCphoneSearchMode}
                            cname={cname} setCname={setCname} customerSearchMode={customerSearchMode} 
                            setCustomerSearchMode={setCustomerSearchMode} customer={customer} caddress={caddress} 
                            setCaddress={setCaddress} setCid={setCid} registeredUser={registeredUser} 
                            setRegisteredUser={setRegisteredUser} receiptdate={receiptdate} setReceiptDate={setReceiptDate} 
                            amountinword={amountinword} setAmountInWord={setAmountInWord}
                            addedService={addedService} setAddedService={setAddedService} addedProduct={addedProduct} 
                            setAddedProduct={setAddedProduct} allproducts={allproducts} productSearchMode={productSearchMode} 
                            setProductSearchMode={setProductSearchMode} amount={amount} setAmount={setAmount} unitrate={unitrate} 
                            setUnitrate={setUnitrate} quantity={quantity} setQuantity={setQuantity} productname={productname} 
                            setProductname={setProductname} paid={paid} balance={balance} total={total} setTotal={setTotal}
                            nameinlist={nameinlist} setNameInList={setNameInList} unitcostprice={unitcostprice} 
                            setUnitCostPrice={setUnitCostPrice} unitsellingprice={unitsellingprice} 
                            setUnitsellingprice={setUnitsellingprice} stock={stock} setStock={setStock} setUrl={setUrl}
                            userData={userInfo} termsandcondition={termsandcondition}  setTermsAndCondition={setTermsAndCondition}
                            productcurrency = {productcurrency} setProductCurrency = {setProductCurrency} invoicenumber={invoicenumber}
                            setInvoiceNumber={setInvoiceNumber} 

                          />


                        ]:(isinvoice || isquotation)?[
                          <Invoice setReceiptDate={setReceiptDate} receiptdate ={receiptdate} customerSearchFunction = {customerSearchFunction}
                            cname={cname}  customerSearchMode={customerSearchMode} setCustomerSearchMode={setCustomerSearchMode}
                            filteredCustomerList={filteredCustomerList} customerSearchSelectionHandler={customerSearchSelectionHandler}
                            cphone={cphone} setCphone={setCphone} caddress={caddress} setCaddress={setCaddress} cemail={cemail} setCemail={setCemail}
                            productSearchMode={productSearchMode} setProductSearchMode={setProductSearchMode} productname={productname}
                            productSearchFunction={productSearchFunction} productSearchSelectionHandler={productSearchSelectionHandler}
                            filteredProductList={filteredProductList} setQuantity={setQuantity} quantity={quantity} setUnitrate={setUnitrate}
                            unitrate={unitrate} justAdded={justAdded} amount={amount} setUnitCostPrice={setUnitCostPrice} unitcostprice={unitcostprice}
                            paid={paid} resolvePaid={resolvePaid} addProductToQueue={addProductToQueue}
                            unitsellingprice={unitsellingprice} nameinlist={nameinlist} total={total} balance={balance} setAmountInWord={setAmountInWord}
                            amountinword={amountinword} addedProduct={addedProduct} addedService={addedService} 
                            updatebankdetails={updatebankdetails} setChangebankdetails={setChangebankdetails} accountname={accountname}
                            accountnumber={accountnumber} bankname={bankname} termsandcondition={termsandcondition} setAccountName={setAccountName}
                            setAccountNumber={setAccountNumber} setBankName={setBankName} setTermsAndCondition={setTermsAndCondition} invoicenumber={invoicenumber}
                            setInvoiceNumber={setInvoiceNumber} productcurrency = {productcurrency} setProductCurrency = {setProductCurrency}
                            setAddedService={setAddedService} setAddedProduct={setAddedProduct}
                          />

                        ]:(Indesign(design[0])) ? [
                          <Ordinary  handleCloseForm={handleCloseForm} des={design[0]} processScroll={processScroll} designRef={designRef}
                              setFormItem={setFormItem} setFormEdit={setFormEdit} setFormOnePicItem={setFormOnePicItem} handleClose={handleClose}
                              formEdit={formEdit} />
                        ]: [
                          <>
                            <div className='flex flex-row justify-center text-extrabold text-blue-700 font-Montserrat-ExtraBold'>
                              Form Not Available For this Design.
                            </div>
                          </>
                        ]
                      }
                    </Stack>

                    
                </div>
            </div>
          </div>
          <div className="hidden md:w-[30%] md:flex flex-col gap-4">
            similar designs
          </div>
        </article>
      </section>
    </div>
  );
};

export default DesignTemplate;