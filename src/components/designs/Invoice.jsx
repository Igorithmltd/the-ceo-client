/* eslint-disable react/jsx-key */
import React from 'react';
import { Stack} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaAngleDoubleUp, FaAngleDoubleDown, FaRegWindowClose } from 'react-icons/fa';
import { SelectButton2, ProductCard } from "../designs";
import { Icon } from '@iconify-icon/react';
import { CiCircleQuestion } from "react-icons/ci";
import { TfiAngleDown } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { TfiAngleUp } from "react-icons/tfi";
import { NumericFormat } from 'react-number-format';

const Invoice = props => {
    const { setReceiptDate, receiptdate, customerSearchFunction,cname,customerSearchMode, setCustomerSearchMode,
        filteredCustomerList, customerSearchSelectionHandler, cphone, setCphone, caddress, setCaddress, cemail, setCemail,
        productSearchMode, setProductSearchMode, productname, productSearchFunction, productSearchSelectionHandler, filteredProductList,
        setQuantity, quantity, setUnitrate, unitrate, justAdded, amount, setUnitCostPrice, unitcostprice, paid,resolvePaid, addProductToQueue,
        unitsellingprice, nameinlist, total, balance, setAmountInWord, amountinword, addedProduct, addedService, setAddedService,setAddedProduct,
        setChangebankdetails, updatebankdetails, accountname, accountnumber, bankname, termsandcondition, setAccountName, setAccountNumber,
        setBankName, setTermsAndCondition, invoicenumber, setInvoiceNumber, productcurrency, setProductCurrency} = props;
    
    
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
    
    
    return (
        <>
            <div className='flex flex-col relative w-full'>
                {/* <fieldset key="a" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Date</legend>
                    <DatePicker selected={receiptdate} format='Pp' onChange={(date) => { setReceiptDate(date); }}
                        className="w-full border-none p-2 border-[0] hover:border-none focus:outline-none"
                        style={{ border: "none", width: "100%"}} />
                </fieldset> */}
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
                        {/* <DatePicker selected={receiptdate} format='Pp' onChange={(date) => { setReceiptDate(date); }}
                            className="w-full border-none p-2 border-[0] hover:border-none focus:outline-none"
                            style={{ border: "none", width: "100%"}} /> */}
                        <DatePicker selected={receiptdate} format='Pp' onChange={(date) => { setReceiptDate(date); }}
                        className="w-full border-none p-2 border-[0] hover:border-none focus:outline-none"
                        style={{ border: "none", width: "100%"}} />
                        {/* <TfiAngleDown size={15} /> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                        <Icon icon="iconoir:coins" width="20" height="20" />
                        </div>
                        <div className="flex gap-2">
                        <span className="text-center">
                        Invoice Number
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
                            name="invoicenumber"
                            placeholder="Invoice Number"
                            id="invoicenumber"
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            value={invoicenumber}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="g1" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Invoice Number</legend>
                    <input type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="invoicenumber"
                        placeholder="Invoice Number"
                        id="invoicenumber"
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        value={invoicenumber}
                    />
                </fieldset>                 */}
                <h1 key="h" className='flex flex-row justify-start pl-2 font-bold'>Customer's Information</h1>
                {/* <h1 key="b" className='flex flex-row justify-start pl-2 text-[9px]'>Customer's Information</h1> */}
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                        <Icon icon="iconoir:coins" width="20" height="20"
                        
                    />
                        </div>
                        <div className="flex gap-2">
                        <span className="text-center">
                        Customer's name
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
                        name="cname"
                        placeholder="Customer's Name *"
                        id="cname"
                        required
                        onChange={(e) => { customerSearchFunction(e.target.value) }}
                        value={cname}
                        />
                        <i key="c" onClick={() => { setCustomerSearchMode(!customerSearchMode) }}
                        style={{ width: "5%" }}
                        className='text-blue-400 pr-2 pl-1 text-small cursor-pointer justify-center '>
                        {customerSearchMode ? <TfiAngleUp /> : <TfiAngleDown />}
                        </i>
                        </div>
                    </div>
                </div>
                {/* <fieldset key="c" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'
                style={{ width: "100%" }}>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Customer's name</legend>
                    <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
                        name="cname"
                        placeholder="Customer's Name *"
                        id="cname"
                        required
                        onChange={(e) => { customerSearchFunction(e.target.value) }}
                        value={cname}
                    />
                    <i key="c" onClick={() => { setCustomerSearchMode(!customerSearchMode) }}
                        style={{ width: "5%" }}
                        className='text-blue-400 pr-2 pl-1 text-small cursor-pointer 
                                                        hover:bg-blue-400 hover:text-blue-900 rounded-full flex flex-col justify-center '>
                        {customerSearchMode ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                    </i>
                </fieldset> */}
                {customerSearchMode && [
                    <div key="d" className='searchOutput w-full relative'>
                        <div className="flex flex-col border  border-[#762323] bg-[#762323]  w-full justify-center max-h-60 overflow-scroll scrollbar-hide absolute">
                        <Stack key="b" direction="col" className="flex flex-col  w-full justify-start max-h-48 mt-3 pt-3 pr-1 pl-1 overflow-scroll scrollbar-hide">
                            {filteredCustomerList.map((items, index) => {

                                return (
                                    <SelectButton2 key={index} Style="color" type={"button"} FunctionToExecute={customerSearchSelectionHandler} >
                                    {/* {items} */}
                                    {items.name}
                                    </SelectButton2>
                                );
                            })}
                        </Stack>
                        <span key="a" className='flex flex-row justify-center cursor-pointer pt-2 pb-2 rounded-lg hover:bg-blue-700 w-full bg-blue-900 text-white font-Inter-Regular text-sm font-extrabold'
                            onClick={() => { setCustomerSearchMode(false) }}>Close</span>
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
                        Customer's Phone Number
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
                        name="cphone"
                        placeholder="Customer's Phone Number *"
                        id="cphone"
                        required
                        onChange={(e) => setCphone(e.target.value)}
                        value={cphone}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="e" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Customer's Phone Number</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="cphone"
                        placeholder="Customer's Phone Number *"
                        id="cphone"
                        required
                        onChange={(e) => setCphone(e.target.value)}
                        value={cphone}
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
                        <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
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
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                        <Icon icon="iconoir:coins" width="20" height="20"
                        
                    />
                        </div>
                        <div className="flex gap-2">
                        <span className="text-center">
                        Customer's Email
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
                        name="cemail"
                        placeholder="Customer's Email Address"
                        id="cemail"
                        required
                        onChange={(e) => setCemail(e.target.value)}
                        value={cemail}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="g" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Customer's Email</legend>
                    <input type="email" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="cemail"
                        placeholder="Customer's Email Address"
                        id="cemail"
                        required
                        onChange={(e) => setCemail(e.target.value)}
                        value={cemail}
                    />
                </fieldset> */}
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
                        <div className="flex flex-col border  border-[#762323] bg-[#762323]  w-full justify-center max-h-60 overflow-scroll scrollbar-hide absolute">
                        <Stack key="b" direction="col" className="flex flex-col  w-full justify-start max-h-48 mt-3 pt-3 pr-1 pl-1 overflow-scroll scrollbar-hide">
                            {filteredProductList.map((items, index) => {
                            // ["id","name","stock","unitsellingprice","url"]
                            return (
                                <SelectButton2 key={index} Style="color" type={"button"} FunctionToExecute={productSearchSelectionHandler} >
                                {items.name}
                                </SelectButton2>
                            );
                            })}
                        </Stack>
                        <span key="a" className='flex flex-row justify-center cursor-pointer pt-2 pb-2 rounded-lg hover:bg-red-700 w-full bg-red-900 text-white font-Inter-Regular text-sm font-extrabold'
                            onClick={() => { setProductSearchMode(false) }}>Close</span>
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
                        Quantity 
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
                        name="quantity"
                        placeholder="quantity"
                        id="quantity"
                        required
                        onChange={(e) => { setQuantity(e.target.value) }}
                        value={quantity}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="k" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Quantity </legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="quantity"
                        placeholder="quantity"
                        id="quantity"
                        required
                        onChange={(e) => { setQuantity(e.target.value) }}
                        value={quantity}
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
                        <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
                        name="unitrate"
                        placeholder={unitsellingprice ? unitsellingprice : "Rate Per Good/ Service"}
                        id="unitrate"
                        required
                        onChange={(e) => { setUnitrate(e.target.value) }}
                        value={unitrate}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="l" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Rate per Good/ Service</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="unitrate"
                        placeholder={unitsellingprice ? unitsellingprice : "Rate Per Good/ Service"}
                        id="unitrate"
                        required
                        onChange={(e) => { setUnitrate(e.target.value) }}
                        value={unitrate}
                    />
                </fieldset> */}
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
                        onChange={(e) => { setUnitCostPrice(e.target.value) }}
                        value={unitcostprice}
                      />
                      </div>
                    </div>
                  </div>
                    // <fieldset key="l1" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    //     <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Cost Price per Good/ Service</legend>
                    //     <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                    //     name="unitrate"
                    //     placeholder={unitcostprice ? unitcostprice : "Cost Rate Per Good/ Service"}
                    //     id="unitcost"
                    //     required
                    //     onChange={(e) => { setUnitCostPrice(e.target.value) }}
                    //     value={unitcostprice}
                    //     />
                    // </fieldset>
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
                        <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
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
                {/* <fieldset key="m" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Amount</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
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
                        Discount
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
                        name="paid"
                        placeholder="Discount"
                        id="paid"
                        required
                        onChange={(e) => { resolvePaid(e.target.value) }}
                        value={paid}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="p" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Discount</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="paid"
                        placeholder="Discount"
                        id="paid"
                        required
                        onChange={(e) => { resolvePaid(e.target.value) }}
                        value={paid}
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
                        Sub Total 
                        </span>
                        <CiCircleQuestion className="text-top" size={15} />
                        </div>
                    </label>
                    <div className="flex gap-4">
                        {/*<div className="mx-auto w-1 border-gray-400 h-full">*/}
                        <span className="w-[1px] h-[-1] bg-gray-400 rounded mx-5"></span>
                        {/*</div>*/}
                        <div className="flex items-center relative w-full px-4 border-gray-400 border rounded outline-none mb-6 md:mb-10">
                        
                        <span key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3 flex items-center'>
                        {total}
                        </span>
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
                        
                        <span key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3 flex items-center'>
                        {balance}
                        </span>
                        </div>
                    </div>
                </div>
                {/* <fieldset key="q" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-col w-full justify-center items-center'>
                    <div key="a" className=' flex flex-row justify-center text-[#ff0000] w-1/2'>
                        <div key="a" className='flex flex-row justify-start w-1/2'>Sub Total </div>
                        <div key="b" className='flex flex-row justify-end w-1/2'>Total </div>
                    </div>
                    <div key="b" className=' flex flex-row justify-center text-[#ff0000] w-1/2'>
                        <div key="a" className='flex flex-row justify-start w-1/2'>{total} </div>
                        <div key="b" className='flex flex-row justify-end w-1/2'>{balance} </div>
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
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Amount In Word </legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="amountinword"
                        placeholder="Amount In Word"
                        id="amountinword"
                        onChange={(e) => { setAmountInWord(e.target.value) }}
                        value={amountinword}
                    />
                </fieldset> */}
                
                {/* <Stack key="r">
                    {(addedProduct.length >= 1) && [
                        addedProduct.map((added, index) => {
                        return (
                            <>
                            <span key="a" className='flex flex-row justify-end '>
                                <button className='flex flex-row w-2/12 p-1 justify-center cursor-pointer
                                                        bg-slate-300  hover:bg-slate-400 rounded-lg'
                                onClick={() => removeProduct(added.id)}
                                >
                                <FaRegWindowClose className='w-16' />
                                </button>
                            </span>
                            <ProductCard key="b" label={added.id} name={added.productname} unitprice={added.unitprice} quantity={added.quantity} amount={added.amount} />
                            </>
                        );
                        })
                    ]}
                </Stack> */}
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
                <h1 key="o1" className='flex flex-row justify-start pl-2 font-bold'>Account Details</h1>
                <div className="flex flex-col px-1">
                    <label className="flex gap-4 items-center">
                        <div className="flex border-gray-400 rounded-full border p-2">
                        <Icon icon="iconoir:coins" width="20" height="20"
                        
                    />
                        </div>
                        <div className="flex gap-2">
                        <span className="text-center">
                        Account Name
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
                        name="accountname"
                        placeholder="Account Name"
                        id="accountname"
                        maxLength={30}
                        onChange={(e) => { setAccountName(e.target.value); setChangebankdetails(true); }}
                        value={accountname}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="v" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Account Name</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="accountname"
                        placeholder="Account Name"
                        id="accountname"
                        maxLength={30}
                        onChange={(e) => { setAccountName(e.target.value); setChangebankdetails(true); }}
                        value={accountname}
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
                        Account Number 
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
                        name="accountnumber"
                        placeholder="Account Number"
                        maxLength={11}
                        id="accountnumber"
                        onChange={(e) => { setAccountNumber(e.target.value); setChangebankdetails(true); }}
                        value={accountnumber}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="u" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Account Number</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="accountnumber"
                        placeholder="Account Number"
                        maxLength={11}
                        id="accountnumber"
                        onChange={(e) => { setAccountNumber(e.target.value); setChangebankdetails(true); }}
                        value={accountnumber}
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
                        Bank Name
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
                        name="bankname"
                        placeholder="Bank Name"
                        maxLength={30}
                        id="bankname"
                        onChange={(e) => { setBankName(e.target.value); setChangebankdetails(true); }}
                        value={bankname}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="w" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Bank Name</legend>
                    <input key="b" type="text" className='w-11/12 bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        name="bankname"
                        placeholder="Bank Name"
                        maxLength={30}
                        id="bankname"
                        onChange={(e) => { setBankName(e.target.value); setChangebankdetails(true); }}
                        value={bankname}
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
                        <input key="b" type="text" className='bg-transparent h-[45px] font-extrabold text-black focus:outline-none pl-3'
                        style={{ width: "95%" }}
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
                        <textarea 
                            className='flex flex-row justify-center rounded-lg 
                                items-center w-full h-full mr-2 p-4'
                            style={{Width:"95%"}}
                            id="termsandcondition"
                            rows="6"
                            value ={termsandcondition}
                            onChange={(e) =>{setTermsAndCondition(e.target.value); setChangebankdetails(true);}}
                        />
                        </div>
                    </div>
                </div>
                {/* <fieldset key="x" className='border border-black hover:border-red-400 h-16 rounded-lg flex flex-row w-full justify-center items-center'>
                    <legend key="a" className='ml-2 pl-1 pr-1 font-Montserrat text-gray-600 text-[9px]'>Terms And Conditions</legend>
                    <textarea className='flex flex-row justify-center items-center w-full h-[48px] bg-[#cacac4] mr-2'
                        style={{Width:"95%"}}
                        id="termsandcondition"
                        rows="6"
                        value ={termsandcondition}
                        onChange={(e) =>{setTermsAndCondition(e.target.value); setChangebankdetails(true);}}
                    />
                </fieldset> */}
                <button
                        className="flex gap-4 rounded-full ml-auto mb-4 p-4 text-center text-white 
                        bg-gradient-to-r from-red-700 to-red-600 items-center justify-center
                        w-full shadow-lg hover:scale-105 transition-transform"
                        onClick={() => updatebankdetails()}
                    >
                        Update Bank Details
                    </button>
                {/* <label key="y" className='flex rounded-r-lg text-black-400 font-extrabold w-full p-2 '>
                    <input onClick={() => updatebankdetails()} className='bg-red-500 rounded-lg p-2 mt-3 text-white font-extrabold text-lg cursor-pointer w-11/12 hover:bg-red-600' type="submit" value="Update Bank Details" />
                </label> */}

            </div>
        </>
    )
}


export default Invoice;