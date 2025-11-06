import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function NavPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }
  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }
  return (
    <div style={{display: "flex",gap: "10px"}}>
      <button disabled={currentPage===1} onClick={handlePrevious}>Anterior</button>
      <span>Página {currentPage} de {totalPages}</span>
      <button disabled={currentPage===totalPages} onClick={handleNext}>Próxima</button>
    </div>
    );
  }