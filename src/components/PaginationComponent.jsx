import React from "react";

const PaginationComponent = ({
  recordsPerPage,
  totalRecords,
  paginate,
  currentPage,
}) => {
  const pageNumber = [];
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumber.push(i);
  }

  const handleFirstPage = () => paginate(1);
  const handlePreviousPage = () => paginate(Math.max(currentPage - 1, 1));
  const handleNextPage = () => paginate(Math.min(currentPage + 1, totalPages));
  const handleLastPage = () => paginate(totalPages);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handleFirstPage}
        >
          &lt;&lt;
        </li>
        <li
          className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePreviousPage}
        >
          &lt;
        </li>
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`pagination-item ${
              currentPage === number ? "active" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`pagination-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={handleNextPage}
        >
          &gt;
        </li>
        <li
          className={`pagination-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={handleLastPage}
        >
          &gt;&gt;
        </li>
      </ul>
    </div>
  );
};

export default PaginationComponent;
