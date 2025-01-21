import React from 'react'
import {baseUrl} from "../../utils/ApiSetup";
import { Link, useNavigate } from "react-router-dom";
import {isEmpty} from "../../components/designs/ConstantFunctions"

const SinglePlugCard = (props) => {
    const {item} = props;
    const navigate = useNavigate();


    const processedlink = item.companyname.split(" ").join("_");
    function decideColor(){
        let retcolor = JSON.parse(localStorage.getItem("visiteditems"));
        if(retcolor){
            if(retcolor?.includes(item.user_id)){
                return "#6E44FF"
            }else{
                return "#007BFF"
            }
        }else{
            return "#007BFF"
        }
    }
    const colorcode = decideColor();
    function processSelected(){
        let retcolor = JSON.parse(localStorage.getItem("visiteditems"));
        if(retcolor != null){
            if(! retcolor.includes(item.user_id)){
                let newColor = [...retcolor, item.user_id];
                localStorage.setItem("visiteditems", JSON.stringify(newColor));
            }
        }else{
            localStorage.setItem("visiteditems", JSON.stringify([item.user_id]));
        }
        const params = new URLSearchParams(window.location.search);
        params.set("search", processedlink);
        navigate(`/S/${processedlink}`)
    }
    return (
        <div
            key={item.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow-lg border border-gray-200"
        >
            {/* First Column */}
            <div className="flex">
                <img
                    src={
                        isEmpty(item.url) ? '/images/defaultPicture.svg' : baseUrl+item.url}
                    alt={item.companyname}
                    className="w-[33%] aspect-square object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between p-4 w-2/3">
                    <h3 className={`text-lg font-semibold mb-2`}
                        style={{color:colorcode}}
                    >{item.companyname}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.about.length > 300 ? item.about.slice(0, 300) + '...' : item.about}
                    </p>
                    <div className="flex justify-end mt-4 w-[100%] mx-auto"
                        onClick={()=>{processSelected();}} >
                        <button className="w-1/2  border border-red-500 text-red-500 px-4 py-2 rounded">
                            View
                        </button> 
                    </div>
                </div>
            </div>

            {/* Second Row - Add to Cart and View Buttons */}
            
        </div>
    )
}

export default SinglePlugCard