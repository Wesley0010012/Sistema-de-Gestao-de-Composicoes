import { Pagination } from "react-bootstrap";
import type { Page } from "../../../types/Page";

type Props = {
  page: Page<any>;
  onChange: (page: number) => void;
};

export function AbstractPagination({ page, onChange }: Props) {
  const { actualPage, totalPages, quantity } = page;

  if (quantity === 0) {
    return;
  }

  const getPages = () => {
    const pages = [];

    const maxVisible = 5;
    let startPage = Math.max(actualPage - 2, 1);
    let endPage = Math.min(startPage + maxVisible - 1, totalPages);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-end align-items-center p-3">
      <Pagination className="mb-0">
        <Pagination.First
          disabled={actualPage === 1}
          onClick={() => onChange(1)}
        />

        <Pagination.Prev
          disabled={actualPage === 1}
          onClick={() => onChange(actualPage - 1)}
        />

        {actualPage > 3 && <Pagination.Ellipsis />}

        {getPages().map((p) => (
          <Pagination.Item
            key={p}
            active={p === actualPage}
            onClick={() => onChange(p)}
          >
            {p}
          </Pagination.Item>
        ))}

        {actualPage < totalPages - 2 && <Pagination.Ellipsis />}

        <Pagination.Next
          disabled={actualPage === totalPages}
          onClick={() => onChange(actualPage + 1)}
        />

        <Pagination.Last
          disabled={actualPage === totalPages}
          onClick={() => onChange(totalPages)}
        />
      </Pagination>
    </div>
  );
}
