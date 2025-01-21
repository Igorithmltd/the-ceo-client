import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiSetup from "../../utils/ApiSetup";
import { useAuth } from "../../context/AuthContext";
import {SinglePlugCard, SearchBox} from "../../components/designs"
import {isEmpty} from "../../components/designs/ConstantFunctions"
const Plugs = () => {
    const {userInfo} = useAuth()
    const api = ApiSetup();
    const {searchvalue} = useParams();
        
    /// Variables
    const [businesscategories, setBusinessCategories] = useState([]);
    const [plugs, setPlugs] = useState([]);
    const [locations, setLocations] = useState([]);

    // Settings properties

    const [selected_category, setSelectedCategory] = useState([]);
    const [selected_location, setSelectedLocation] = useState([]);
    const [search, setSearch] = useState([]);

    // We will set a local storage variable to track the id of those that have beeen visited
    function setVisited(id){
        const storeD = localStorage.getItem("plugvis");
        const plugvis = storeD ? JSON.parse(storeD) : [];
        if (! plugvis?.includes(id)) {
            plugvis.push(id);
        }
        localStorage.setItem("plugvis", JSON.stringify(plugvis) );
    }

    function extractValues(){
        //let ret = searchvalue?.split("#") || [];
        const queryString = window.location.search;
        const parts = queryString.slice(1).split("_#$");
        parts.forEach(element => {
            let rets = element?.split("=");
            switch(rets[0]){
                case "category":
                    setSelectedCategory(rets[1].split("#$").join(" "));
                    break;
                case "location":
                    setSelectedLocation(rets[1].split("#$").join(" "));
                    break;
                case "search":
                    setSearch(rets[1].split("#$").join(" "));
                    break;
                default:
                    break;
            }
        });
    }

    const getPlugsData = async function (id) {
        const datas = JSON.stringify({
        user_id: id,
        action: "design",
        });
        const resp1 = await api.post("getplugsdata", datas);
        if (resp1?.data.message === "success") {
            setBusinessCategories(resp1?.data.businesscategories);
            setLocations(resp1?.data.locations.location);
            setPlugs(resp1?.data.plugs);
        }
    };

    useEffect(() => {
        getPlugsData();
    }, []);
    useEffect(() => {
        getPlugsData();
        extractValues();
    }, [searchvalue]);
    function matchTexts(plugdata, searchval) {
        // Break searchval into words
        const searchWords = searchval?.toLowerCase().split(/\s+/); 
        // Recursive function to search through plugdata
        function containsWord(data) {
            if (typeof data === "string") {
                // Check if any word from searchWords is in the string
                return searchWords.some(word => data.toLowerCase().includes(word.toLowerCase()));
            } else if (Array.isArray(data)) {
                // Recursively check all elements in the array
                return data.some(item => containsWord(item));
            } else if (typeof data === "object" && data !== null) {
                // Recursively check all values in the object
                return Object.values(data).some(value => containsWord(value));
            }
            return false; // For other data types (numbers, null, undefined, etc.)
        }
        return containsWord(plugdata)
    }
    // function resolveDisplayedPlugs(plugdata) {
    //     let arr = []
    //     if(!isEmpty(selected_category) && plugdata.companyname != selected_category){
    //         arr.push(false);
    //     }else{
    //         arr.push(true);
    //     }
    //     if(!isEmpty(selected_location) && plugdata.location != selected_location){
    //         arr.push(false);
    //     }else{
    //         arr.push(true);
    //     }
    //     if(arr.includes(false)){
    //         if(!isEmpty(search) && matchTexts(plugdata,search)){
    //             return true;
    //         }else{
    //             return false;
    //         }
    //     }else{
    //         return true;
    //     }
    // }
    function resolveDisplayedPlugs(plugdata) {
        const categoryMatches = isEmpty(selected_category) || plugdata.companyname === selected_category;
        const locationMatches = isEmpty(selected_location) || plugdata.location === selected_location;
    
        if (!categoryMatches) {
            if (!locationMatches) {
                return !isEmpty(search) && matchTexts(plugdata, search);
            } else {
                return isEmpty(search) || matchTexts(plugdata, search);
            }
        } else {
            if (!locationMatches) {
                return !isEmpty(search) && matchTexts(plugdata, search);
            } else {
                return isEmpty(search) || matchTexts(plugdata, search);
            }
        }
    }
    const displayplugs = search ? plugs.filter((c) =>  resolveDisplayedPlugs(c) ) : plugs;

    return (
        <div>
            <div className="relative isolate py-10 mt-8 lg:mt-[58px] lg:py-[280px] bg-no-repeat bg-cover bg-center flex justify-center h-[70vh] bg-[url('/images/bg.png')]">
                <div className="flex justify-center mx-6 lg:mx-8">
                    <div className="max-w-2xl flex items-center">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg leading-8 font-bold tracking-tight text-red sm:text-6xl">
                                Welcome!
                            </h3>
                            <p className="mt-6 text-4xl leading-8 font-semibold text-gray-600">
                                Let us plug you to the vendors you need.
                            </p>
                            <div className="mt-24 flex items-center justify-center gap-x-6">
                                <select name=""  
                                    className="rounded-[4px] bg-radial-gradient px-10 py-4 text-[16px] font-bold text-white bg-red-700 shadow-sm"
                                    id="" 
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Business Category</option>
                                    {businesscategories?.map((category) =>{
                                        return(
                                            <option value={category}>{category}</option>
                                        );
                                    })}
                                </select>
                                <select name=""  
                                    className="rounded-[4px] border-blue border px-10 py-4 text-[16px] font-bold text-blue shadow-sm"
                                    id="" 
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    <option value="">Location</option>
                                    {locations?.map((locate) =>{
                                        return(
                                            <option value={locate}>{locate}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <div className="flex justify-end w-full">
                <div className="w-full md:w-2/5 px-2">
                    <SearchBox searchInput={search} processSearchInput={setSearch} location={selected_location} category={selected_category} />
                </div>
            </div>
            <div className="p-6 pb-48 px-12">
                < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-16">
                    {displayplugs?.length >= 0 &&
                        displayplugs.map((item, index) => (
                            <SinglePlugCard index={index} item={item} />
                        ))}
                </div>
            </div >
        </div>
    );
};

export default Plugs;