import React from 'react';
import './admin.css';
import * as ComponentDesign from './designcomponents';
import { DownloadImageTrabed, ExpandableProductList } from "../designs";
import {baseUrl} from "../../utils/ApiSetup";

const DesignSingleObject = (props) => {
    const { des, addedProduct, addedService, balance,  paid, total, NumericFormat, currency ,
        generateNewDimention,windowSize, generateExpandibleheight, isExpandable, downloadable, 
        generateNewPosition, formEdit, setFormEdit, recalculate, setFormItem, setFormOnePicItem, 
        datestamp, daystamp, monthstamp, yearstamp,userData, designParentContainerWidth
    } = props;
    return (
        <div key={des?.id}
            style={{
            width: generateNewDimention(des?.width, des?.heigh, designParentContainerWidth, des?.width, "div", 'width'),
            height: isExpandable(des)? generateExpandibleheight(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'height') : generateNewDimention(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'height')
            }}
            className='relative justify-center  items-center bg-white shadow-md shadow-gray-600 overflow-hidden'
            ref={downloadable} id='downloadable' >

            <DownloadImageTrabed key="image" src={baseUrl + des?.bgurl} alt="background" className="z-10 w-full h-full relative"
        />

        {
            des?.components?.map((desig, index) => {
                const Card = ComponentDesign[desig.name]
                return (
                    <Card key={desig.id}
                    componentId={"comp" + index}
                    content={desig.content}
                    containerStyle={desig.containerStyle}
                    selfStyle={desig.selfStyle}
                    url_type={desig.url_type}
                    content_type={desig.content_type}
                    url={desig.default_url}
                    Alt="Picture"
                    userData={userData}
                    x={generateNewPosition(
                        des?.width,
                        generateNewDimention(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'width'),
                        des?.height,
                        generateNewDimention(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'height'),
                        desig.x, desig.y, "x")}
                    y={generateNewPosition(
                        des?.width,
                        generateNewDimention(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'width'),
                        des?.height,
                        generateNewDimention(des?.width, des?.height, designParentContainerWidth, des?.width, "div", 'height'),
                        desig.x, desig.y, "y")}
                    iwidth={generateNewDimention(desig.iwidth, desig.iheight, designParentContainerWidth, des?.width, "item", 'width')}
                    iheight={generateNewDimention(desig.iwidth, desig.iheight, designParentContainerWidth, des?.width, "item", 'height')}
                    name={desig.description}
                    formEdit={formEdit}
                    setFormEdit={setFormEdit}
                    contentId={desig.id}
                    recalculate={recalculate}
                    maxLength={desig.content_max_char}
                    index={index}
                    setFormItem={setFormItem}
                    setFormOnePicItem={setFormOnePicItem}
                    tl={desig.topleft}
                    tr={desig.topright}
                    bl={desig.bottomleft}
                    br={desig.bottomright}
                    letterspace={desig.letterspace}
                    lineheight={desig.lineheight}
                    opacity={desig.opacity}
                    degree={desig.degree}
                    datestamp={datestamp}
                    daystamp={daystamp}
                    monthstamp={monthstamp}
                    yearstamp={yearstamp}
                    />
                );

            })
        }
        {isExpandable(des)  &&[
          <div key="expandable" className=' flex flex-row justify-center items-center pt-4 pb-14 w-full z-10'>
            <ExpandableProductList addedProduct={addedProduct} addedService={addedService} 
                balance={balance} paid={paid} total={total} NumericFormat={NumericFormat} 
                currency={currency}/>
          </div>
        ]}
      </div>
    )
}

export default DesignSingleObject