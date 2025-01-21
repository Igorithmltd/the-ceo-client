import React, {useState} from 'react'

const ValidatorListDropdown = (props) => {
    const {index, ret, validate} = props;
    const [dropdown, setDropdown] = useState(false);

    const dropdowntoggle = () => {
        setDropdown(!dropdown);
    }

    return (

        <div key={index} className='flex flex-col justify-center items-center p-1 py-3 shadow-red-200 shadow-md w-full'>
            <div key="a" className='flex flex-row justify-center items-center w-full p-1' >
                <div key="a" className='inline-block justify-start text-start w-2/3 font-extrabold text-[20px] ' onClick={()=>{dropdowntoggle()}}>
                    {index+1 +" : " +ret?.productname }
                </div>
                <div key="b" className='inline-block w-1/3 '>
                    <button className='rounded-xl border-2 border-black pr-4 pl-4 p-2 mb-1 cursor-pointer hover:bg-gray-200 font-extrabold bg-white opacity-100 text-black' 
                        onClick={() => { validate(ret?.id); }} >Validate</button>
                </div>
            </div>
            <div key="b" className='flex flex-col justify-start items-center w-full pl-5'>
                <div key="a" className='flex flex-row justify-start items-center w-full text-start'>
                    <div key="a" className='font-extrabold '>Quantity: </div>
                    <div key="b" className='inline-block'>{ret?.quantity}</div>
                </div>
                <div key="b" className='flex flex-row justify-start items-center w-full text-start'>
                    <div key="a" className='font-extrabold '>Unit Price: </div>
                    <div key="b" className='inline-block'>{ret?.unitprice}</div>
                </div>
                <div key="c" className='flex flex-row justify-start items-center w-full text-start'>
                    <div key="a" className='font-extrabold '>Total Amount : </div>
                    <div key="b" className='inline-block'>{ret?.amount}</div>
                </div>
                <div key="d" className='flex flex-row justify-start items-center w-full text-start'>
                    <div key="a" className='font-extrabold '>Checkout State: </div>
                    <div key="b" className='inline-block font-extrabold ' style={{color:ret?.checkoutstate==="unclaimed"?"red":"blue"}}>{ret?.checkoutstate}</div>
                </div>
            </div>
            {
                dropdown &&[
                    <div className='flex flex-col justify-start items-center w-full pt-2 space-y-2 pl-5'>
                        <div key="a" className='flex flex-row justify-start items-center w-full text-start'>
                            <div key="a" className='font-extrabold '>Delivery Type: </div>
                            <div key="b" className='inline-block'>{ret?.deliverytype}</div>
                        </div>
                        <div key="b" className='flex flex-row justify-center items-center w-full text-start'>
                            <div key="b" className='inline-block'>{ret?.description}</div>
                        </div>
                        <div key="c" className='flex flex-row justify-center items-center w-full text-start'>
                            <img src={process.env.REACT_APP_BASE_URL + ret?.url} alt="" className=" w-[200px]" />
                        </div>
                    </div>
                ]
            }
        </div>
    )
}

export default ValidatorListDropdown