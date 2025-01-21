// import  { useNetworkState  } from 'react-use';
// import axios from '../api/axios';
//import {encryptStorage} from '../encript/encfunctions'

export const Redirector = (currentPage, to, setLastnavigated, navigate) =>{
    setLastnavigated(currentPage);
    let v = to.split("/");
    localStorage.setItem("Abar",v[1]);
    navigate(to);
}

export const isEmpty = (variable) =>{
    if (variable === null){ 
        return true;
    }else if (variable === undefined){
        return true;
    }
    else if (typeof variable === 'string' && variable === '') {
        return true;
    }
    else if (typeof variable === 'string' && variable.trim() === ''){ 
        return true;
    }
    else if (typeof variable === 'string' && variable.replaceAll(' ', '') === ''){ 
        return true;
    }
    else if (Array.isArray(variable) && variable.length === 0){ 
        return true;
    }
    else if (typeof variable === 'object' && Object.keys(variable).length === 0) {
        return true;
    }
    else {
        return false;
    }
}

export function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const requirements = (...array) =>{
    let missingIndex = [];
    array.forEach((element, index) => {
        if( isEmpty(element)){
            missingIndex.push(index);
        }
    });
    if(missingIndex.length >= 1){
        return missingIndex
    }else{
        return "ok"
    }
}
