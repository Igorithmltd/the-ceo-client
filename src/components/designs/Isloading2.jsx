import React from 'react';


const Isloading2 = props => {
    const {title} = props
  return(
    <div className="flex justify-center items-center flex-col h-full w-full py-3">
        <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background:"transparent", display: "block", shapeRendering: "auto", width:"100px", height:"100px"}}  viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="30" cy="50" fill="#e90c59" r="20">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
            </circle>
            <circle cx="70" cy="50" fill="#46dff0" r="20">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="0s"></animate>
            </circle>
            <circle cx="30" cy="50" fill="#e90c59" r="20">
                <animate attributeName="cx" repeatCount="indefinite" dur="1s" keyTimes="0;0.5;1" values="30;70;30" begin="-0.5s"></animate>
                <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" dur="1s" repeatCount="indefinite"></animate>
            </circle>
        </svg>
        <div className='flex flex-row justify-center items-center w-full font-extrabold'>
            {title}
        </div>
    </div>
  );

};
  
export default Isloading2;



