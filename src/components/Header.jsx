import React from 'react';
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { BiMenu } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import SidebarMenu from "./SidebarMenu";



const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
    	<div className="flex gap-2 items-center justify-between md:justify-start px-8 py-4">
    		<div className="md:hidden ">
    			{menuOpen && <SidebarMenu setMenuOpen={setMenuOpen} />}
    			<span
    			onClick={() => setMenuOpen(!menuOpen)}
	            className="cursor-pointer md:hidden"
	            ><BiMenu size={24} /></span>
    		</div>
    		<div className="md:w-[200px]">
    			<NavLink to="/">
          	<img src="/images/ceo-logo.png" alt="" className="" />
        	</NavLink>
    		</div>
    		<div className="hidden md:block md:w-1/2">
    			<SearchInput />
    		</div>
    		<div className="md:w-1/2 md:flex md:ml-auto">
    			<span className="md:ml-auto md:b-4 md:rounded-md md:bg-gray-200"><IoIosNotificationsOutline size={24}/></span>
    		</div>
    	</div>
      <div className={`fixed inset-0 z-50 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <SidebarMenu setMenuOpen={setMenuOpen} />
      </div>
    </header>
  );
};

export default Header;