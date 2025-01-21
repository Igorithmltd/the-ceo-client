import React from 'react';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const PaginationFooter = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center space-x-2 py-4 text-[14px]">
      {/* Previous Button */}
      <span>Showing pages</span><button
        className={`px-2 py-2 rounded-full ${
          isFirstPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white'
        }`}
        onClick={() => !isFirstPage && onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        <GrFormPrevious />
      </button>

      {/* Page Numbers */}
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        className={`px-2 py-2 rounded-full ${
          isLastPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white'
        }`}
        onClick={() => !isLastPage && onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        <GrFormNext />
      </button>
    </div>
  );
};

export default PaginationFooter;
