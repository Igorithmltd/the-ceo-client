import React, {memo} from "react"
import {baseUrl} from "../../utils/ApiSetup";
//import { VideoTrabed } from '../components';
const AdvertShow = props =>{
    const {adCount, adverts, style} = props;

        const redirecter = (url) =>{
            window.open(url,"_blank");
        }
        if(adverts.length > adCount){
            const singleAdvert = adverts[adCount];
            return(
                <div key={"adv"+adCount} className="flex rounded-2xl p-2 relative" style={style}>
                    <div key="a" className="flex flex-row justify-center items-center absolute bottom-10 left-2/4 cursor-pointer rounded-2xl bg-black w-[150px] h-[50px] font-extraBold
                        opacity-50 hover:w-[140px] hover:h-[40px] text-white shadow-white shadow-xl  " onClick={()=>{redirecter(singleAdvert.redirectlink);}}> 
                        Visit Link
                    </div>
                    {(singleAdvert.adtype === "image")?[
                        <img
                            key="b"
                            src={baseUrl+singleAdvert.url}
                            className="w-full h-full rounded-lg "
                            alt="Adverts"
                            width="100%"
                            height="100%"
                            placeholder={"/images/placeholder.png"}
                            effect="blur"    
                        />
                    ]:[
                        //<VideoTrabed key="c" src={process.env.REACT_APP_BASE_URL+singleAdvert.url}/>
                    ]}
                </div>
            );
        }
}
export default AdvertShow;