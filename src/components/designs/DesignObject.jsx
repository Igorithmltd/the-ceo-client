
import React from 'react';
import * as ComponentDesign from './designcomponents';
import { Box} from "@mui/material";

const DesignObject = (props) => {
    const { design, index, isFree, isSmallAccount, notpaid, downloadable, 
        setIdToD, isDownloadAllowed, generateNewDimention, generateNewPosition, processBaseUrl, ImageTrabed
        ,windowSize, onlyreceipt, datestamp, monthstamp, yearstamp, daystamp, userData} = props;

    let wth = generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'width');
    let hth = generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'height');
    
    return (
        <Box key={"a1"+index} className="pr-1 pl-1  ">
            <div key={design.id}
                style={{
                    width: wth,
                    height: hth
                }}
                onClick={() => { 
                    isDownloadAllowed(design.category)  && setIdToD(parseInt(design.id),design)
                }}
                className={`relative shadow-md shadow-gray-600 cursor-pointer overflow-hidden rounded-2xl`}
                ref={downloadable} id='downloadable'>
                { 
                (notpaid(design.category))?[
                    <div className="z-35 w-full h-full p-4 flex justify-center items-center absolute bg-[#260411] text-white text-sm font-Montserrat-ExtraBold opacity-70">
                        Subscribe
                    </div>

                ]:(isSmallAccount(design.category) ) ? [
                    <div className="z-35 w-full h-full p-4 flex justify-center items-center absolute bg-[#260411] text-white text-sm font-Montserrat-ExtraBold opacity-70">
                        Upgrade Account.
                    </div>
                ]:[
                    (onlyreceipt && !isFree(design.category) ) && [
                        <div className="z-35 w-full h-full p-4 flex justify-center items-center absolute bg-[#260411] text-white text-sm font-Montserrat-ExtraBold opacity-70">
                            Max Download Reached
                        </div>
                    ]
                ]}
                <ImageTrabed 
                    src={processBaseUrl(design.bgurl)} 
                    // classname="z-10 w-full md:w-[450px] h-full md:h-auto absolute" 
                    classname="z-10 w-full h-ful absolute"
                    alt="" 
                    width = {wth}
                    height = {hth}
                    placeholder={"/images/placeholder.png"}
                    effect=""
                />
                {
                    design.components.map((des, index) => {
                        const Card = ComponentDesign[des.name]
                        return (
                            <Card key={des.id}
                                componentId={"comp" + index}
                                content={des.content}
                                containerStyle={des.containerStyle}
                                selfStyle={des.selfStyle}
                                url_type={des.url_type}
                                content_type={des.content_type}
                                url={des.default_url}
                                userData={userData}
                                Alt="Picture"
                                //generateNewPosition = (old_width,new_width,old_height,new_height,old_x,old_y,type)
                                x={generateNewPosition(
                                    design.width,
                                    generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'width'),
                                    design.height,
                                    generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'height'),
                                    des.x, des.y, "x")}
                                y={generateNewPosition(
                                    design.width,
                                    generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'width'),
                                    design.height,
                                    generateNewDimention(design.width, design.height, windowSize.innerWidth, design.width, "div", 'height'),
                                    des.x, des.y, "y")}
                                //x = {des[8]}
                                //y = {des[9]}
                                iwidth={generateNewDimention(des.iwidth, des.iheight, windowSize.innerWidth, design.width, "item", 'width')}
                                iheight={generateNewDimention(des.iwidth, des.iheight, windowSize.innerWidth, design.width, "item", 'height')}
                                tl={des.topleft}
                                tr={des.topright}
                                bl={des.bottomleft}
                                br={des.bottomright}
                                letterspace={des.letterspace}
                                lineheight={des.lineheight}
                                opacity={des.opacity}
                                degree={des.degree}
                                datestamp={datestamp}
                                daystamp={daystamp}
                                monthstamp={monthstamp}
                                yearstamp={yearstamp}
                            />
                        );
                        
                    })
                }
            </div>
            <div key={"d"+index} className='flex w-full p-1 m-1 bg-transparent '></div>
        </Box>
    );
}

export default DesignObject