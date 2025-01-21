import React, { useState, memo } from 'react';
import { Isloading,CategoryImageSelectable } from "../designs";

const CategoryImageSelect = props =>{
    const {des,backgimg,horizontalimg,verticalimg,setFormEdit,setFormItem, setFormOnePicItem} = props;
    const [searching,setSearching] = useState(false);

    const isSelectableVFile = (des) => {
        let state = false;
        if ((des.url_type === "editable") && (des.content_type === "selectableV")) {
          state = true;
        }
        return state;
    }
    const isSelectableHFile = (des) => {
        let state = false;
        if ((des.url_type === "editable") && (des.content_type === "selectableH")) {
          state = true;
        }
        return state;
    }
    const isSelectableBgFile = (des) => {
        let state = false;
        if ((des.url_type === "editable") && (des.content_type === "selectableBg")) {
          state = true;
        }
        return state;
    }
    
    const processEditOnePicture = (currentOnePictureId,url) =>{
        setFormItem(currentOnePictureId, url);
        setFormOnePicItem(currentOnePictureId, "pictureurl");
    }

    return (
        <div className="flex flex-col w-full justify-start items-start">
            <p>{searching && <Isloading/>}</p>
            <div className="flex flex-col w-full justify-start space-y-2 overflow-x-scroll scrollbar-hide shadow-sm shadow-black p-2 min-h-[48px]">
                   
                {des?.components?.map((desig, index) => {
                    
                    if (isSelectableVFile(desig)) {
                        return (
                            <CategoryImageSelectable imgarray={verticalimg} title="Vertical" key={index} types="Vertical"  processEditOnePicture={processEditOnePicture} 
                                desig12={desig.description} compId={index} setFormEdit={setFormEdit} />
                        );
                    }
                    // For the Images
                    if (isSelectableHFile(desig)) {
                        return (
                            <CategoryImageSelectable imgarray={horizontalimg} title="Horizontal" key={index} types="Horizontal"  processEditOnePicture={processEditOnePicture} 
                                    desig12={desig.description} compId={index} setFormEdit={setFormEdit} />
                        );
                    }
                    // For the Images
                    if (isSelectableBgFile(desig)) {
                        return (
                            <CategoryImageSelectable imgarray={backgimg} title="Background" key={index} types="Bg"  processEditOnePicture={processEditOnePicture} 
                                desig12={desig.description} compId={index} setFormEdit={setFormEdit} />
                        );
                    }
                    
                })}

            </div>
        </div>
    )
}
export default memo(CategoryImageSelect);