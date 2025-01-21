import React from 'react';
import { Link } from "react-router-dom";
import { RiFacebookLine } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";
import { TiSocialLinkedin } from "react-icons/ti";
import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'
import {auth} from '../firebase'



const Footer = () => {
  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth()

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        const user = result.user;
        console.log('User Info:', user);
        
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error during sign-up:', error);
      });
   }

  return (
    <footer className="flex flex-col mt-8">
      <div className="flex items-center mt-3 mb-4 gap-4">
        <hr className="separator-line" />
        <span> OR </span>
        <hr className="separator-line" />
      </div>
      <p className="text-gray-700 text-center text-sm my-5">
        Or login using one of the following
      </p>
      <div className="flex gap-5 my-4 justify-center">
        <div className="bg-red-200 p-4 rounded-full cursor-pointer">
          <RiFacebookLine className="text-red-700 font-bold" size={20} />
        </div>
        <div className="bg-red-200 p-4 rounded-full cursor-pointer">
          <BiLogoGmail onClick={handleGoogleSignUp} className="text-red-700 font-bold" size={20} />
        </div>
        <div className="bg-red-200 p-4 rounded-full cursor-pointer">
          <TiSocialLinkedin className="text-red-700 font-bold" size={20} />
        </div>
      </div>
      <p className="text-gray-700 text-[11px] text-center text-xs my-8">
        By using TheCEOApp services, you are agreeing to all our{" "}
        <span className="text-red-700 cursor-pointer">Terms and Conditions</span>
      </p>
    </footer>
  );
};

export default Footer;