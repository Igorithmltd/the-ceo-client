import { BiSearch } from "react-icons/bi";

const SearchInput2 = () => {
  return (
    <form className="rounded-full border border-2 border-[#e7e7e7] px-3 py-2">
      <div className="flex w-full gap-2 items-center">
        <BiSearch size={30} color="#737373" />
        <input
          className="w-full bg-transparent text-lg focus:outline-none border-none"
          placeholder="Search..."
          type="text"
          name="search"
          id=""
        />      </div>
    </form>
  );
};

export default SearchInput2;
