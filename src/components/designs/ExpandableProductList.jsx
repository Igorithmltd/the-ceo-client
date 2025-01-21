import React from 'react'

const ExpandableProductList = (props) => {

    const {addedProduct, addedService, total, paid, balance, NumericFormat, currency} = props;
    const oneProductTotal = (quantity,price) =>{
        let multiple = parseFloat(quantity) * parseFloat(price);
        return multiple.toFixed(2);
    }
    return (
            (addedProduct.length + addedService.length >= 1)&&[
                <div className='flex flex-col justify-start items-center w-full text-[12px]'>
                    <div key="a" className='flex flex-row justify-center item-center w-full px-4 font-extrabold text-[20px]  '>Items List ({currency.toUpperCase()})</div>
                    <div key="b" className='flex flex-col justify-start items-center w-11/12 pb-4 h-auto space-y-2'>
                   
                        {
                            addedProduct.map((product,index)=>{
                                return(
                                    <div key={index} className='flex flex-col justify-start items-center w-full'>
                                        <div  key="a" className='flex flex-row justify-between items-center w-full px-2 break-all   border-b-2 border-dotted border-gray-500 '>
                                            <div key="a" className='flex flex-row w-1/4 justify-start items-center'>
                                                {product.productname}
                                            </div>
                                            <div key="b" className='flex flex-row w-1/4 justify-center items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={parseFloat(product.quantity)}
                                                />
                                                
                                            </div>
                                            <div key="c" className='flex flex-row w-1/4 justify-center items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={parseFloat(product.unitprice)}
                                                />
                                            </div>
                                            <div key="d" className='flex flex-row w-1/4 justify-end items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={parseFloat(oneProductTotal(product.quantity, product.unitprice))}
                                                />
                                                
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        {
                            addedService.map((service,index) => {
                                return(
                                    <div key={index} className='flex flex-col justify-start items-center w-full'>
                                        <div  key="a" className='flex flex-row justify-between items-center w-full px-2 break-all   border-b-2 border-dotted border-gray-500 '>
                                            <div key="a" className='flex flex-row w-1/4 justify-start items-center'>
                                                {service.servicename}
                                            </div>
                                            <div key="b" className='flex flex-row w-1/4 justify-center items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={service.quantity}
                                                />
                                                
                                            </div>
                                            <div key="c" className='flex flex-row w-1/4 justify-center items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={service.initial_amount}
                                                />
                                            </div>
                                            <div key="d" className='flex flex-row w-1/4 justify-end items-center'>
                                                <NumericFormat key="b" 
                                                    thousandsGroupStyle="thousand"
                                                    thousandSeparator=","
                                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                                    id="total"
                                                    disabled
                                                    value={service.final_amount}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div key="c" className='flex flex-col justify-start items-center w-11/12 pb-12 h-auto space-y-1'> 
                        <div key="a" className='flex flex-row justify-between items-center pr-4 w-full'>
                            <div key="a" className='flex flex-row justify-start items-center w-1/2'>
                                Total    
                            </div>
                            <div key="b" className='flex flex-row justify-end items-center w-1/2'>
                                <NumericFormat key="b" 
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=","
                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                    id="total"
                                    disabled
                                    value={total}
                                />                                
                            </div>
                        </div>
                        <div key="b" className='flex flex-row justify-end items-center pr-4 w-full '>
                            <div key="a" className='flex flex-row justify-start items-center w-1/2'>
                                Paid    
                            </div>
                            <div key="b" className='flex flex-row justify-end items-center w-1/2'>
                                <NumericFormat key="b" 
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=","
                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                    id="paid"
                                    disabled
                                    value={paid}
                                />                                
                            </div>
                        </div>
                        <div key="c" className='flex flex-row justify-end items-center pr-4 w-full '>
                            <div key="a" className='flex flex-row justify-start items-center w-1/2'>
                                Balance
                            </div>
                            <div key="b" className='flex flex-row justify-end items-center w-1/2'>
                                <NumericFormat key="b" 
                                    thousandsGroupStyle="thousand"
                                    thousandSeparator=","
                                    className='w-full bg-transparent font-extrabold focus:outline-none '
                                    id="balance"
                                    disabled
                                    value={balance}
                                />                                
                            </div>
                        </div>
                    </div>
                    <div key="d" className='flex flex-col space-y-1 justify-center w-full'>
                        <div key="a" className='flex w-full justify-center px-10 text-center text'>Please do confirm your goods/services for record purposes</div>
                        <div key="b"  className='flex w-full justify-center px-10'>Thank you for stopping by.</div>
                        <div key="c"  className='flex w-full justify-center px-10'>powered by [https://theceoapp.com]</div>
                    </div>
                </div>
            ]
        )
    
}

export default ExpandableProductList;