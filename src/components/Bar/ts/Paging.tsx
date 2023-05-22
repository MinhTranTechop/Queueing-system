import React, { useState } from 'react';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    
  }
const Pagination:React.FC<PaginationProps> = ({ itemsPerPage, totalItems }) => {
    const [activePage, setActivePage] = useState(1);
    const pageNumbers = [];
  
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
  
    const handleClick = (number: number) => {
      setActivePage(number);
      
    };

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={number === activePage ? 'page-item active' : 'page-item'}>
            <button className="page-link" onClick={() => handleClick(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;