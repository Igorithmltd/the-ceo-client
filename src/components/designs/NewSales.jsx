import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box} from "@mui/material";
import { ReceiptForm, ScanProduct, ReceiptLists} from '../designs';
import swal from 'sweetalert';
import { NumericFormat } from 'react-number-format';
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";


const NewSales = (props) => {
  const { handleCloseNewSales, userData, loggedIn,
    generateNewDimention, windowSize, generateNewPosition , setReceiptType, setSalesData,
     navigate,setIdToDownload, setQuickReceipt } = props;

  const downloadable = useRef();
  const api = ApiSetup();
  const { userInfo } = useAuth();

  /// Receipt View Modal
  
  const [openReceiptSelect, setOpenReceiptSelect] = useState(false);
  const handleOpenReceiptSelect = () => setOpenReceiptSelect(true);
  const handleCloseReceiptSelect = () => setOpenReceiptSelect(false);


  /////////////////////////////////////////////////////////////////////////
  /// Variables and containers
  /////////////////////////////////////////////////////////////////////////
  const [formEdit, setFormEdit] = useState(false);
  const [designs, setDesigns] = useState([]);

  /////////////////////////////////////////////////////////////////
  const [datestamp, setDatestamp] = useState("");
  const [daystamp, setDaystamp] = useState("");
  const [monthstamp, setMonthstamp] = useState("");
  const [yearstamp, setYearstamp] = useState("");


  const [justAdded, setJustAdded] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [termsandcondition, setTermsAndCondition] = useState("");
  const [productcurrency, setProductCurrency] = useState("");
  // // // Search Product From database.
  ///////////////////////////////////////////////////////////////
  const [stock, setStock] = useState(0);
  const [url, setUrl] = useState("");
  const [unitsellingprice, setUnitsellingprice] = useState(0);
  const [unitcostprice, setUnitCostPrice] = useState(0);
  const [nameinlist, setNameInList] = useState(false);
  // Totals
  /////////////////////////////////////////////////
  const [total, setTotal] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paid, setPaid] = useState(0);
  /// Products
  /////////////////////////////////////////////////////////////////////////
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitrate, setUnitrate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [productSearchMode, setProductSearchMode] = useState(false);
  const [allproducts, setAllproducts] = useState([]);
  const [allusersalesitems, setAllUserSalesItems] = useState("");
  const [addedProduct, setAddedProduct] = useState([]);
  const [addedService, setAddedService] = useState([]);
  const [amountinword, setAmountInWord] = useState("");
  // Lets work on the Form
  //#######################################################################
  const [receiptdate, setReceiptDate] = useState(new Date());
  const [registeredUser, setRegisteredUser] = useState("no");
  const [cid, setCid] = useState("new");
  const [caddress, setCaddress] = useState("");
  const [customer, setCustomer] = useState([]); //This will be fetched and filtered from the database.
  
  //#######################################################################
  const [customerSearchMode, setCustomerSearchMode] = useState(false);
  const [cname, setCname] = useState("");
  //#######################################################################
  const [cphoneSearchMode, setCphoneSearchMode] = useState(false);
  const [cphone, setCphone] = useState("");
  //#######################################################################
  const [cemailSearchMode, setCemailSearchMode] = useState(false);
  const [cemail, setCemail] = useState("");
  
  ///////////////////////////////////////////////////////////
  // // // Search Product From database.
  ///////////////////////////////////////////////////////////////
  const setDefaultProduct = () => {
    setProductname("");
    setQuantity(0);
    setUnitrate(0);
    setUnitCostPrice(0);
    setUnitsellingprice(0);
    setAmount(0);
    setProductSearchMode(false);
    setAmountInWord("");
  }

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
  const countindesign = () => {
      return 10000
  }
  const addProductToQueue = () => {
    setJustAdded("");
    // This will Add the product to the array of selected products
    // ["id","name","stock","unitsellingprice","unitcostprice","url"]
    let inlist = false;
    const count = countindesign();
    const leng = addedProduct.length + addedService.length;
    if(leng >= count){
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
            productid: items.id,
            productname: productname,
            quantity: quantity,
            unitprice: unitrate,
            unitcostprice: unitcostprice,
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
            productid: "new",
            productname: productname,
            quantity: quantity,
            unitprice: unitrate,
            unitcostprice: unitcostprice,
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

  const ProcessScan = (itemsdata)=>{
    let count1 = 0;
    let count2 = 0;

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
            productid: item.productId,
            productname: item.productname,
            quantity: item.quantity,
            unitprice: item.unitSellingPrice,
            unitcostprice: item.unitCostPrice,
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
            serviceid: item.serviceId,
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
  function processSalesData(id){
    return {
      "total": total,
      "advance": advance,
      "balance": balance,
      "amountinword": amountinword,
      "cid": cid,
      "cname": cname,
      "cphone": cphone,
      "cemail": cemail,
      "caddress": caddress,
      "customerUrl": "",
      "date": receiptdate,
      "invoicenumber": invoicenumber,
      "design_id": id,
      "formatteddate": receiptdate,
      "registereduser": registeredUser,
      "soldproducts": addedProduct,
      "soldservices": addedService,
      "user_id": userData.masked_id,
    }

  }
  const processDownloadReceipt = async (design) => {
    let salesdata = processSalesData(design.id);
    setReceiptType("newsales");
    setQuickReceipt([design]);
    setSalesData(salesdata);
    localStorage.setItem('idToDownload',design.id);
    setIdToDownload(design.id);
    navigate('/dashboard/designs/template');
  } 

  
  //###################################################################################
  /////////////////////////////////////////////////////////////////////////
  /// Fetcher Functions 
  /////////////////////////////////////////////////////////////////////////


  // Get list of customers
  //###################################################################################
  async function getCustomers(id){
    const datas = JSON.stringify({
      u_id:id
    });
    try {
      const resp1 = await api.post('getcustomersforreceipt', datas );
      if (resp1.data.message === "success") {
        setCustomer(resp1?.data.customersdata);
      }
    } catch (error) {
      getCustomers(userInfo.masked_id);
    }
  }
  async function getSalesItems(id){
    const datas = { type: "ALL", u_id: id }
    const resp = await api.post('getallsalesqritems', datas );
    setAllUserSalesItems(resp.data.items);
  }
  async function getAllProducts(id) {
    const datas = JSON.stringify({
      u_id: id
    });
    try {
      const resp1 = await api.post('getallproductsforreceipt', datas );
      if (resp1.data.message === "success"){
        setAllproducts(resp1?.data.products);
      }
    } catch (error) {
      getAllProducts(userInfo.masked_id);
    }
  }
  const generateExpandibleheight = (width, height, screenWidth, divWidth, type, ret) =>{
    let header = generateNewDimention(width, height, screenWidth, divWidth, type, ret);
    const itemcount = addedProduct.length + addedService.length
    const heigh = 20 * parseInt(itemcount)
    return parseInt(header) + parseInt(itemcount) + heigh + 325;
  }
      ///////////////////////////////////////////////////////////////////////////////////////
    // THIS FUNCTION GETS THE DESIGN FROM THE DATABASE
    //#####################################################################################
  const getExpandableDesigns = async (id) => {
      const pagerow = 7000;
      let page=1
      const from = (page - 1) * pagerow;
      const datas = JSON.stringify({
          from: from,
          pagerow: pagerow,
          user_id: id
      });
      try {
          const resp1 = await api.post('getexpandabledesigns', datas );
          if (resp1?.data.message === "Success") {
            setDesigns(resp1.data.designs);
            setDatestamp(resp1?.data.datestamp.datestamp);
            setYearstamp(resp1?.data.datestamp.yearstamp);
            setMonthstamp(resp1?.data.datestamp.monthstamp);
            setDaystamp(resp1?.data.datestamp.daystamp);
          } else {
              swal(resp1?.data.message);
          }
      } catch (error) {
          swal(" ");
          const d = await swal({
              title: "Oops",
              text: "No Receipt Found For You",
              icon: "info",
              buttons: true,
              dangerMode: true,
          });
      }
  }

  // To load other Requirements
  useEffect(() => {
      getCustomers(userInfo.masked_id);
      getAllProducts(userInfo.masked_id);
      getSalesItems(userInfo.masked_id);
      getExpandableDesigns(userInfo.masked_id);
    
  }, []);
  function isExpandable(){
    return true;
  }
  function setFormItem(){

  }
  function setFormOnePicItem(){

  }
  function recalculate(){

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
  const sty2 = {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    transform: 'translateX(0)',
    bgcolor: 'gray',
    boxShadow: 24,
    zIndex:35,
    p: 3,
  };
  return (
    <div className='relative flex flex-col justify-start items-center pb-12 pt-4'>
      {/* <div style={sty2} className='flex flex-between'> */}
      <div className='flex justify-between absolute bottom-0 w-full px-8'>
        <div key="b" className="flex flex-row justify-center opacity-100">
          <ScanProduct ProcessScan={ProcessScan} allusersalesitems={allusersalesitems} count = {countindesign()} leng = {addedProduct.length + addedService.length} />
        </div>
        <div key="a" className='flex flex-row justify-center opacity-90'>
          {/* <button className='rounded-xl border-2 border-black pr-4 pl-4 p-2 mb-1 cursor-pointer   hover:bg-gray-200 font-extrabold bg-green-500 opacity-100 text-white' 
          onClick={() => { handleOpenReceiptSelect() }} >Done</button> */}
          <button
          onClick={() => { handleOpenReceiptSelect() }} 
          className="hover:bg-gray-200 font-extrabold bg-green-500 opacity-100 py-4 px-8 text-white rounded-full flex md:gap-3"
        >
          Done
        </button>
        </div>
        
      </div>
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
        userData={userData} termsandcondition={termsandcondition}  setTermsAndCondition={setTermsAndCondition}
        productcurrency = {productcurrency} setProductCurrency = {setProductCurrency} invoicenumber={invoicenumber}
        setInvoiceNumber={setInvoiceNumber} 

      />
      <Modal key="c" sx={st} open={openReceiptSelect} className="-pt-4" onClose={handleCloseReceiptSelect} >
          <Box className="w-full mt-4 overflow-y-scroll scrollbar-hide" sx={sty}>
              <ReceiptLists designs={designs} handleCloseReceiptSelect={handleCloseReceiptSelect} handleOpenReceiptSelect={handleOpenReceiptSelect} 
                  openReceiptSelect={openReceiptSelect} userData={userData} loggedIn={loggedIn}
                  addedProduct={addedProduct} addedService={addedService} balance={balance} 
                  advance={advance} total={total} NumericFormat={NumericFormat} generateNewDimention={generateNewDimention} 
                  windowSize={windowSize} generateExpandibleheight={generateExpandibleheight} 
                  isExpandable={isExpandable} downloadable={downloadable} generateNewPosition={generateNewPosition} 
                  productcurrency={productcurrency} formEdit={formEdit} setFormEdit={setFormEdit} 
                  recalculate={recalculate} setFormItem={setFormItem} setFormOnePicItem={setFormOnePicItem} 
                  datestamp={datestamp} daystamp={daystamp} monthstamp={monthstamp} yearstamp={yearstamp}                 
                  processDownloadReceipt={processDownloadReceipt}
                  />
          </Box>
      </Modal>
    </div>
  )
}

export default NewSales