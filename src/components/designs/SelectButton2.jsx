import react from 'react';
import './Button.css';

//This defines the array of styles and sizes where we will choose from to give default configuration of out buttons.
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn-large'];

const SelectButton2 = ({
    children, type, FunctionToExecute, Style
}) => {
    //Use the default Style or use the one defined by the user
    //const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    //const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const bgcolor = (Style === "color") ? children : "";

    return (
        // <button type={type} className={`flex flex-row rounded-lg justify-center p-2 bg-gray-100 hover:bg-gray-300`}
        //     onClick={() => { FunctionToExecute(children); }} >
        //     <div className='flex flex-row justify-start w-9/12 font-extrabold ' style={{ color: bgcolor }}>
        //         {children}
        //     </div>
            <div 
                className='cursor-pointer flex gap-4 w-full py-2'
                onClick={() => { FunctionToExecute(children); }}
            >
                <span className='font-bold'>
                {children}
                </span>
            </div>
        // </button>
    );

};
export default SelectButton2;