import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const handleClick = (page: number) => {
    handlePageChange(page);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (currentPage !== 1) {
      pages.push(1);
    }

    if (currentPage > 3) {
      pages.push("...");
    }

    if (currentPage > 2) {
      pages.push(currentPage - 1);
    }

    pages.push(currentPage);

    if (currentPage < totalPages - 1) {
      pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (currentPage !== totalPages && totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        currentPage === page ? (
          <span key={index} className="px-3 py-2 bg-blue-500 text-white cursor-default">
            {page}
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className="px-3 py-2 bg-white text-gray-700 hover:bg-gray-200">
            {page}
          </button>
        )
      ) : (
        <span key={index} className="px-3 py-2">
          {page}
        </span>
      )
    );
  };

  return (
    <div className="flex justify-center items-center mt-8">
      {totalPages > 0 && renderPageNumbers()}
    </div>
  );
};

export default React.memo(Pagination);
