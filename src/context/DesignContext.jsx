/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";

const DesignContext = createContext();

export const useDesign = () => useContext(DesignContext);

const DesignsProvider = ({ children }) => {
    const [design, setDesign] = useState([]);
    const [designs, setDesigns] = useState([]);
    const [datestamp, setDatestamp] = useState("");
    const [daystamp, setDaystamp] = useState("");
    const [monthstamp, setMonthstamp] = useState("");
    const [yearstamp, setYearstamp] = useState("");
    const [suggestedCategories, setSuggestedCategories] = useState([]);
    const [smallbiz, setSmallbiz] = useState([]);
    const [onlyreceipt, setOnlyReceipt] = useState(false);
    const [idToDownload, setIdtodownload] = useState();
    const [initials, setInitials] = useState('U');
    const [receipttype, setReceiptType] = useState("new");
    const [onlySmallbiz, setOnlySmallbiz] = useState(false);
    const [quickReceipt, setQuickReceipt] = useState([]);
    const [salesdata,setSalesData] = useState([]);
    const [olddesign,setOldDesign] = useState([]);


    const cb = localStorage.getItem('categbar');
    const setCategorybars = (a)=>{
        let as = JSON.stringify(a)
        localStorage.setItem('categbar', as);
      }
    const categorybars = cb ? JSON.parse(cb) : [];


    const [windowSize, setWindowSize] = useState(getWindowSize());
    useEffect(() => {
        function handleWindowResize() {
          setWindowSize(getWindowSize());
        }
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const setIdToDownload = (data) =>{
        setIdtodownload(data)
        localStorage.setItem('idToDownload', JSON.stringify(data));
    }
    const defaultDatas = {
        "logoUrl":"/images/logourl.png",
        "companyname":"Theceoapp",
        "signature":"/images/signature.png",
        "editable":"/images/random.png",
        "bg":"/images/white.jpg"
    }
    const processInitial = (name) => {
        if(name !== undefined){
          let names = name.split(" ");
          let init = names[0].substring(0, 1).toUpperCase();
          setInitials(init);
        }else{
          setInitials(".");
        }
    }
    return (
        <DesignContext.Provider value={{ design, setDesign, designs, setDesigns, datestamp, setDatestamp ,daystamp, setDaystamp, 
            monthstamp, setMonthstamp, yearstamp, setYearstamp, suggestedCategories, setSuggestedCategories,
            smallbiz, setSmallbiz, onlyreceipt, setOnlyReceipt, setCategorybars,categorybars, windowSize, 
            idToDownload, setIdToDownload, defaultDatas, initials, setInitials, processInitial,receipttype, setReceiptType,
            onlySmallbiz, setOnlySmallbiz, quickReceipt, setQuickReceipt,salesdata, setSalesData, olddesign,setOldDesign
        }}>
            {children}
        </DesignContext.Provider>
    );
};
const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default DesignsProvider;
