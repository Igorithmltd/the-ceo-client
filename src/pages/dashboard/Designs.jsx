import React, { useState, useCallback, useEffect, useRef } from "react";
import SearchInput from "../../components/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDesign } from "../../context/DesignContext";
import ApiSetup from "../../utils/ApiSetup";
import { baseUrl } from "../../utils/ApiSetup";
import {
  DesignObject,
  AdvertShow,
  ImageTrabed,
} from "../../components/designs";
import { Stack } from "@mui/material";
import LoadingAnimation from "../../components/Loader";
//import * as ComponentDesign from "../../components/designs/designcomponents";
//import {Cropblock }from "../../components/designs/crop";

const Designs = () => {
  const [orientation, setOrientation] = useState("landscape");
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [designLoading, setDesignLoading] = useState(true);
  const { userInfo } = useAuth();
  const api = ApiSetup();

  const handleOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  useEffect(()=>{
    setTimeout(()=>{
      setDesignLoading(false)
    },5000)
  },[])

  // const [design, setDesign] = useState([]);
  // const [designs, setDesigns] = useState([]);
  // const [datestamp, setDatestamp] = useState("");
  // const [daystamp, setDaystamp] = useState("");
  // const [monthstamp, setMonthstamp] = useState("");
  // const [yearstamp, setYearstamp] = useState("");
  // const [suggestedCategories, setSuggestedCategories] = useState([]);
  // const [smallbiz, setSmallbiz] = useState([]);
  // const [onlyreceipt, setOnlyReceipt] = useState(false);

  const {
    design,
    setDesign,
    designs,
    setDesigns,
    datestamp,
    setDatestamp,
    daystamp,
    setDaystamp,
    monthstamp,
    setMonthstamp,
    yearstamp,
    setYearstamp,
    suggestedCategories,
    setSuggestedCategories,
    smallbiz,
    setSmallbiz,
    onlyreceipt,
    setOnlyReceipt,
    setCategorybars,
    categorybars,
    windowSize,
    setIdToDownload,
    onlySmallbiz,
    setOnlySmallbiz,
    defaultDatas
  } = useDesign();

  const navigate = useNavigate();
  const downloadable = useRef();

  if (userInfo.pay_type === "Smallbiz") {
    setOnlySmallbiz(true);
  } else {
    setOnlySmallbiz(false);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////
  //#########################################################################################
  const generateNewDimention = (
    width,
    height,
    screenWidth,
    divWidth,
    type,
    ret
  ) => {
    const htwRatio = height / width; // HEIGHT TO WIDTH RATIO
    const itcRatio = width / divWidth; // ITEM TO CONTAINER RATION
    let newHeight = height;
    let newWidth = width;
    let newDivWidth = divWidth;

    if (screenWidth < divWidth) {
      newDivWidth = screenWidth - 80;
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
  };

  const generateNewPosition = (
    old_width,
    new_width,
    old_height,
    new_height,
    old_x,
    old_y,
    type
  ) => {
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
  };
  ///////////////////////////////////////////////////////////////////////////////////////////
  // Check if the plan is Smallbiz or Companybiz
  const isInSmallbiz = (name) => {
    let set = false;
    smallbiz.map((small) => {
      if (small === name) {
        set = true;
      }
    });
    return set;
  };
  // Check if a design is Free or paid
  const isFree = (name) => {
    if (name === "1 Receipts") {
      return true;
    } else if (name === "2 Invoice") {
      return true;
    } else if (name === "3 Quotation") {
      return true;
    } else {
      return false;
    }
  };

  const lowpaynemt = () => {
    let str = false;
    if (userInfo?.pay_state === "No") {
      str = true;
    } else {
      str = false;
    }
    return str;
  };
  const notpaid = (name) => {
    if (lowpaynemt()) {
      if (isFree(name)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  // Check if Download is allowed
  const isDownloadAllowed = (data) => {
    let str = false;
    if (onlySmallbiz) {
      if (isInSmallbiz(data)) {
        if (onlyreceipt) {
          if (isFree(data)) {
            str = true;
          }
        } else {
          if (lowpaynemt() && !isFree(data)) {
            str = false;
          } else {
            str = true;
          }
        }
      }
    } else {
      if (onlyreceipt) {
        if (isFree(data)) {
          str = true;
        }
      } else {
        if (lowpaynemt() && !isFree(data)) {
          str = false;
        } else {
          str = true;
        }
      }
    }
    return str;
  };
  // Check if an accout is Smallbiz
  const isSmallAccount = (data) => {
    let ret = false;
    if (onlySmallbiz) {
      if (!isInSmallbiz(data)) {
        ret = true;
      }
    }
    return ret;
  };
  const processBaseUrl = (urls) => {
    if (urls.length <= 5) {
      return defaultDatas.bg;
    } else {
      return baseUrl + urls;
    }
  };
  const fetchCategories = useCallback(async function (id, design) {
    try {
      const data = JSON.stringify({ fetch: "all", user_id: id });
      const resp1 = await api.post("usergetuserboundcategories", data);
      const permittedCategories = resp1?.data.ubcategories;
      setSuggestedCategories(resp1?.data.suggested_categories);
      setSmallbiz(resp1?.data.smallcategories);
      //Get the list of categories in the design array
      let cat = [];
      let final = [];
      design.map((items) => {
        cat.push(items.category);
      });
      permittedCategories.forEach((el) => {
        if (cat.includes(el)) {
          final.push(el);
        }
      });
      setCategorybars(final);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [adverts, setAdverts] = useState("");

  const userfetchadverts = useCallback(async function (id) {
    try {
      const data = JSON.stringify({ user_id: id });
      const resp1 = await api.post("userfetchadverts", data);
      if (resp1?.data.message === "Success") {
        const advert = resp1?.data.datas;
        setAdverts(advert);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getdownloadtimes = async function (id) {
    const datas = JSON.stringify({
      user_id: id,
      action: "design",
    });
    const resp1 = await api.post("checkdownloadtimes", datas);
    if (resp1.data.message === "success") {
      if (resp1?.data.action === "onlyreceipt") {
        setOnlyReceipt(true);
      } else {
        setOnlyReceipt(false);
      }
    }
  };
  const getDesigns = useCallback(async function (id) {
    let page = 1;
    const pagerow = 7000;
    const from = (page - 1) * pagerow;
    const datas = JSON.stringify({
      from: from,
      pagerow: pagerow,
      user_id: id,
      category: "All",
    });
    const datas1 = JSON.stringify({
      phone: "2347034401864",
      password: "heisable1",
      logtype: "phone",
    });
    try {
      // const resp = await api.post("@user", datas1);
      // console.log("UserLogin",resp);

      const resp1 = await api.post("getallcategorydesigns", datas);
      if (resp1?.data.message === "Success") {
        setDatestamp(resp1?.data.datestamp.datestamp);
        setYearstamp(resp1?.data.datestamp.yearstamp);
        setMonthstamp(resp1?.data.datestamp.monthstamp);
        setDaystamp(resp1?.data.datestamp.daystamp);

        if (resp1.data.designs !== designs) {
          setDesigns(resp1.data.designs);

          let a = JSON.stringify(resp1.data.designs);
          localStorage.setItem("desi", a);
          fetchCategories(id, resp1.data.designs);
          userfetchadverts(id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setIdToD = async (id, design) => {
    setDesign([design]);
    setIdToDownload(id);
    navigate("/Dashboard/designs/template");
  };
  const storeD = localStorage.getItem("desi");
  const displayDesign = storeD ? JSON.parse(storeD) : [];

  useEffect(() => {
    getdownloadtimes(userInfo?.masked_id);
    getDesigns(userInfo?.masked_id);
  }, [userInfo]);

  useEffect(() => {
    let filteredDesigns = [];
    if (!selectedCategory) {    
        filteredDesigns = displayDesign.filter((design) => {
            return suggestedCategories.includes(design.category);
        });
    } else {    
        filteredDesigns = displayDesign.filter((design) => {
            return design.category == selectedCategory
        });
    }

    setFilteredDesigns(filteredDesigns);
  }, [suggestedCategories, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-auto hide-scrollbar">
      <header className="px-6 py-4 border-b md:border-t w-full">
        <span className="font-bold">Designs</span>
      </header>
      <section className="p-6 flex flex-col gap-4">
        <article key="0" className="md:hidden">
          <SearchInput />
        </article>
        <div key="a" className="flex sm:flex-row flex-col justify-between px-4 py-2 items-center gap-3 md:gap-0">
          <h1>{selectedCategory ? selectedCategory : "Recommended designs"}</h1>
          <div className="flex gap-10 w-full justify-end">
            <select
              onChange={handleCategoryChange}
              name=""
              id=""
              className="border py-1 px-3 bg-gray-100 sm:w-fit w-full"
            >
              <option value="">Categories</option>
              {categorybars.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div key="b" className="grid md:grid-cols-1 grid-cols-1 lg:grid-cols-4 
          gap-8">
          {filteredDesigns
            ? [
                filteredDesigns.map((design, index) => {
                  let setshow = 0;
                  let count = 0;
                  //   if (design.category === items) {
                  let wth = generateNewDimention(
                    design.width,
                    design.height,
                    windowSize.innerWidth,
                    design.width,
                    "div",
                    "width"
                  );
                  let hth = generateNewDimention(
                    design.width,
                    design.height,
                    windowSize.innerWidth,
                    design.width,
                    "div",
                    "height"
                  );
                  if (setshow >= 3) {
                    setshow = 0;
                    count += 1;
                  } else {
                    setshow++;
                  }
                  return (
                    <div
                      index={index}
                      key={index}
                      className="flex flex-row justify-center"
                    >
                      <DesignObject
                        design={design}
                        index={index}
                        isFree={isFree}
                        onlyreceipt={onlyreceipt}
                        isSmallAccount={isSmallAccount}
                        notpaid={notpaid}
                        downloadable={downloadable}
                        setIdToD={setIdToD}
                        isDownloadAllowed={isDownloadAllowed}
                        generateNewDimention={generateNewDimention}
                        generateNewPosition={generateNewPosition}
                        processBaseUrl={processBaseUrl}
                        ImageTrabed={ImageTrabed}
                        windowSize={windowSize}
                        monthstamp={monthstamp}
                        yearstamp={yearstamp}
                        daystamp={daystamp}
                        datestamp={datestamp}
                        userData={userInfo}
                      />
                      {setshow === 2 && (
                        <AdvertShow
                          style={{ width: wth, height: hth }}
                          adCount={count}
                          adverts={adverts}
                        />
                      )}
                    </div>
                  );
                  //   }
                }),
              ]
            : [
                <>
                  <Isloading />
                </>,
              ]}
        </div>
        <div key="c" className="flex justify-center py-5 mt-8 mb-8">
          <button className=" border-red-300 text-red-600 font-bold py-2 px-5 rounded-[40px] border-2">
            Load more
          </button>
        </div>
      </section>
    </div>
  );
};

export default Designs;
