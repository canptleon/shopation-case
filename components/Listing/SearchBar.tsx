import React from "react";

interface SearchBarProps {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, handleChange }) => (
  <div className="relative max-w-md xsfull:w-full xsfull:max-w-full mx-auto mb-4 xsfull:mb-0">
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search for products..."
      className="p-3 w-full border-[1px] border-[solid] border-[#13b8f9] rounded-lg shadow-sm focus:outline-none focus:ring-1 transition focus:ring-blue-500"
    />
    <img
      src="/images/search.png"
      alt="Search"
      className="cursor-pointer absolute right-[8px] top-[0] bottom-[0] max-w-[34px] m-auto opacity-[.5]"
    />
  </div>
);

export default React.memo(SearchBar);
