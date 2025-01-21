import React, { useState,useEffect } from 'react';
import {baseUrl} from "../../utils/ApiSetup";

const CategoryImageSelectable = props =>{
    const {imgarray,compId,desig12,processEditOnePicture,setFormEdit} = props;

    const [selected, setSelected] = useState([]);
    const recordSelected = (item) =>{
        setFormEdit(true);
        setSelected(item);
        processEditOnePicture(compId,item);
    }
    return (
        <div className='p-2 flex flex-col w-full justify-start hover:border-green-400 hover:border-2' >
            <p key="a" className='flex flex-row justify-start align-center pl-2 text-blue-500 font-Bebas-Neue  '>{desig12} &nbsp; (Suggestions)</p>
            <div className="flex flex-row w-full overflow-scroll scrollbar-hide space-x-2 rounded-lg h-[50px] p-2">
                {imgarray.map((item,index)=>{
                    return(
                        <img key={index} src={baseUrl+item} alt='picture'
                        style={{width:"50px", borderColor:(item === selected)?"red":"white"}}
                        className='bg-fixed rounded-lg border-2 shadow-md shadow-black' onClick={() => { recordSelected(item); }}
                        />
                    )
                })}
            </div>
        
        </div>  
    )

}
export default CategoryImageSelectable;