import React from 'react';
import './DirectorsCard.css';

function ProductCard(props) {
    return (
        <>
            {/* <li className='cards__item'>
                <div className='cards__item__link' >
                    <div className='cards__item__info flex flex-col justify-center w-full'>
                        <div key="a" className=' flex flex-row justify-center text-[#ff0000] font-Montserrat-ExtraBold text-[24px]'>{props.name}</div>
                        <div key="b" className='flex flex-row justify-between text-[12px] font-Montserrat-Bold'>
                            <div className="flex flex-row justify-start" style={{ width: "30%" }}>{props.unitprice}</div>
                            <div className="flex flex-row justify-center" style={{ width: "30%" }}>{props.quantity}</div>
                            <div className="flex flex-row justify-end" style={{ width: "30%" }}>{props.amount}</div>
                        </div>
                    </div>
                </div>
            </li> */}
            <div className='w-[90%]'>
                    <div className='pl-[30px] flex w-full'>
                        <div key="a" className=' flex flex-row fon-bold w-5/12'>{props.name}</div>

                        <div className="flex flex-row justify-start w-3/12">{props.unitprice}</div>
                        <div className="flex flex-row justify-center w-1/12">{props.quantity}</div>
                        <div className="flex flex-row justify-end w-3/12">{props.amount}</div>
                    </div>
            </div>
        </>
    );
}

export default ProductCard;
