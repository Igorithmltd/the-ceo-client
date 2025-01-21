import { BiSearch } from "react-icons/bi";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { isEmpty } from "./ConstantFunctions";

const SearchBox = (props) => {
    const { searchInput, processSearchInput, category, location } = props;
    const navigate = useNavigate();

    function processSearchItems(e){
        e.preventDefault(); // Prevent the default form submission behavior
        let queryString = ``;
        if (!searchInput) return;
        if(!isEmpty(category)){
            queryString += `category=${category.split(" ").join("#$")}_#$`;
        }
        if(!isEmpty(location)){
            queryString += `category=${category.split(" ").join("#$")}_#$`;
        }
        // Replace spaces with `#$` in the search input
        const encodedSearch = searchInput.split(" ").join("#$");
        queryString += `search=${encodedSearch}`;
        // Redirect to the new search page with the query parameters
        navigate(`?${queryString}`);
    }
    return (
        <form className="rounded-full border-2  border-[#e7e7e7] px-3 py-2" onSubmit={processSearchItems}>
            <div className="flex w-full gap-2 items-center">
                <BiSearch size={30} color="#737373" />
                <input
                    className="w-full bg-transparent text-lg focus:outline-none border-none"
                    placeholder="Search..."
                    type="text"
                    name=""
                    id=""
                    value = {searchInput}
                    onChange={(e)=>{processSearchInput(e.target.value);}}
                />
            </div>
        </form>
    )
}

export default SearchBox