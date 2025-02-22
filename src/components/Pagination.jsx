"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Pagination({
  totalTransaction,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalTransaction / pageSize);
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");

      let startPage = Math.max(2, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full py-4 flex items-center md:justify-center gap-2">
      <Button
        className="md:w-24 w-18"
        variant="outline"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </Button>

      {generatePageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={index} className=" md:px-2 md:py-4 px-1 py-2">
            ...
          </span>
        ) : (
          <Button
            key={index}
            className={`md:w-10 w-8 md:h-10 h-8 ${
              page === p
                ? "bg-black text-white md:px-2 md:py-4 px-1 py-2"
                : "bg-transparent text-black border border-black hover:text-white md:px-2 md:py-4 px-1 py-2"
            }`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </Button>
        )
      )}

      <Button
        className="md:w-24 w-18"
        variant="outline"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
