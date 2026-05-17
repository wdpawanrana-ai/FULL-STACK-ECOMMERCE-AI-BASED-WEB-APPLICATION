import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  }

  return <>
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all active:scale-90"
      >
        <ChevronLeft size={24} />
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`p-2 rounded-lg ${currentPage === page ? 'bg-primary text-white' : 'bg-secondary/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all active:scale-90'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground/40 hover:text-primary hover:border-primary transition-all active:scale-90"
      >
        <ChevronRight size={24} />
      </button>
    </div>

  </>;
};

export default Pagination;
