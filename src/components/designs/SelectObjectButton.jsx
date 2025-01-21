import './Button.css';

//This defines the array of styles and sizes where we will choose from to give default configuration of out buttons.
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
const SIZES = ['btn--medium', 'btn-large'];

const SelectObjectButton = ({
    children, type, FunctionToExecute, Style, objectfocus
}) => {
    //Use the default Style or use the one defined by the user
    //const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    //const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const bgcolor = (Style === "color") ? children : "";
    const resolvePreview = () => {
        if (objectfocus === "phone") {
            return `${children.name} | ${children.email}`;
        }else if (objectfocus === "email"){
            return `${children.name} | ${children.phone}`;
        }else if (objectfocus === "name"){
            return `${children.email} | ${children.phone}`;
        }else{
            return `${children.phone} | ${children.email}`;
        }
    }

    return (
        // <button type={type} className={`flex flex-row rounded-lg justify-center p-2 bg-gray-100 hover:bg-gray-300`}
        //     onClick={() => { FunctionToExecute(children[objectfocus]); }} >
        //     <div className='flex flex-col justify-start w-9/12 font-extrabold ' style={{ color: bgcolor }}>
        //         <div>
        //             {children[objectfocus]}
        //         </div>
        //         <div className=' flex flex-row w-full justify-center text-[12px] text-red-500'>
        //             {resolvePreview()}
        //         </div>
        //     </div>
            <div 
                className='cursor-pointer flex gap-4 w-full py-2'
                onClick={() => { FunctionToExecute(children[objectfocus]); }}
            >
                <span className='font-bold'>
                    {children[objectfocus]}
                </span>
                <span className='text-xs text-gray-600'>
                    {resolvePreview()}
                </span>
            </div>

        // </button>
    );

};
export default SelectObjectButton;