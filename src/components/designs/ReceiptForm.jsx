/* eslint-disable react/no-unescaped-entities */
import React, {useEffect } from 'react'
//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SelectButton2, ProductCard, ScanSoldProducts, SearchInput} from "../designs";
import { FaAngleDoubleUp, FaAngleDoubleDown, FaRegWindowClose, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import { Stack} from "@mui/material";
import toast from 'react-hot-toast';
import { Icon } from '@iconify-icon/react';
import { CiCircleQuestion } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { TfiAngleUp } from "react-icons/tfi";


const ReceiptForm = (props) => {
    const { addProductToQueue, getTotal, resolvePaid, justAdded, cemail, setCemail,
        cemailSearchMode, setCemailSearchMode, cphone, setCphone, cphoneSearchMode, setCphoneSearchMode,
        cname, setCname, customerSearchMode, setCustomerSearchMode, customer, caddress, setCaddress, 
        setCid, registeredUser, setRegisteredUser, receiptdate, setReceiptDate, amountinword, setAmountInWord,
        addedService, setAddedService, addedProduct, setAddedProduct, allproducts, productSearchMode, setProductSearchMode,
        amount, setAmount, unitrate, setUnitrate, quantity, setQuantity, productname, setProductname, paid, balance, total, setTotal,
        nameinlist, setNameInList, unitcostprice, setUnitCostPrice, unitsellingprice, setUnitsellingprice, stock, setStock,
        setUrl, userData, termsandcondition, setTermsAndCondition, productcurrency, setProductCurrency,
        invoicenumber, setInvoiceNumber
    } = props;

    const toggleRegisteredUser = async () =>{
        if(registeredUser === "no"){
            setRegisteredUser("yes");
          }else{
            setRegisteredUser("no");
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
    //###################################################################################
    // Searching the Customer Phone
    //###################################################################################
    const filteredCustomerPhoneList = customer?.filter(cList =>
        cList.phone.match(new RegExp(cphone, "i"))
    );
    const customerPhoneSearchSelectionHandler = (cphone) => {
        // This will set the information of the customer into the Receipt
        customer.map((items) => {
        if (items.phone === cphone) {
            setCid(items.id);
            setCname(items.name);
            setCphone(items.phone);
            setCaddress(items.address);
            setCemail(items.email);
            setCphoneSearchMode(false);
        }
        return(<></>);
        })
    }
    const customerPhoneSearchFunction = async (value) => {
        setCphoneSearchMode(true);
        setCphone(value);
    }

    //###################################################################################
    // Searching the Customer Email
    //###################################################################################
    const filteredCustomerEmailList = customer?.filter(cList =>
        cList.email.match(new RegExp(cemail, "i"))
    );
    const customerEmailSearchSelectionHandler = (cemail) => {
        // This will set the information of the customer into the Receipt
        customer.map((items) => {
        if (items.email === cemail) {
            setCid(items.id);
            setCname(items.name);
            setCphone(items.phone);
            setCaddress(items.address);
            setCemail(items.email);
            setCemailSearchMode(false);
        }
        return(<></>);
        })
    }
    const customerEmailSearchFunction = async (value) => {
        setCemailSearchMode(true);
        setCemail(value);
    }


    const enforceNumber = (e,callback) => {
        // Remove non-numeric characters using regular expression
        const newValue = e.replace(/\D/g, '');
        callback(newValue);
    };
    const removeProduct = (e) => {
        setAddedProduct(addedProduct.filter(item => item.id !== e));
        getTotal();
        setTotal(getTotal());
        resolvePaid(paid);
    }
    const removeService = (e) => {
        setAddedService(addedService.filter(item => item.id !== e));
        getTotal();
        setTotal(getTotal());
        resolvePaid(paid);
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
    const filteredProductList = allproducts.filter(cList =>
        cList.name.match(new RegExp(productname, "i"))
    ); 
    const productSearchSelectionHandler = (prodname) => {
        // This will Add the product to the array of selected products
        // ["id","name","stock","unitsellingprice","unitcostprice","url"]
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
          toast("This product is not in the list");
        }
    }   

    
    useEffect(() => {
        setAmount(quantity * unitrate);
    }, [quantity, unitrate])

    return (
        <div className="flex gap-5 mt-5 flex-col md:flex-row w-full">
          <div className="flex-1 md:px-6 text-gray-500 md:h-full overflow-auto text-xs">
        {/* // <div className='flex flex-col relative w-11/12 space-y-2 '> */}
            <ScanSoldProducts key="aes" userData={userData}/>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                    Date
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <DatePicker selected={receiptdate} format='Pp' onChange={(date) => { setReceiptDate(date); }}
                    className="w-full border-none p-2 border-[0] hover:border-none focus:outline-none"
                    style={{ border: "none", width: "100%"}} />
                  {/* <TfiAngleDown size={15} /> */}
                </div>
              </div>
            </div>
            {/* <fieldset key="a" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Date</legend>
                <DatePicker selected={receiptdate} format='Pp' onChange={(date) => { setReceiptDate(date); }}
                    className="w-full border-none p-2 border-[0] hover:border-none focus:outline-none"
                    style={{ border: "none", width: "100%"}} />
            </fieldset> */}
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20" />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Receipt Number
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <input type="text" className='flex-1 py-2 pl-4 outline-none w-full bg-transparent h-[45px] font-extrabold text-black focus:outline-none'
                    name="Receipt Number"
                    placeholder="Receipt Number"
                    id="Receipt Number"
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    value={invoicenumber}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="g" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Receipt Number</legend>
                <input type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    name="Receipt Number"
                    placeholder="Receipt Number"
                    id="Receipt Number"
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    value={invoicenumber}
                />
            </fieldset> */}
            <div className='flex flex-row justify-center items-center text-[10px]'>
                <h1 key="b" className='flex flex-row justify-start pl-2 text-[12px]'>One Time User </h1>:  &nbsp;&nbsp;
                <div className='inline-block' onClick={() => { toggleRegisteredUser();}}>
                    {registeredUser === "no"?<FaToggleOn style={{color:"red", fontSize: "25px"}} /> : <FaToggleOff style={{color:"blue",fontSize: "25px"}} /> }
                </div>
            </div>
            
            {(registeredUser === "yes") && [<>
                <SearchInput itemvalue={cname} itemSearchFunction={customerSearchFunction} itemSearchMode={customerSearchMode} 
                setItemSearchMode={setCustomerSearchMode} filteredItemList={filteredCustomerList} objectfocus = "name"
                itemSearchSelectionHandler={customerSearchSelectionHandler} placeholder="Customer's Name" label="Customer's Name" />

                <SearchInput itemvalue={cphone} itemSearchFunction={customerPhoneSearchFunction} itemSearchMode={cphoneSearchMode} 
                setItemSearchMode={setCphoneSearchMode} filteredItemList={filteredCustomerPhoneList} objectfocus = "phone"
                itemSearchSelectionHandler={customerPhoneSearchSelectionHandler} placeholder="Customer's Phone" label="Customer's Phone" />

                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                        <Icon icon="iconoir:coins" width="20" height="20"
                        
                    />
                        </div>
                        <div className="flex gap-2">
                        <span className="text-center">
                        Customer's Address
                        </span>
                        <CiCircleQuestion className="text-top" size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                        <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] 
                          font-extrabold text-black focus:outline-none pl-3'
                            name="caddress"
                            placeholder="Customer's Address *"
                            id="caddress"
                            required
                            onChange={(e) => setCaddress(e.target.value)}
                            value={caddress}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="f" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Customer's Address</legend>
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    name="caddress"
                    placeholder="Customer's Address *"
                    id="caddress"
                    required
                    onChange={(e) => setCaddress(e.target.value)}
                    value={caddress}
                />
                </fieldset> */}
                <SearchInput itemvalue={cemail} itemSearchFunction={customerEmailSearchFunction} itemSearchMode={cemailSearchMode} 
                setItemSearchMode={setCemailSearchMode} filteredItemList={filteredCustomerEmailList} objectfocus = "email"
                itemSearchSelectionHandler={customerEmailSearchSelectionHandler} placeholder="Customer's email" label="Customer's email" />
            </>]}

            <h1 key="h" className='flex flex-row justify-start pl-2 font-bold'>Product Information</h1>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Add Good/ Service
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                style={{ width: "95%" }}
                name="product"
                placeholder="Add Good/ Service "
                id="product"
                required
                onChange={(e) => { productSearchFunction(e.target.value) }}
                value={productname}
                />
                <i key="c" onClick={() => { setProductSearchMode(!productSearchMode) }}
                style={{ width: "5%" }}
                className='text-gray-500 pr-2 pl-1 cursor-pointer justify-center '>
                {productSearchMode ? <TfiAngleUp /> : <TfiAngleDown />}
                </i>
                </div>
              </div>
            </div>
            {/* <fieldset key="i" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Add Good/ Service</legend>
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="product"
                placeholder="Add Good/ Service "
                id="product"
                required
                onChange={(e) => { productSearchFunction(e.target.value) }}
                value={productname}
                />
                <i key="c" onClick={() => { setProductSearchMode(!productSearchMode) }}
                style={{ width: "5%" }}
                className='text-blue-400 pr-2 pl-1 text-small cursor-pointer
                                                hover:bg-blue-400 hover:text-blue-900 rounded-full flex flex-col justify-center '>
                {productSearchMode ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                </i>
            </fieldset> */}
            {(productSearchMode ) && [
                <div key="j" className='searchOutput w-full relative'>
                {/* <div className="flex flex-col border  border-[#762323] bg-[#762323]  w-full justify-center max-h-60 overflow-scroll scrollbar-hide absolute"> */}
                <div className="flex flex-col border min-w-[60%] z-10 absolute top-[-23px] md:top-[-42px] bg-white md:mr-10 ml-[60px] md:ml-16 justify-center max-h-60 overflow-scroll scrollbar-hide">
                <Stack key="b" className="flex flex-col  w-full justify-start max-h-48 mt-3 mb-2 pt-3 px-2 md:px-4 pb-1 overflow-scroll scrollbar-hide">
                    
                    {filteredProductList.map((items, index) => {
                        // ["id","name","stock","unitsellingprice","url"]
                        return (
                        <SelectButton2 key={index} Style="color" type={"button"} FunctionToExecute={productSearchSelectionHandler} >
                            {items.name}
                        </SelectButton2>
                        );
                    })}
                    </Stack>
                    {/* <span key="a" className='flex flex-row justify-center cursor-pointer pt-2 pb-2 rounded-lg hover:bg-red-700 w-full bg-red-900 text-white font-Inter-Regular text-sm font-extrabold'
                    onClick={() => { setProductSearchMode(false) }}>Close</span> */}
                </div>
                </div>
            ]}

            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Quantity ({stock ? stock : ""})
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="quantity"
                placeholder="quantity"
                id="quantity"
                required
                //onChange={(e) => { setQuantity(e.target.value) }}
                onChange={(e) => { enforceNumber(e.target.value,setQuantity);}}
                value={quantity}
                />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Rate per Good/ Service
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="unitrate"
                placeholder={unitsellingprice ? unitsellingprice : "Rate Per Good/ Service"}
                id="unitrate"
                required
                //onChange={(e) => { setUnitrate(e.target.value) }}
                onChange={(e) => { enforceNumber(e.target.value,setUnitrate);}}
                value={unitrate}
                />
                </div>
              </div>
            </div>
            {! nameinlist && [
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Cost Price per Good/ Service
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    name="unitrate"
                    placeholder={unitcostprice ? unitcostprice : "Cost Rate Per Good/ Service"}
                    id="unitcost"
                    required
                    onChange={(e) => { enforceNumber(e.target.value,setUnitCostPrice);}}
                    value={unitcostprice}
                />
                </div>
              </div>
            </div>
            ]}
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Amount
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="Amount"
                placeholder="Rate per Good/ Service"
                id="amount"
                disabled
                //onChange={(e) => { setAmount(unitrate * quantity) }}
                value={amount}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="k" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Quantity ({stock ? stock : ""})</legend>
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="quantity"
                placeholder="quantity"
                id="quantity"
                required
                //onChange={(e) => { setQuantity(e.target.value) }}
                onChange={(e) => { enforceNumber(e.target.value,setQuantity);}}
                value={quantity}
                />
            </fieldset> */}
            {/* <fieldset key="l" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Rate per Good/ Service</legend>
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="unitrate"
                placeholder={unitsellingprice ? unitsellingprice : "Rate Per Good/ Service"}
                id="unitrate"
                required
                //onChange={(e) => { setUnitrate(e.target.value) }}
                onChange={(e) => { enforceNumber(e.target.value,setUnitrate);}}
                value={unitrate}
                />
            </fieldset> */}
            {/* {! nameinlist && [
                <fieldset key="l1" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Cost Price per Good/ Service</legend>
                <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    name="unitrate"
                    placeholder={unitcostprice ? unitcostprice : "Cost Rate Per Good/ Service"}
                    id="unitcost"
                    required
                    onChange={(e) => { enforceNumber(e.target.value,setUnitCostPrice);}}
                    value={unitcostprice}
                />
                </fieldset>
            ]} */}
            {/* <fieldset key="m" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Amount</legend>
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="Amount"
                placeholder="Rate per Good/ Service"
                id="amount"
                disabled
                //onChange={(e) => { setAmount(unitrate * quantity) }}
                value={amount}
                />
            </fieldset> */}

            <div className="flex flex-col px-1 mb-6">
                <button
                    className="flex gap-4 rounded-full ml-auto mb-4 p-4 text-center text-white 
                    bg-gradient-to-r from-red-700 to-red-600 items-center justify-center
                    w-full shadow-lg hover:scale-105 transition-transform"
                    onClick={() => addProductToQueue()}
                >
                    <FiPlus /> <span className="">Add To List</span>
                </button>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 py-2 border-gray-400 border rounded outline-none">
                    {(justAdded !== "") && [<div className='text-green-600'>
                    {justAdded} added
                    </div>]}
                </div>
              </div>
            </div>
            {/* <fieldset key="n" className='border w-full flex flex-col mb-1 pr-4 mt-2'>
                <label htmlFor="submit" className='flex rounded-r-lg text-black-400 font-extrabold w-full p-2 '>
                <input onClick={() => addProductToQueue()} className='bg-red-500 rounded-lg p-2 mt-3 text-white font-extrabold text-lg cursor-pointer w-11/12 hover:bg-red-600' type="submit" value="Add To List" />
                </label>
                {(justAdded !== "") && [<div className='text-[#ff0000]'>
                {justAdded} added
                </div>]}
            </fieldset> */}
            <h1 key="o" className='flex flex-row justify-start pl-2 font-bold'>Payments</h1>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Amount Paid By Customer
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="paid"
                placeholder="Amount Paid By Customer"
                id="paid"
                required
                onChange={(e) => { enforceNumber(e.target.value,resolvePaid); }}
                value={paid}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="p" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Amount Paid By Customer</legend>
                <NumericFormat key="b"
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="paid"
                placeholder="Amount Paid By Customer"
                id="paid"
                required
                onChange={(e) => { enforceNumber(e.target.value,resolvePaid); }}
                value={paid}
                />
            </fieldset> */}
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div key="a" className="flex gap-2">
                  <span className="text-center">
                  Total
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    id="total"
                    disabled
                    value={total}
                    />
                </div>
              </div>
            </div>
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div key="b" className="flex gap-2">
                  <span className="text-center">
                  Balance
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    id="total"
                    disabled
                    value={balance}
                    />
                </div>
              </div>
            </div>
            {/* <fieldset key="q" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-col w-full justify-center items-center'>
                <div key="a" className=' flex flex-row justify-center text-[#ff0000] w-full p-2'>
                <div key="a" className='flex flex-row justify-center w-1/2'>Total </div>
                <div key="b" className='flex flex-row justify-center w-1/2'>Balance </div>
                </div>
                <div key="b" className=' flex flex-row justify-center text-[#ff0000] w-full p-2'>
                <div key="a" className='flex flex-row justify-start w-1/2 font-extrabold'>
                    <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-full bg-transparent font-extrabold focus:outline-none '
                    id="total"
                    disabled
                    value={total}
                    />
                </div>
                <div key="b" className='flex flex-row justify-end w-1/2 font-extrabold'>
                    <NumericFormat key="b"
                    thousandsGroupStyle="thousand"
                    thousandSeparator=","
                    className='w-full bg-transparent font-extrabold focus:outline-none '
                    id="total"
                    disabled
                    value={balance}
                    />
                </div>
                </div>
            </fieldset> */}
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Amount In Word
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="amountinword"
                placeholder="Amount In Word"
                id="amountinword"
                onChange={(e) => { setAmountInWord(e.target.value) }}
                value={amountinword}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="t" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Amount In Word</legend>
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="amountinword"
                placeholder="Amount In Word"
                id="amountinword"
                onChange={(e) => { setAmountInWord(e.target.value) }}
                value={amountinword}
                />
            </fieldset> */}
            <div className="flex flex-col px-1">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Currency
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="currency"
                placeholder={productcurrency}
                id="currency"
                onChange={(e) => { setProductCurrency(e.target.value) }}
                value={productcurrency}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="ta" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Currency</legend>
                <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                name="currency"
                placeholder={productcurrency}
                id="currency"
                onChange={(e) => { setProductCurrency(e.target.value) }}
                value={productcurrency}
                />
            </fieldset> */}
            <Stack key="r">
                {(addedProduct.length >= 1) && [
                addedProduct.map((added, index) => {
                    return (
                    <>
                        <div key="a" className='flex items-center'>
                        {/* <button key="a" className='flex flex-row w-2/12 p-1 justify-center cursor-pointer
                                                bg-slate-300  hover:bg-slate-400 rounded-lg'
                            onClick={() => removeProduct(added.id)}
                        >
                            <FaRegWindowClose className='w-16' />
                        </button> */}
                        
                        <ProductCard key="b" label={added.id} name={added.productname} 
                            unitprice={added.unitprice} quantity={added.quantity} 
                            amount={added.amount} 
                        />
                        <span className='w-[10%] flex justify-center'>
                        <MdDeleteForever key="a"
                            className='text-red cursor-pointer'
                            onClick={() => removeProduct(added.id)}
                            size={30}
                         />
                         </span>
                         </div>
                    </>
                    );
                })
                ]}
                {(addedService.length >= 1) && [
                addedService.map((added, index) => {
                    return (
                    <>
                        <div key="a" className='flex items-center'>
                        
                         <ProductCard key="b" label={added.id} name={added.servicename} 
                            unitprice={added.initial_amount} quantity={added.quantity} 
                            amount={added.final_amount} 
                        />
                        <span className='w-[10%]'>
                        <MdDeleteForever key="a"
                            className='text-red cursor-pointer'
                            onClick={() => removeService(added.id)}
                            size={30}
                         />
                         </span>
                        </div>
                        
                    </>
                    );
                })
                ]}
            </Stack>
            <div className="flex flex-col px-1 mb-6">
              <label className="flex gap-4 items-center">
                <div className="flex border-gray-400 rounded-full border p-2">
                <Icon icon="iconoir:coins" width="20" height="20"
                
              />
                </div>
                <div className="flex gap-2">
                  <span className="text-center">
                  Terms And Conditions
                  </span>
                  <CiCircleQuestion className="text-top" size={15} />
                </div>
              </label>
              <div className="flex gap-4">
                {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                {/*</div>*/}
                <div className="flex items-center relative w-full px-4 border-gray-400 
                    hover:border-none active:border-none border rounded 
                    outline-none">
                <textarea className='flex flex-row justify-center rounded-lg items-center w-full h-full mr-2 p-4'
                    style={{Width:"95%"}}
                    id="termsandcondition"
                    rows="6"
                    value ={termsandcondition}
                    onChange={(e) =>{setTermsAndCondition(e.target.value); }}
                />
                </div>
              </div>
            </div>
            {/* <fieldset key="x" className='border border-black hover:border-red-400 h-48 rounded-lg flex flex-row w-full mb-5 justify-center items-center p-1'>
                <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Terms And Conditions</legend>
                <textarea className='flex flex-row justify-center rounded-lg items-center w-full h-full bg-[#cacac4] mr-2'
                    style={{Width:"95%"}}
                    id="termsandcondition"
                    rows="6"
                    value ={termsandcondition}
                    onChange={(e) =>{setTermsAndCondition(e.target.value); }}
                />
            </fieldset> */}
        </div>
        </div>
    )
}

export default ReceiptForm